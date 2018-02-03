const gulp = require('gulp');
const del  = require('del');
const path = require('path');

const cleanTask = function () {
  let patterns = global.TASK_CONFIG.clean && global.TASK_CONFIG.clean.patterns ?
    global.TASK_CONFIG.clean.patterns :
    path.resolve(process.env.PWD, global.PATH_CONFIG.basePath.dest);

  return del(patterns, { force: true });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
