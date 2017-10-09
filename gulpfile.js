'use strict';

var gulp = require('gulp');

// js variables
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var watch  = require('gulp-watch');
var connect = require('gulp-connect');

// scss variables
var sass = require('gulp-sass');

// postcss variables
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano      = require('gulp-cssnano');

var paths = {
    css:  ['public/css/**/*.css'],
    js:   ['public/js/includes/**/*.js', 'public/js/includes/**/*.min.js'],
    scss: ['public/scss/**/*.scss'],
    html: ['public/*.html']
};

gulp.task('connect', function() {
    connect.server({
        root: './',
        port: 3000,
        livereload: true
    });
});

gulp.task('scss', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('css', function () {
    return gulp.src(paths.css)
    // .pipe(cssnano())
        .pipe(postcss([ autoprefixer({ browsers: ['ie >= 8', 'last 10 versions', '> 1%'] }) ]))
        .pipe(gulp.dest('public/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// gulp.task('default', function () {
//     gulp.watch(paths.scss, ['scss']);
//     gulp.watch(paths.css, ['css']);
//     gulp.watch(paths.js, ['js']);
// });

gulp.task('watch', function () {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.scss, ['scss']);
    // gulp.watch(paths.css, ['css']);
    // gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['connect', 'watch']);