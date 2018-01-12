const through = require('through2');


/**
 * @func 判断 chunk.ext 并运行相关流操作
 * @description 改写自gulp-if库
 * @param {String} ext: js||json||wxml||less, undefined时 通过所有文件
 * */

function gulpExtraPass(ext) {
    return through.obj(function(file, enc, cb) {
        this.push(file);
        cb();
    });
}

module.exports = gulpExtraPass;
