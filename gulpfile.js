'use strict';
var gulp    = require('gulp'),
  less      = require('gulp-less'),
  webserver = require('gulp-webserver'),
  clean     = require('gulp-rimraf'),
  jshint    = require('gulp-jshint'),
  stylish   = require('jshint-stylish'),
  config    = {
    devServer : {
      port              : 8000,
      livereload        : true,
      directoryListing  : false
    }
  },
  staticDir = 'app',
  mainLessFile = 'main.less';

gulp.task('webserver', function () {

  gulp.src(staticDir)
    .pipe(webserver(config.webserver));
});

gulp.task('lint', function () {
  gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
gulp.task('watch-js', function () {
  gulp.watch('app/js/**/*.js', ['lint']);
});

gulp.task('clean-css', function () {
  return gulp.src('app/css/*.css')
    .pipe(clean());
});
gulp.task('build-css', ['clean-css'], function () {
  return gulp.src('app/css/' + mainLessFile)
    .pipe(less({compress: true}))
    .pipe(gulp.dest('app/css'));
});
gulp.task('watch-less', function () {
  return gulp.watch('app/css/*.less', ['build-css']);
});
gulp.task('serve', ['watch-less', 'watch-js', 'webserver'], function () {
  console.log('Dev Server started');
});