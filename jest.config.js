module.exports = {
  testURL: 'http://localhost/',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupEnzyme.ts',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  preset: 'ts-jest',
}
