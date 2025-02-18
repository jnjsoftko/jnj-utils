export {
  popDict, // pop for dictionary
  serializeNonPOJOs, // NonPOJO -> POJO(Plain Old Java Object) object
  // ? string
  evalStr, // Evaluate String including `${expression}`
  includesMulti, // Check Includes at Multiple String(array)
  strFromAny, // String From Any Data
  rowsFromCsv, // Convert Comma-Separated Values(`csv`) => Array of Array(`rows`)
  csvFromRows, // rows -> csv
  // ? arr, rows, duo, duos, dict, dicts
  newKeys, // New Dict Keys(maps의 key들에 대해, 변경된 key 이름으로 dict 생성)
  renameKeys, // Rename Dict Keys(obj의 key들에 대한 이름 변경(변경 되지 않은 것은 유지))
  overwriteKeys, //Overwrite Dict Keys(newKeys(신규 key 추가) + rename(key 이름 변경))
  updateKeys, // Update Dict Keys
  arrFromArrs, // Returns arr From rows(array of array)
  arrFromDicts, // Returns arr From dicts (extract values by key)
  dictFromDuo, // Returns Dict(object) From Duo(Keys, Vals)
  dictsFromDuos, //Returns Dicts(objects) From Duos(Keys, Valss)
  duoFromDict, // Duo From Dict
  rowsFromDicts, // Rows From Dicts
  dictsFromRows, //Dicts From Rows
  arrsFromDicts, // Returns
  dictsFromArrs, // Returns
  rowsAddedDefaults, // Rows Added Default Values
  swapDict, // Swap Dict Key-Value
  getUpsertDicts, // Get Upsert Dicts({adds: [], dels: [], upds: []})
  removeDictKeys, // Remove Keys From Dict
  //  ? date, time
  now,
  delay,
  sleep,
  sleepAsync,
  // * builtin
  slashedFolder, //
  setPath, // 상대경로->절대경로(실행 폴더 기준) './dir1/dir2' =>
  sanitizeName, // 파일명으로 사용가능하도록 문자열 변경
  loadFile, //
  loadJson, //
  saveFile, //
  saveJson, //
  makeDir, //
  copyDir, // 폴더 복사(recursive)
  findFiles, // 파일 목록
  findFolders, // 하위 folder 목록
  existsFolder, // 폴더 존재여부
  existsFile, // 파일 존재여부
  exists, // 경로 존재여부
  moveFile,
  moveFiles,
  // * cli
  exec,
  exe
} from './base/index.js'

export {
  // * request
  requestGet,
  requestPost,
  requestPatch,
  requestDelete,
  requestUpsert,
  requestGql,
  // * cheerio
  Cheerio,
  // * chrome
  Chrome,
  getProfileByEmail
} from './web/index.js';

export {
  loadCsv, saveCsv,
  loadYaml, saveYaml,
  loadIni, saveIni,
  tsvFromSrt, // Convert SubRipText(`srt`) format string => Tab-Separated Values(`tsv`) format string
  srtFromTsv, // Convert Tab-Separated Values(`tsv`) => SubRipText(`srt`)
  txtFromSrt, // Convert SubRipText(`srt`) format string => Text(`txt`) format string
  tsvFromVtt, // Convert Timed Text Markup Language(`vtt`) format string => Tab-Separated Values(`tsv`) format string
  txtFromVtt, // Convert Timed Text Markup Language(`vtt`) format string => Text(`txt`) format string
  convertStr, // convert string format
  srtToVtt, 
  vttToSrt, 
  convertSrtFileToVtt, 
  convertSrtToVttInFolder 
} from './doc/index.js';

export {
  GoogleAuth,
  GoogleSheets,
  GoogleScript,
  Youtube,
  GoogleGemini,
  GoogleCalendar
} from './google/index.js';

export {
  watchLaterVideoIds,
  historyVideoIds,
  shortsVideoIdsByChannelId,
  downloadYoutubeSubtitles,
  downloadYoutubeVideo,
  downloadYoutubeAll,
  downloadYoutubePlaylist,
  videosFromVideoIds
} from './youtube/index.js';
