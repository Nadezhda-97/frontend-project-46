import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import stylish from './formatters/stylish.js';

const generateDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  const content1 = fs.readFileSync(path1, 'utf-8');
  const content2 = fs.readFileSync(path2, 'utf-8');

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);
  const differences = buildTree(data1, data2);

  return stylish(differences);
};

export default generateDiff;
