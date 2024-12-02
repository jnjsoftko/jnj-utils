import dotenv from 'dotenv';
dotenv.config({ path: `../../.env` });

import { 
  getAllResponses,
} from '../youtube/rest.js';

import { 
  downloadYoutubeSubtitles,
  downloadYoutubeVideo,
  downloadYoutubeAll,
} from '../youtube/down.js';

const { YOUTUBE_API_URL, YOUTUBE_API_KEY } = process.env;

// // # rest.ts
// const playlists = await getAllResponses('playlists', { part: 'snippet', channelId: 'UCJIlfUISLIj9DODAQJWGHfA', maxResults: 25 }, YOUTUBE_API_KEY);
// console.log(playlists);

// # down.ts



// const videoId = 'fFIlEGnziMg';
const videoIds = 'zgGSy0seeYc';
await downloadYoutubeSubtitles(videoIds);
// await downloadYoutubeVideo(videoIds);
// const response = await downloadYoutubeAll(videoIds, {});
// console.table(response);

// // const playlistId = 'PLa67URrD8G_iSqfCFlw0683wH0TPFV5ys';
// // const playlistId = 'PL8vH7pXTpMi1byn3s2yj2vNw1gV4Qse1l';
// const playlistId = 'PL8vH7pXTpMi1byn3s2yj2vNw1gV4Qse1l';
// const playlistId = 'PL7jH19IHhOLNiUmS1s_4gKfWU43r8c-0p';
// await downloadPlaylist({ playlistId });

// const files = listFiles();
// console.log(files);

// const ids = listIdsInDir();
// console.log(ids);

// const srtPath =
//   'C:/JnJ-soft/Projects/internal/jnj-backend/downloads/[SEF2024] AI 어디까지 왔나, 앞으로 어떻게 될까ᅵ박태웅(녹서포럼 의장)_fFIlEGnziMg.srt';
// const vttPath =
//   'C:/JnJ-soft/Projects/internal/jnj-backend/downloads/[SEF2024] AI 어디까지 왔나, 앞으로 어떻게 될까ᅵ박태웅(녹서포럼 의장)_fFIlEGnziMg.vtt';

// convertSrtFileToVtt(srtPath, vttPath);

// const srtDir = 'C:/JnJ-soft/Projects/internal/jnj-backend/downloads';
// const vttDir = 'C:/JnJ-soft/Projects/internal/jnj-backend/downloads';
// convertSrtToVttInFolder(srtDir, vttDir);

// await downloadYoutubeAll({ videoIds: 'zcjTErUqvxM,kdt5J2bpchM' });
// await downloadPlaylist({ playlistId: 'PLOI8xpLfBsbvljNN-Dy37vBvZA33aa_6W' });


// const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCJIlfUISLIj9DODAQJWGHfA&maxResults=25&key=${YOUTUBE_API_KEY}`);
// console.log(response.data);

// const videoIds = [
//   'ekr2nIex040', // video
//   '4RCBcV2Ucpo', // video
//   'c3V_p6SPUFQ', // redirect
//   'h1xDiBr6HD4', // shorts
// ];

// for (const videoId of videoIds) {
//   isShorts(videoId).then((result) => console.log(videoId, result));
// }

// getVideoTitle('zgGSy0seeYc').then((result) => console.log(result));
// getPlaylistTitle('PLqSw3o2OV6pzr8U1BJSCwyosUi0oNiJ9Z').then((result) =>
//   console.log(result)
// );


// # chrome.ts
// console.log(await watchLaterVideoIds("bigwhitekmc"))
// console.log(await historyVideoIds("bigwhitekmc"))
// console.log(await shortsVideoIdsByChannelId('UCUpJs89fSBXNolQGOYKn0YQ'))

// const chrome = await goToUrl({
//   url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
//   headless: false,
// });
