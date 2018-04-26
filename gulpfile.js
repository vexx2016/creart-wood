var gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var combineMq = require('gulp-combine-mq');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');


//autoprefixer
gulp.task('aprefix', () =>
    gulp.src('./src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('sass', function () {
    var plugins = [
        cssnano()
    ];

    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('combineMq', function () {
    return gulp.src('./css/main.min.css')
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(gulp.dest('tmp'));
});


// watch files for changes and reload
gulp.task('serve', function () {
    gulp.watch('./sass/**/*.scss', gulp.parallel('sass'));
});

