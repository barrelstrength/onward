const pathConfig = global.PATH_CONFIG;

if (!pathConfig.cssCombcomb) {
  return;
}

let gulp = require('gulp');
let csscomb = require('gulp-csscomb');

let combTask = function () {
  gulp.task('csscomb', function () {
    return gulp.src(pathConfig.cssCombcomb.combSource)
      .pipe(csscomb(pathConfig.cssCombcomb.combConfigFile))
      .pipe(gulp.dest(pathConfig.cssCombcomb.combDestination));
  });
};

gulp.task('csscomb', combTask);