import { 
  loadCsv, 
} from '../index.js';

const csv = loadCsv('../../_data/test.csv');
console.table(csv)
