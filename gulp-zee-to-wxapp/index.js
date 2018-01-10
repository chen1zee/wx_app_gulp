const through = require('through2');
const breakFile = require('./util/breakFile');
const makeVinylFile = require('./util/makeVinylFile');
const colorConsole = require('./util/colorConsole');

/**
 * @func 处理zee文件
 * @description 向流推入 js,json,wxml,less 4个chunk
 * */
function gulpZeeToWxapp() {
    return through.obj(function(file, enc, cb) {
        const vinylPublicOption = {
            cwd: file.cwd,
            base: file.base,
            pathWithoutExt: file.path.replace(/\.\w+$/, '')
        };
        try {
            const afterBreakObj = breakFile(file.contents.toString());
            this.push(makeVinylFile({
                vinylPublicOption, ext: 'wxml',
                contents: Buffer.from(afterBreakObj.wxml)
            }));
            this.push(makeVinylFile({
                vinylPublicOption, ext: 'js',
                contents: Buffer.from(afterBreakObj.js)
            }));
            this.push(makeVinylFile({
                vinylPublicOption, ext: 'json',
                contents: Buffer.from(afterBreakObj.json)
            }));
            this.push(makeVinylFile({
                vinylPublicOption, ext: 'less',
                contents: Buffer.from(afterBreakObj.less)
            }));
        } catch(e) {
            colorConsole.error(`${file.path} 在 gulpZeeToWxapp 流处理中出错`);
            colorConsole.error(`${e}`);
        } finally {
            cb();
        }
    });
}

module.exports = gulpZeeToWxapp;
