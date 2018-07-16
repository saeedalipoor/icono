var gulp = require('gulp'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    stylus = require('gulp-stylus'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer').bind(null, {
        browsers: ['last 2 versions', '> 0.2%', 'not dead', 'ie 10']
    });


// less -> css
gulp.task('less', function () {
    return gulp.src('./less/icono.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    return gulp.src('./sass/icono.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build'));
});

// stylus -> css
gulp.task('stylus', function () {
    return gulp.src('./stylus/icono.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build'));
});


// .css -> .min.css
gulp.task('cssmin', function () {
    gulp.src('./build/icono.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});


// live realod the browser
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './',
            index: 'index.html',
            reloadDelay: 2000
        }
    });
});


gulp.task('default', ['browser-sync'], function () {
    // gulp.watch(['./less/**/*.less', './index.html'], ['less']);
    // gulp.watch(['./stylus/**/*.styl'], ['stylus']);
    gulp.watch(['./sass/**/*.scss'], ['sass']);
    gulp.watch(['./build/icono.css'], ['cssmin', browserSync.reload]);
});
