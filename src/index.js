import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import parse from './parsers.js';

const generateDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(cwd(), filepath1);
  const path2 = path.resolve(cwd(), filepath2);

  const content1 = fs.readFileSync(path1, 'utf-8');
  const content2 = fs.readFileSync(path2, 'utf-8');

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keys = [...keys1, ...keys2];
  const sorted = _.sortBy(_.uniq(keys));

  const differences = sorted.map((key) => {
    const result = [];
    if (_.has(data1, key) && !_.has(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}`);
    }

    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        result.push(`    ${key}: ${data1[key]}`);
      } else {
        result.push(`  - ${key}: ${data1[key]}`);
        result.push(`  + ${key}: ${data2[key]}`);
      }
    }

    if (!_.has(data1, key) && _.has(data2, key)) {
      result.push(`  + ${key}: ${data2[key]}`);
    }

    return result;
  });

  const newDifferences = differences.flat();
  return `{\n${newDifferences.join('\n')}\n}`;
};

export default generateDiff;
