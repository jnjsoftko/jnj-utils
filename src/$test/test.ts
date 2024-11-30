import dotenv from 'dotenv';
import {
    // * base
    loadFile,
    saveJson,
    existsFile,
} from '../index.js';


const rst = saveJson('../../_playground/test.json', { test: 'test' });
console.log(existsFile('../../_playground/test.json'));