const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const merge = require('merge-stream');

const appPath = require('app-root-path');
const projectPath = appPath.require('helpers/project-path-helper');

gulp.task('init', function() {

  let pathConfigPath = projectPath.resolve('gulpfile.js/config');
  let pathConfigStream = gulp.src(['gulpfile.js/config/path-config.json'])
    .pipe(gulp.dest(pathConfigPath));

  let taskConfigPath = projectPath.resolve('gulpfile.js/config');
  let taskConfigStream = gulp.src(['gulpfile.js/config/task-config.js'])
    .pipe(gulp.dest(taskConfigPath));

  let sourcePath = projectPath.resolve(global.PATH_CONFIG.basePath.source);
  let srcStream = gulp.src(['source/**/*', 'source/**/.gitkeep'])
    .pipe(gulp.dest(sourcePath));

  log(colors.green('Generating default Onward project files'));
  log(colors.yellow(`
To start the dev server:
`), colors.magenta(`
yarn run on
`));

  return merge(pathConfigStream, taskConfigStream, srcStream);
});