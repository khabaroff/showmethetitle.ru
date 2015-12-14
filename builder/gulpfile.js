'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin')
;

var path = {
    build: {
        html: '../',
        js: '../',
        css: '../'
    },

    src: {
        html: '../parts/html/index.html',
        js: '../parts/js/index.js',
        css: '../parts/css/index.css'
    },

    watch: {
        html: '../parts/html/*.html',
        js: '../parts/js/*.js',
        css: '../parts/css/*.css'
    }
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html));
});


gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним
        .pipe(uglify()) //Сожмем
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build

});


gulp.task('css:build', function () {
    gulp.src(path.src.css) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(minifycss()) //Сожмем наш js
        .pipe(gulp.dest(path.build.css)); //Выплюнем готовый файл в build

});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build'
]);


gulp.task('watch', function () {


    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });

    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });

    watch([path.watch.css], function (event, cb) {
        gulp.start('css:build');
    });
});

gulp.task('default', ['build', 'watch']);