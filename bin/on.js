#!/usr/bin/env node
const path = require('path');
const colors = require('ansi-colors');

const onwardGulpDirectory = path.resolve(__dirname, '../gulpfile.js')
const gulpModulePath = path.dirname(require.resolve('gulp'))
const gulpBinaryFile = path.join(gulpModulePath, '/bin/gulp')

// Handle any arguments
const customArgs = require('yargs')
  .usage('Usage: yarn run $0 <gulp-task-name> [options]')
  .describe('init', 'Setup a project with default config and template files.')
  .example('yarn run on init', 'Copies default config and template files to your project folder:' + "\n\n" +
    colors.grey('./gulfile.js/config/path-config.json') + "\n" +
    colors.grey('./gulfile.js/config/task-config.js') + "\n" +
    colors.grey('./source/fonts') + "\n" +
    colors.grey('./source/icons') + "\n" +
    colors.grey('./source/images') + "\n" +
    colors.grey('./source/scripts') + "\n" +
    colors.grey('./source/styles')
  )
  .argv._;

// Setup the arguments we need to initialize gulp in our package directory
// For example: ./gulp [--gulpfile onward/gulpfile.js/index.js]
let args = ['--gulpfile', onwardGulpDirectory];

// Append any additional arguments we have when we trigger gulp
// For example: ./gulp --gulpfile onward/gulpfile.js/index.js [gulpTaskName]
if (customArgs.length) {
  args = args.concat(customArgs);
}

// Run onward/gulpfile.js/index.js
require('child_process').fork(gulpBinaryFile, args);
