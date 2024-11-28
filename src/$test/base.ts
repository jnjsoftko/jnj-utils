import dotenv from 'dotenv';
import { 
  // * base
  loadFile,
} from '../index.js';


const rst = loadFile('../../package.json');
console.log(rst);