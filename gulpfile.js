var gulp       = require('gulp');
var gutil      = require('gulp-util');
var sass       = require('gulp-ruby-sass');
var plumber    = require('gulp-plumber');
var webserver  = require('gulp-webserver');
var symlink    = require('gulp-symlink');
var browserify = require('gulp-browserify');


function sassErrorHandler(err) {
  gutil.beep();
  gutil.log(gutil.colors.black.bgRed(err.message));
}


gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('scss', function() {
  return gulp.src('./src/scss/default.scss')
    .pipe(plumber({ errorHandler: sassErrorHandler }))
    .pipe(sass({ sourcemap: true, sourcemapPath: './scss' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src('./src/js/default.js', { read: false })
    .pipe(browserify({ debug: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', function() {
  return gulp.src('./dist')
    .pipe(webserver({ livereload: true }));
});

gulp.task('watch', function() {
  gulp.watch('./src/index.html', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['scss']);
  gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('symlink', function() {
  return gulp.src(['./src/images/', './src/scss/', './src/fonts/'])
    .pipe(symlink(['./dist/images', './dist/scss', './dist/fonts']));
});

gulp.task('default', ['html', 'js', 'scss', 'server', 'watch']);
gulp.task('setup', ['symlink']);

