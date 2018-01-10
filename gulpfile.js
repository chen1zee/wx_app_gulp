const gulp = require('gulp');
const watch = require('gulp-watch');
const gulpZeeToWxapp = require('./gulp-zee-to-wxapp');
const sourcemaps = require('gulp-sourcemaps');
const gulpImportPathChange = require('./gulp-other-util/gulp-import-path-change');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');

const prod = process.env.NODE_ENV == 'production';

gulp.task('zee-file', () => (
    gulp.src('src/**/*.zee')
        .pipe(gulpZeeToWxapp())
        .pipe(gulp.dest('dist'))
));

gulp.task('lib-js', () => (
    gulp.src('src/lib/**/*.js', { base: 'src' })
        .pipe(gulp.dest('dist'))
));


gulp.task('run', ['lib-js', 'zee-file']);
