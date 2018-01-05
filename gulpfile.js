const gulp = require('gulp');
const watch = require('gulp-watch');
const gulpZeeToWxapp = require('./gulp-zee-to-wxapp');
const sourcemaps = require('gulp-sourcemaps');
const gulpImportPathChange = require('./gulp-other-util/gulp-import-path-change');
const babel = require('gulp-babel');

gulp.task('zee-file', () => (
    gulp.src('src/**/*.zee')
        .pipe(gulpZeeToWxapp({
            js: [
                sourcemaps.init,
                gulpImportPathChange,
                babel,
                sourcemaps.write.bind(null, 'sourcemaps'),
                gulp.dest.bind(null, 'dist')
            ],
            json: [
                gulp.dest.bind(null, 'dist')
            ],
            wxml: [
                gulp.dest.bind(null, 'dist')
            ],
            less: [
                gulp.dest.bind(null, 'dist')
            ]
        }))
));
