import fs from 'fs';
import path from 'path';
import cwd from 'process';
import parse from './parsers.js';
import buildTree from './buildTree.js';

const generateDiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = path.resolve(cwd(), filepath1);
  const path2 = path.resolve(cwd(), filepath2);

  const content1 = fs.readFileSync(path1, 'utf-8');
  const content2 = fs.readFileSync(path2, 'utf-8');

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);
  const differences = buildTree(data1, data2);

  return differences; //update this later
};

export default generateDiff;
