import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const generateDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(cwd(), filepath1);
  const path2 = path.resolve(cwd(), filepath2);

  const fileContent1 = fs.readFileSync(path1, 'utf-8');
  const fileContent2 = fs.readFileSync(path2, 'utf-8');

  const data1 = JSON.parse(fileContent1)
  const data2 = JSON.parse(fileContent2);

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
