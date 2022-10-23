import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);
const readFile = (path) => fs.readFileSync(path, 'utf-8');
const getData = (data) => JSON.parse(data);

const generateDiff = (filepath1, filepath2) => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);

  const fileContent1 = readFile(path1);
  const fileContent2 = readFile(path2);

  const data1 = getData(fileContent1);
  const data2 = getData(fileContent2);

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
