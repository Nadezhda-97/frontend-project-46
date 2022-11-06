import _ from 'lodash';

const getCurrentIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);
const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - spacesCount);

const buildString = (value) => {
  const iter = (current, depth) => {
    if (!_.isObject(current)) {
      return String(current);
    }

    const lines = Object
      .entries(current)
      .map(([key, val]) => `${getCurrentIndent(depth)}${key}: ${iter(val, depth + 1)}`);

    return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(value, 1);
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const result = tree.map((diff) => {

      switch (diff.type) {
        case 'added':
          return `${getCurrentIndent(depth)}+ ${diff.name}: ${buildString(diff.value)}`;
        case 'deleted':
          return `${getCurrentIndent(depth)}- ${diff.name}: ${buildString(diff.value)}`;
        case 'changed':
          return `${getCurrentIndent(depth)}- ${diff.name}: ${buildString(diff.value1)}\n${getCurrentIndent(depth)}+ ${diff.name}: ${buildString(diff.value2)}`;
        case 'unchanged':
          return `${getCurrentIndent(depth)}  ${diff.name}: ${buildString(diff.value)}`;
        case 'nested':
          return `${getCurrentIndent(depth)}  ${diff.name}: ${iter(diff.children, depth + 1)}`;
        default:
          throw new Error('Unknown type: `${diff.type}`');
      }
    });

    return ['{', ...result, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(data, 1);
};

export default stylish;

