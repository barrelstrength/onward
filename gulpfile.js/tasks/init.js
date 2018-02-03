const gulp = require('gulp');
const path = require('path');
const log = require('fancy-log');
const colors = require('ansi-colors');
const merge = require('merge-stream');

const projectPath = path.resolve(process.env.INIT_CWD);

gulp.task('init', function() {

  let configPath = path.resolve(process.env.INIT_CWD, 'config');
  let configStream = gulp.src(['gulpfile.js/config/config.json'])
    .pipe(gulp.dest(configPath));

  let sourcePath = path.resolve(process.env.INIT_CWD, PATH_CONFIG.tasks.source);
  let srcStream = gulp.src(['source/**/*', 'source/**/.gitkeep'])
    .pipe(gulp.dest(sourcePath));

  log(projectPath + PATH_CONFIG.tasks.source);

  log(colors.green('Generating default Onward project files'));
  log(colors.yellow(`
To start the dev server:
`), colors.magenta(`
yarn run on
`));

  return merge(configStream, srcStream)
})