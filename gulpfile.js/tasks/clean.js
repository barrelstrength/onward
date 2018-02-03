const gulp = require('gulp');
const del  = require('del');

const appPath = require('app-root-path');
const projectPath = appPath.require('helpers/project-path-helper');

const cleanTask = function () {
  let patterns = global.TASK_CONFIG.clean && global.TASK_CONFIG.clean.patterns ?
    global.TASK_CONFIG.clean.patterns :
    projectPath.resolve(global.PATH_CONFIG.basePath.dest);

  return del(patterns, { force: true });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
