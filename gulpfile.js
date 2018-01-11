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
gulp.task('break-zee-file', zeeFileHandlers.bind(gulp.src('src/**/*.zee')));
gulp.task('watch-break-zee-file', ['break-zee-file'], zeeFileHandlers.bind(watch('src/**/*.zee')));


gulp.task('watch-pre-dist', () => {
    watch('.pre-dist/**/*.wxml')
        .pipe(gulp.dest('dist'));
    watch('.pre-dist/**/*.js')
        .pipe(gulp.dest('dist'));
    watch('.pre-dist/**/*.json')
        .pipe(gulp.dest('dist'));
    watch('.pre-dist/**/*.less')
        .pipe(gulp.dest('dist'));
});

gulp.task('lib-js', () => (
    gulp.src('src/lib/**/*.js', { base: 'src' })
        .pipe(gulp.dest('dist'))
));

function zeeFileHandlers() {
    return this
        .pipe(gulpZeeToWxapp())
        .pipe(gulp.dest('.pre-dist'));
}

gulp.task('zee-file', ['watch-break-zee-file', 'watch-pre-dist']);