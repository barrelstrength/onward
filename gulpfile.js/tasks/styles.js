const pathConfig = global.PATH_CONFIG;

if (!pathConfig.styles) {
  return;
}

const gulp = require('gulp'),
  path = require('path'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  notify = require('gulp-notify'),
  csscomb = require('gulp-csscomb'),
  livereload = require('gulp-livereload'),
  del = require('del'),
  gutil = require('gulp-util'),
  rev = require('gulp-rev');

let cssTask = function () {

  //Remove old files
  del.sync(pathConfig.styles.destinationDirectory, {force: true});

  gulp.src(pathConfig.styles.sourceFile, { base: pathConfig.styles.sourcemapSourceRoot })
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(plumber(function (error) {
      gutil.log(error.message);
      this.emit('end');
    }))
    .pipe(sass({
      includePaths: pathConfig.styles.librariesSource
    }))
    .pipe(autoprefixer({
      browsers: pathConfig.styles.browserSupport,
      cascade: false,
      flexbox: true
    }))
    .pipe(sass())
    .pipe(concat(pathConfig.styles.destinationFile))
    .pipe(minifyCss(pathConfig.styles.minifyCssOptions))
    .pipe(sourcemaps.write(pathConfig.styles.sourcemapDest, {
      sourceRoot: pathConfig.styles.sourcemapSourceRoot,
      sourceMappingURLPrefix: pathConfig.styles.sourcemapDest
    }))
    .pipe(gulp.dest(pathConfig.styles.destinationDirectory))

    // File revving
    .pipe(rev())
    .pipe(gulp.dest(pathConfig.styles.destinationDirectory))
    .pipe(rev.manifest(pathConfig.rev.manifest.destination + "/" + pathConfig.rev.manifest.filename, {
      base: pathConfig.rev.manifest.destination,
      merge: true
    }))
    .pipe(gulp.dest(pathConfig.rev.manifest.destination))

    // Notification
    .pipe(notify({message: 'Styles task complete'}));

  // Error handling
  gulp.on('err', function (err) {
    console.log(err);
  });

  livereload.listen();
};

gulp.task('css', cssTask);
gulp.watch(pathConfig.styles.watchFiles, pathConfig.styles.watchTasks);