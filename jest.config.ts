import type {Config} from 'jest';
const path = require('path');

const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
};

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  moduleNameMapper: {
    '@slices': path.resolve(__dirname, './src/services/slices'),
    '@utils-types': path.resolve(__dirname, './src/utils/types'),
    '@api': path.resolve(__dirname, './src/utils/burger-api.ts'),
  }
}

export default config;
