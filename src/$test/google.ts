import { 
  GoogleSheets,
  // GoogleCalendar,
  // GoogleDrive,
  // GoogleGemini,
  // GoogleScript,
  // Youtube
} from '../index.js';

import dotenv from 'dotenv';
dotenv.config({ path: `../../.env` });

const { GOOGLE_ACCOUNT, GOOGLE_SPREADSHEET_ID, GOOGLE_SCRIPT_ID } = process.env;

// * googleSheets
const spreadsheetId = GOOGLE_SPREADSHEET_ID;
const googleSheets = new GoogleSheets(spreadsheetId!, {user: GOOGLE_ACCOUNT, type: 'oauth2', scopeDir: 'C:/JnJ-soft/Developments/_Settings/Apis/google/spec', authDir: 'C:/JnJ-soft/Developments/_Settings/Apis/google'});


(async ()=> {
  const client = await googleSheets.init();
  const names = await googleSheets.getSheetNames();
  console.log(names);
})();

// * googleCalendar
// const calendar = new GoogleCalendar("bigwhitekmc");
// await calendar.init();

// // * googleCalendar 테스트
// await calendar.listCalendars();

// * googleDrive
// const gd = new GoogleDrive();
// await gd.init();

// // * googleDrive 테스트
// const files = await gd.listFiles();
// console.log("files", files);

// * googleGemini
// const gem = new GoogleGemini();
// // console.log(gem.apiKey);
// const prompt = "2025년 한국의 거시 경제를 예측해줄 수 있어?";
// const ans = await gem.answer(prompt);
// console.log(ans);


// * googleScript

// const script = new GoogleScript("bigwhitekmc");
// await script.init();

// // * create
// script.createScript("TEST by TYPESCRIPT");

// // * run

// // https://docs.google.com/spreadsheets/d/15cw_5Sf4XBbegiXu9UMg5JZ8mtJ4sWfMTj7yGlqd9JY/edit#gid=0


// * googleYoutube
// const youtube = new Youtube("bigwhitekmc");
// await youtube.init();

// // * subscriptions
// const subscriptions = await youtube.subscriptions();
// console.log(subscriptions);
// console.log(subscriptions.length);

// // // * search
// // const videos = await youtube.search();
// // const channelId = await youtube.channelIdByCustomUrl("@darkgreenchloeJJ-pe6gq");
// // console.log(channelId);

// // // * channelPlaylists
// // const list = await youtube.channelPlaylists(channelId);
// // console.log(list);
// // console.log(list.length);

// // // * videosByPlaylist
// // const playlistId = "PLnAbm0LaZMdMhg5yCz33RiVvEM8pAMb5b";
// // const videos = await youtube.videosByPlaylist(playlistId);
// // // console.log(videos);
// // console.log(videos.length);

// async function testWatchLater() {
//   const youtube = new Youtube("bigwhitekmc");
//   await youtube.init();

//   console.log("'나중에 볼 동영상' 가져오기 시작...");
//   const watchLaterVideos = await youtube.getWatchLaterVideos();
//   console.log("'나중에 볼 동영상' 목록:", watchLaterVideos);
//   console.log("'나중에 볼 동영상' 수:", watchLaterVideos.length);
// }

// testWatchLater().catch(console.error);

// async function testGetMyChannelId() {
//   const youtube = new Youtube("bigwhitekmc");
//   await youtube.init();

//   console.log("내 채널 ID 가져오기 시작...");
//   const myChannelId = await youtube.getMyChannelId();
//   console.log("내 채널 ID:", myChannelId);
// }

// testGetMyChannelId().catch(console.error);
