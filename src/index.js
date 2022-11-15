import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import chooseFormat from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const format = getFormat(filepath);
  return parse(content, format);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(buildAbsolutePath(filepath1));
  const data2 = getData(buildAbsolutePath(filepath2));
  const differences = buildTree(data1, data2);

  return chooseFormat(differences, formatName);
};

export default genDiff;
