import dotenv from 'dotenv';
import { chatGpt, chatPerplexity, chatClaude } from '../ai/index.js';
import { saveJson } from '../base/index.js';

dotenv.config({ path: '../../.env' });

const { CHATGPT_API_KEY, PERPLEXITY_API_KEY, CLAUDE_API_KEY } = process.env;

// * ChatGPT

if (!CHATGPT_API_KEY) {
  throw new Error('CHATGPT_API_KEY is not set in environment variables');
}

const res = await chatGpt('Hello, ChatGPT', CHATGPT_API_KEY);

saveJson('../../_playground/results/chatgpt_01.json', res);


// console.log(PERPLEXITY_API_KEY);

// # Perplexity

// if (!PERPLEXITY_API_KEY) {
//   throw new Error('PERPLEXITY_API_KEY is not set in environment variables');
// }

// const message = '2024년도 현재 지구의 인구는?';
// const system = 'Answer in Korean.';

// (async () => {
//   try {
//     const res = await chatPerplexity(message, PERPLEXITY_API_KEY, { system });
//     saveJson('../../_playground/results/perplexity_01.json', res);
//   } catch (error) {
//     console.error('Test failed:', error);
//   }
// })();


// // # Claude

// if (!CLAUDE_API_KEY) {
//     throw new Error('CLAUDE_API_KEY is not set in environment variables');
//   }
  
// const message = '2024년도 현재 지구의 인구는?';
// const system = 'Answer in Korean.';

// (async () => {
// try {
//   const res = await chatClaude(message, CLAUDE_API_KEY);
//   saveJson('../../_playground/results/claude_01.json', res);
// } catch (error) {
//   console.error('Test failed:', error);
// }
// })();
