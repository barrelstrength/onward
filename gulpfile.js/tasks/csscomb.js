const pathConfig = global.PATH_CONFIG;

if (!pathConfig.csscomb) {
  return;
}

const gulp = require('gulp');
const csscomb = require('gulp-csscomb');

const combTask = function () {
  gulp.task('csscomb', function () {
    return gulp.src(pathConfig.cssCombcomb.combSource)
      .pipe(csscomb(pathConfig.cssCombcomb.combConfigFile))
      .pipe(gulp.dest(pathConfig.cssCombcomb.combDestination));
  });
};

gulp.task('csscomb', combTask);