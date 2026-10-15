/* eslint-env node */
/* eslint-disable no-undef */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@huis-clos/shared$': '<rootDir>/../../packages/shared/src',
  },
};
