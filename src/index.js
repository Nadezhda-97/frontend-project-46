import _ from 'lodash';

const getDiff = (data1, data2) => {
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

export default getDiff;
