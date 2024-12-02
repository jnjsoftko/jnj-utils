// https://ai.google.dev/gemini-api/docs?hl=ko#node.js


// // import dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai';

// ? UserMade Modules
// import { loadJson, saveJson } from '../base/index.js';
import { loadYaml } from '../doc/index.js';


// const generationConfig = {
//   stopSequences: ["red"],
//   maxOutputTokens: 200,
//   temperature: 0.9,
//   topP: 0.1,
//   topK: 16,
// };

// // The Gemini 1.5 models are versatile and work with most use cases
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",  generationConfig });


// & Class AREA
// &---------------------------------------------------------------------------
export class GoogleGemini {
  apiKey;
  genAI;
  model;

  // & CONSTRUCTOR
  constructor({
    user = 'bigwhitekmc',
    model = 'gemini-1.0-pro',
    accountYaml = `C:/JnJ-soft/Developments/_Settings/Apis/ai/gemini/accounts.yaml`,
    generationConfig = {
      temperature: 0,
      topP: 0.1,
      topK: 16,
    },
  } = {}) {
    // "gemini-pro"
    const accounts: any = loadYaml(accountYaml);
    this.apiKey = accounts[user]['api_key'];
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model, generationConfig });
  }

  // &
  answer = async (prompt: string) => {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };
}



// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({
//   model: 'gemini-1.5-pro',
//   tools: [
//     {
//       codeExecution: {},
//     },
//   ],
// });

// const result = await model.generateContent(
//   'What is the sum of the first 50 prime numbers? ' +
//     'Generate and run code for the calculation, and make sure you get all 50.',
// );

// const response = result.response;
// console.log(response.text());