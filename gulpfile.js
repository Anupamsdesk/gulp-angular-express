'use strict';
var gulp    = require('gulp'),
  less      = require('gulp-less'),
  server   = require('gulp-express'),
  clean     = require('gulp-rimraf'),
  jshint    = require('gulp-jshint'),
  stylish   = require('jshint-stylish'),
  karma     = require('gulp-karma'),
  mainLessFile = 'main.less',
  serverConfig = {
    file: 'app.js'
  },
  testFiles = [
    'app/lib/underscore/underscore-min.js',
    'app/lib/angular/angular.min.js',
    'app/lib/angular-route/angular-route.min.js',
    'app/lib/angular-mocks/angular-mocks.js',
    'app/lib/angular-bootstrap/ui-bootstrap.min.js',
    'app/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'app/js/**/*.js',
    'tests/unit/**/*.js'
  ]
;

gulp.task('dev-server', function () {
  server.run(serverConfig);
  gulp.watch(["app/**/*.html", 'app/js/**/*.js'], server.notify);
  gulp.watch(["app.js", 'server/**/*.js'], [server.run]);
});


gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('lint', function () {
  gulp.src('app/js/**/*.js', 'tests/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    ;
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

gulp.task('serve', ['watch-less', 'watch-js', 'test', 'dev-server'], function () {
  console.log('Dev Server started');
});