export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',

  clearMocks: true,

  moduleNameMapper: {
    // Only rewrite imports inside src/ that end in `.js`
    '^(.*/src/.*)\\.js$': '$1.ts',
  },
};
