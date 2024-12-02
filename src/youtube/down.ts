import fs from 'fs';
import path from 'path';
import cp from 'child_process';

import youtubeSubtitlesScraper from 'youtube-captions-scraper';

import { getAllResponses, getVideoTitle, getPlaylistTitle } from './rest.js';

// * download
const srtFromSubtitles = (Subtitles: any[]) => {
  return Subtitles.map((Subtitle, index) => {
    const start = parseFloat(Subtitle.start);
    const end = start + parseFloat(Subtitle.dur);
    const startTime = new Date(start * 1000).toISOString().substr(11, 12);
    const endTime = new Date(end * 1000).toISOString().substr(11, 12);

    return `${index + 1}\n${startTime.replace('.', ',')} --> ${endTime.replace(
      '.',
      ','
    )}\n${Subtitle.text}\n`;
  }).join('\n');
};

const txtFromSubtitles = (Subtitles: any[]) => {
  return Subtitles.map((Subtitle) => `${Subtitle.text}`).join('\n');
};

const _getSubtitles = async (videoId: string, languages: string) => {
  const languageArr = languages.split(',').map((lang) => lang.trim());
  console.log('languages: ', languages);
  let subtitles = [];
  for (const language of languageArr) {
    console.log('language: ', language);
    try {
      const captions = await youtubeSubtitlesScraper.getSubtitles({
        videoID: videoId,
        lang: language,
      });
      console.log(`성공적으로 가져온 자막 언어: ${language || '자동 감지'}`);
      subtitles.push({ language, captions });
    } catch (error) {
      console.log(
        `${
          language || '자동 감지'
        } 자막을 가져오는 데 실패했습니다. 다음 언어 시도 중...`
      );
    }
  }

  return subtitles;
};

const _downloadYoutubeSubtitles = (captions: any[], formatType = 'vtt') => {
  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const secs = date.getUTCSeconds().toString().padStart(2, '0');
    const ms = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${secs},${ms}`;
  };

  switch (formatType.toLowerCase()) {
    case 'vtt':
      return `WEBVTT\n\n${captions
        .map(
          (caption) =>
            `${formatTime(caption.start).replace(',', '.')} --> ${formatTime(
              parseFloat(caption.start) + parseFloat(caption.dur)
            ).replace(',', '.')}\n${caption.text}`
        )
        .join('\n\n')}`;
    case 'srt':
      return captions
        .map(
          (caption, index) =>
            `${index + 1}\n${formatTime(caption.start)} --> ${formatTime(
              parseFloat(caption.start) + parseFloat(caption.dur)
            )}\n${caption.text}`
        )
        .join('\n\n');
    case 'txt':
      return captions.map((caption) => caption.text).join('\n');
    default:
      return captions.map((caption) => caption.text).join('\n');
  }
};

const downloadYoutubeSubtitles = async (videoId: string, {
  languages = 'en,ko',
  formatType = 'vtt',
  outputDir = '.',
}= {}) => {
  let subtitles: any[] = await _getSubtitles(videoId, languages);
  for (const subtitle of subtitles) {
    subtitle.captions = _downloadYoutubeSubtitles(subtitle.captions, formatType);
  }

  const filePaths = [];
  // T파일 저장
  let index = 0;
  for (const subtitle of subtitles) {
    let filePath = `${outputDir}/${videoId}_${subtitle.language}.${formatType}`;
    if (index === 0) {
      filePath = `${outputDir}/${videoId}.${formatType}`;
    }
    fs.writeFileSync(filePath, subtitle.captions);
    filePaths.push(filePath);
    index++;
  }

  return filePaths;
};

const downloadYoutubeVideo = async (videoId: string, {
  resolution = '720',
  bitrate = '128',
  outputDir = '.',
} = {}) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const command = `yt-dlp -S vcodec:h264,fps,res:${resolution},acodec:m4a -o "${outputDir}/${videoId}.mp4" ${url}`;
  // const command = `yt-dlp -S vcodec:h264,fps,res:${resolution},acodec:m4a -o "${outputDir}/%(title)s_%(id)s.%(ext)s" ${url}`;
  // -o "%(id)s_%(title)s.%(ext)s"   "%(playlist_id)s_%(playlist_title)s"

  console.log('command: ', command);
  const result = cp.execSync(command);

  return `${outputDir}/${videoId}.mp4`;
};

interface DownloadItem {
  subtitles?: string;
  video?: string;
}

const downloadYoutubeAll = async (videoIds: string, {
  resolution = '720',
  bitrate = '128',
  languages = 'en,ko',
  formatType = 'vtt',
  outputDir = '.',
}) => {
  const downloaded: {
    resolution: string;
    bitrate: string;
    languages: string;
    formatType: string;
    outputDir: string;
    downs: DownloadItem[];
  } = {
    resolution,
    bitrate,
    languages,
    formatType,
    outputDir,
    downs: [],
  };
  for (const videoId of videoIds.split(',')) {
    const down: { subtitles?: string; video?: string } = {};
    try {
      const subtitles = await downloadYoutubeSubtitles(videoId,{
        languages,
        formatType,
        outputDir,
      });
      if (subtitles) {
        down.subtitles = subtitles.map((s) => s.split('/').pop()).join('|');
      }
      const video = await downloadYoutubeVideo(videoId, {
        resolution,
        bitrate,
        outputDir,
      });
      if (video) {
        down.video = video.split('/').pop();
        downloaded.downs.push(down);
      }
    } catch (error: any) {
      console.error('An error occurred:', error instanceof Error ? error.message : String(error));
      return [];
    }
  }
  return downloaded;
};

// downloadYoutubePlaylist 함수 수정
const downloadYoutubePlaylist = async (playlistId: string, {
  resolution = '720',
  bitrate = '128',
  languages = 'en,ko',
  formatType = 'vtt',
  outputDir = '.',
} = {}) => {
  const playlistTitle = await getPlaylistTitle(playlistId);

  outputDir = `${outputDir}/${playlistTitle}_${playlistId}`; // snippet.title  // snippet.channelTitle

  const query = { part: 'contentDetails', playlistId };

  try {
    const res = await getAllResponses('playlistItems', query);
    console.log('res: ', res);
    let videoIds = res.map((item) => item.contentDetails.videoId).join(',');
    // 중복 제거
    videoIds = [...new Set(videoIds.split(','))].join(',');
    console.log(videoIds);
    return await downloadYoutubeAll(videoIds, {
      resolution,
      bitrate,
      languages,
      formatType,
      outputDir,
    });
  } catch (error: unknown) {
    console.error('An error occurred:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export {
  downloadYoutubeSubtitles,
  downloadYoutubeVideo,
  downloadYoutubeAll,
  downloadYoutubePlaylist,
};
