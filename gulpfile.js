/**
 * Created by Liujx on 2017-06-09 11:48:24
 */
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename');

// js
gulp.task('minifyJs', function() {
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['minifyJs']);
