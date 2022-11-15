import { load } from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return load(content);
    case 'yaml':
      return load(content);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default parse;
