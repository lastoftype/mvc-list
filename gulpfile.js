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
var plumber = require('gulp-plumber');


var bowerPath = 'app/bower_components';

var paths = {
    js: {
        vendors: [
            'app/bower_components/js-signals/dist/signals.js',
            'app/bower_components/mustache/mustache.js',
            'app/bower_components/spine/lib/spine.js',
            'app/bower_components/spine/lib/local.js'
        ],
        dist: 'dist/js'
    },
    files: ['*.html'],
    scss: ['app/assets/scss/*.scss', 'app/assets/scss/**/*.scss'],
    css: 'app/assets/css'
};

gulp.task('sass', function() {
    gulp.src(paths.scss)
        .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 5% in US','Firefox >= 20'],
            cascade: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scss, ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'sass']);


