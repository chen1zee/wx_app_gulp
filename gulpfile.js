const gulp = require('gulp');
const watch = require('gulp-watch');
const gulpZeeToWxapp = require('./gulp-zee-to-wxapp');
const gulpExtraPass = require('./gulp-other-util/gulp-extract-pass');
const gulpConsoleRunTime = require('./gulp-other-util/gulp-console-run-time');
const sourcemaps = require('gulp-sourcemaps');
const gulpImportPathChange = require('./gulp-other-util/gulp-import-path-change');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const prod = process.env.NODE_ENV == 'production';

/**
 * 分离文件
 * */
gulp.task('break-zee-file', ['watch-pre-dist'], zeeFileHandlers.bind(gulp.src('src/**/*.zee')));
gulp.task('watch-break-zee-file', ['break-zee-file'], zeeFileHandlers.bind(watch('src/**/*.zee')));


gulp.task('watch-pre-dist', () => {

});

gulp.task('lib-js', () => (
    gulp.src('src/lib/**/*.js', { base: 'src' })
        .pipe(gulp.dest('dist'))
));



function zeeFileHandlers() { // 处理 .zee 文件
    return this
        .pipe(gulpZeeToWxapp())
        .pipe(gulp.dest('.pre-dist'));
}
function preDistWxmlHandlers() { // 处理 分离后的 wxml
    return this
        .pipe(gulp.dest('dist'));
}
function preDistJsHandlers() { // 处理 分离后的 js
    return this
        .pipe(babel())
        .pipe(gulp.dest('dist'));
}
function preDistJsonHandlers() { // 处理 分离后的 json
    return this
        .pipe(gulp.dest('dist'));
}
function preDistLessHandlers() { // 处理 分离后的 less
    return this
        .pipe(gulp.dest('dist'));
}

/**
 * 启动顺序
 *     .pre-dist@once -> watch-.pre-dist -> break-zee-file@once -> watch-src/zee-file
 * */
gulp.task('zee-file', ['watch-break-zee-file']);