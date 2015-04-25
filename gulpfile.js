/*   _______           _        _______ 
 *  (  ____ \|\     /|( \      (  ____ )
 *  | (    \/| )   ( || (      | (    )|
 *  | |      | |   | || |      | (____)|
 *  | | ____ | |   | || |      |  _____)
 *  | | \_  )| |   | || |      | (
 *  | (___) || (___) || (____/\| )
 *  (_______)(_______)(_______/|/
 */

var path = require('path');
var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var filesize = require('gulp-filesize');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


var config = {
  sass: {
    watch: ['app/assets/scss/*.scss', 'app/assets/scss/**/*.scss'],
    compile: ['app/assets/scss/main.scss', 'app/assets/scss/vendors.scss']
  },
  js: {
    watch: ['app/assets/js/*.js','app/assets/js/**/*.js'],
    compile: ['app/assets/js/*.js','app/assets/js/**/*.js']
  },
  css: 'app/assets/css'
};

gulp.task('clean', function() {
  return gulp.src('build', {
      read: false
    })
    .pipe(clean());
});

gulp.task('sass', function() {
  return gulp.src('app/assets/scss/*.scss')
    .pipe(changed(config.css))
    .pipe(sass({
      paths: [path.join(__dirname, 'scss', 'includes')]
    }))
    .pipe(gulp.dest(config.css))
    .on('error', gutil.log);
});

gulp.task('sass:watch', function() {
  watch(config.sass.watch, function(files) {
    return files
      .pipe(sourcemaps.init())
      .pipe(sass({
        paths: [path.join(__dirname, 'scss', 'includes')]
      }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest(config.css))
      .on('error', gutil.log);
  });
});

gulp.task('sass:build', function() {
  return gulp.src('app/assets/scss/*.scss')
    .pipe(changed('build/css'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      paths: [path.join(__dirname, 'scss', 'includes')]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/css'))
    .on('error', gutil.log);
});

// Compile scripts
gulp.task('scripts', function() {
  return gulp.src(config.js.compile)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(filesize())
    .on('error', gutil.log)
});

gulp.task('scripts:watch', function() {
  gulp.watch(config.js.watch, ['scripts']);
});

gulp.task('default', ['sass:watch']);
