import dotenv from 'dotenv';
import { chatGpt, chatGemini } from '../ai/index.js';
import { saveJson, loadJson, loadFile, saveFile } from '../base/index.js';
import { txtFromVtt } from '../doc/index.js';

dotenv.config({ path: '../../.env' });

const { CHATGPT_API_KEY, GEMINI_API_KEY } = process.env;

const MAX_TOKENS = 4096;
const SAFETY_MARGIN = 32;
const CHUNK_SIZE = MAX_TOKENS - SAFETY_MARGIN;

async function processTextInChunks(text: string, api_key: string) {
  // 텍스트를 적절한 크기로 분할
  const chunks: string[] = [];
  let currentChunk = '';
  let currentLength = 0;
  
  // 줄바꿈이나 문장 부호를 기준으로 분할
  const lines = text.split(/[\n\r]+/);
  
  for (const line of lines) {
    // 각 줄을 문장 또는 일정 길이로 분할
    const sentences = line
      .split(/(?<=[.!?])\s+|(?<=[\n\r])|(?<=.{500})/g)
      .filter(s => s.trim().length > 0);
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > CHUNK_SIZE) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  // 각 청크별로 맞춤법 검사 실행
  const geminiOptions = {
    model: 'gemini-1.5-flash',
    stopSequences: ["red"],
    maxOutputTokens: MAX_TOKENS,
    temperature: 0.1,
    topP: 0.1,
    topK: 16,
  };

  let fullResult = '';
  
  for (let i = 0; i < chunks.length; i++) {
    const message = `다음 텍스트의 맞춤법을 교정해주세요. 띄어쓰기, 줄바꿈도 교정해주세요. 내용 변경없이 맞춤법만 수정해주세요.:

"""
${chunks[i]}
"""`;

    console.log(`처리 중: ${i + 1}/${chunks.length} 청크`);
    const result = await chatGemini(message, api_key, geminiOptions);
    fullResult += (i > 0 ? '\n' : '') + result.trim();
  }

  return fullResult;
}


// # 자막 맞춤법 교정
const modifyTxtFromVtt = async (srcPath: string, dstPath: string) => {
  // dstPath = '../../_playground/results/geminiSubtitle_01.txt'
  const vtt = loadFile(srcPath);
  // console.log(`vtt 로드 완료: ${vtt}`);
  const text = txtFromVtt(vtt);
  saveFile('../../_playground/results/geminiSubtitle_01.vtt', text);
  const api_key = GEMINI_API_KEY!;
  const result = await processTextInChunks(text, api_key)
  saveFile(dstPath, result);
}


// * 요약
const summarize = async (srcPath: string, dstPath: string, api_key: string= GEMINI_API_KEY!) => {
  const text = loadFile(srcPath);
  const geminiOptions = {
    model: 'gemini-1.5-flash',
    stopSequences: ["red"],
    maxOutputTokens: MAX_TOKENS,
    temperature: 0.5,
    topP: 0.1,
    topK: 16,
  };

  const message = `다음 글의 내용을 요약해주세요.:

  """
  ${text}
  """`;

  const result = await chatGemini(text, api_key, geminiOptions);
  saveFile(dstPath, result);
}

// # TEST


// const srcPath = `C:/JnJ-soft/Projects/internal/jnj-backend/downloads/youtube/🤖블로그 자동화 시리즈(+블로그 팁)_PLqSw3o2OV6pzr8U1BJSCwyosUi0oNiJ9Z/⚡ 블로그 시간 단축의 마법,GPT로 초고속 작업 (자동화 시리즈 2⧸4)_RTL_zB-_DUc.vtt`
// const dstPath = '../../_playground/results/geminiSubtitle_01.txt'

// await modifyTxtFromVtt(srcPath, dstPath);

const srcPath = '../../_playground/results/geminiSubtitle_01.txt'
const dstPath = '../../_playground/results/geminiSubtitle_01_summarized.txt'

await summarize(srcPath, dstPath);

// // 메인 실행 코드
// const text = loadFile('../../_playground/txtFromVtt.txt');

// try {
//   const correctedText = await processTextInChunks(text, GEMINI_API_KEY!);
//   console.log('맞춤법 검사가 완료되었습니다.');
//   saveFile('../../_playground/results/gemini_01.txt', correctedText);
// } catch (error) {
//   console.error('맞춤법 검사 실패:', error);
// }
