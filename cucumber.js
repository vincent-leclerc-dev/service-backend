const common = [
  'test/e2e/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require-module module-alias/register', // Load module alias
  '--require test/e2e/step-definitions/**/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
  '--publish-quiet', // Suppress output
].join(' ');

module.exports = {
  default: common,
};
