import generateDiff from '../src/index.js';

const filepath1 = 'fixtures/file1.json';
const filepath2 = 'fixtures/file2.json';

const filepath3 = '/home/kaktus89/frontend-projects/frontend-project-46/fixtures/file1.json';
const filepath4 = 'fixtures/file2.json';

const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test ('difference', () => {
    expect(generateDiff(filepath1, filepath2)).toEqual(result);
    expect(generateDiff(filepath3, filepath4)).toEqual(result);
});
