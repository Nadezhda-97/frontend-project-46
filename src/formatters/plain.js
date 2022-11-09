import _ from 'lodash';

const buildString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  return typeof data === 'string' ? `'${data}'` : String(data);
};

const plain = (data) => {
  const iter = (current, path) => {
    const result = current
      .filter((diff) => diff.type !== 'unchanged')
      .flatMap((diff) => {
        const { name } = diff;
        const newPath = [...path, name];

        switch (diff.type) {
          case 'added':
            return `Property '${newPath.join('.')}' was added with value: ${buildString(diff.value)}`;
          case 'deleted':
            return `Property '${newPath.join('.')}' was removed`;
          case 'changed':
            return `Property '${newPath.join('.')}' was updated. From ${buildString(diff.value1)} to ${buildString(diff.value2)}`;
          case 'nested':
            return iter(diff.children, newPath);
          default:
            throw new Error(`Unknown type: ${diff.type}`);
        }
      });

    return `${result.join('\n')}`;
  };

  return iter(data, []);
};

export default plain;
