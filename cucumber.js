module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require steps/**/*.ts',
    '--publish-quiet',
    'features/**/*.feature'
  ].join(' ')
};