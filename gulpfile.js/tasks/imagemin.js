const pathConfig = global.PATH_CONFIG;

if (!pathConfig.imagemin) {
  return;
}

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

let imageminTask = function () {
  gulp.src(pathConfig.imagemin.sourceImages)
    .pipe(imagemin())
    .pipe(gulp.dest(pathConfig.imagemin.optimizedImages))
};

gulp.task('imagemin', imageminTask);
gulp.watch(pathConfig.imagemin.sassWatch, imageminTask);