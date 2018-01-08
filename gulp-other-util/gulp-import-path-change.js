const through = require('through2');

/**
 * @func 将 绝对路径 编译成 相对路径
 * @func 将 runtime 引进 js 解决 async
 * @example
 *      src/pages/home/index.zee文件引用 /src/lib/runtime.js
 *      -> 编译成 -> ./../../lib/runtime.js
 * */
function gulpImportPathChange() {
    return through.obj(function(file, enc, cb) {
        const pathBaseOnSrc = file.path.replace(file.base, '');
        const levels = pathBaseOnSrc.match(/[/\\]/g).length;
        const relativePath = './' + '../'.repeat(levels);
        let contents = file.contents.toString();
        contents = contents.replace(/[/\\]src[/\\]/g, relativePath);
        file.contents = Buffer.from(contents);
        this.push(file);
        cb();
    })
}

module.exports = gulpImportPathChange;
