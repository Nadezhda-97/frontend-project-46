import _ from 'lodash';

const getStringIndent = (depth, spacesCount = 4) => ' '.repeat((depth * spacesCount) - 2);
const getBracketIndent = (depth, spacesCount = 4) => ' '.repeat((depth * spacesCount) - spacesCount);

const buildString = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${getStringIndent(depth + 1)}  ${key}: ${buildString(value, depth + 1)}`);

  return ['{', ...lines, `${getBracketIndent(depth + 1)}}`].join('\n');
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const result = tree.map((diff) => {
      switch (diff.type) {
        case 'added':
          return `${getStringIndent(depth)}+ ${diff.name}: ${buildString(diff.value, depth)}`;
        case 'deleted':
          return `${getStringIndent(depth)}- ${diff.name}: ${buildString(diff.value, depth)}`;
        case 'changed':
          return `${getStringIndent(depth)}- ${diff.name}: ${buildString(diff.value1, depth)}\n${getStringIndent(depth)}+ ${diff.name}: ${buildString(diff.value2, depth)}`;
        case 'unchanged':
          return `${getStringIndent(depth)}  ${diff.name}: ${buildString(diff.value, depth)}`;
        case 'nested':
          return `${getStringIndent(depth)}  ${diff.name}: ${iter(diff.children, depth + 1)}`;
        default:
          throw new Error(`Unknown type: ${diff.type}`);
      }
    });

    return ['{', ...result, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
