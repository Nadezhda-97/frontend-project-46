import _ from 'lodash';

const buildString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  return typeof data === 'string' ? `'${data}'` : String(data);
};

const plain = (data) => {
  const result = data
    .filter((diff) => diff.type !== 'unchanged')
    .flatMap((diff) => {
      switch (diff.type) {
        case 'added':
          return `Property '${diff.name}' was added with value: ${buildString(diff.value)}`;
        case 'deleted':
          return `Property '${diff.name}' was removed`;
        case 'changed':
          return `Property '${diff.name}' was updated. From ${buildString(diff.value1)} to ${buildString(diff.value2)}`;
        case 'nested':
          return plain(diff.children);
        default:
          throw new Error(`Unknown type: ${diff.type}`);
      }
    });

  return `${result.join('\n')}`;
};

export default plain;
