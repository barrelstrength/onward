const gulp = require('gulp');
const path = require('path');
const log = require('fancy-log');
const colors = require('ansi-colors');
const merge = require('merge-stream');

gulp.task('init', function() {

  let configPath = path.resolve(process.env.INIT_CWD, 'config');
  let configStream = gulp.src(['gulpfile.js/config/path-config.json'])
    .pipe(gulp.dest(configPath));

  let sourcePath = path.resolve(process.env.INIT_CWD, global.PATH_CONFIG.basePath.source);
  let srcStream = gulp.src(['source/**/*', 'source/**/.gitkeep'])
    .pipe(gulp.dest(sourcePath));

  log(colors.green('Generating default Onward project files'));
  log(colors.yellow(`
To start the dev server:
`), colors.magenta(`
yarn run on
`));

  return merge(configStream, srcStream);
});