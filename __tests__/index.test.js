import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', 'fixtures', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const expectedResult = readFile('result.yml').trim();

test('differences', () => {
  expect(generateDiff(filepath1, filepath2)).toEqual(expectedResult);
});
