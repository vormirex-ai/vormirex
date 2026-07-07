export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',

  clearMocks: true,

  resolver: '<rootDir>/jest-resolver.cjs',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
