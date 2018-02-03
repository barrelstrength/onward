const pathConfig = global.PATH_CONFIG;

if (!pathConfig.js) {
  return;
}

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');
const del = require('del');
const rev = require('gulp-rev');
const gutil = require('gulp-util');

const jsTask = function () {

  //Remove old files
  del.sync(pathConfig.js.jsDest, {force: true});

  // Lint Task
  gulp.src(pathConfig.js.jsSourceFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  //concatenate & minify
  gulp.src(pathConfig.js.jsSourceFiles)
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(concat(pathConfig.js.concatJs))
    .pipe(rename(pathConfig.js.productionJs))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write(pathConfig.js.sourcemapDest, {
      sourceRoot: pathConfig.js.sourcemapSourceRoot,
      sourceMappingURLPrefix: pathConfig.js.sourcemapDest
    }))
    .pipe(gulp.dest(pathConfig.js.jsDest))

    // File revving
    .pipe(rev())
    .pipe(gulp.dest(pathConfig.js.jsDest))
    .pipe(rev.manifest(pathConfig.rev.manifest.destination + "/" + pathConfig.rev.manifest.filename, {
      base: pathConfig.rev.manifest.destination,
      merge: true
    }))
    .pipe(gulp.dest(pathConfig.rev.manifest.destination))

    // Notification
    .pipe(notify({message: 'JS task complete'}));

  // Merges and minifies JS Library files
  gulp.src(pathConfig.js.jsLibrarySourceFiles)
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(concat(pathConfig.js.jsLibraries))
    .pipe(gulp.dest(pathConfig.js.jsDest))

    .pipe(rename(pathConfig.js.jsLibrariesMinified))
    .pipe(uglify())
    .pipe(sourcemaps.write(pathConfig.js.sourcemapDest, {
      sourceRoot: pathConfig.js.sourcemapSourceRoot,
      sourceMappingURLPrefix: pathConfig.js.sourcemapDest
    }))
    .pipe(gulp.dest(pathConfig.js.jsDest))
    .pipe(notify({message: 'JS (Libraries) task complete'}));


  // Error handling
  gulp.on('err', function (err) {
    console.log(err);
  });

  livereload.listen();
};

gulp.task('js', jsTask);
gulp.watch(pathConfig.js.watchFiles, pathConfig.js.watchTasks);