const { Readable } = require('stream');
const Vinyl = require('vinyl');

/**
 * @class VinylReadStream
 * @summary 生成 vinyl可读流
 * @param {Object} vinylPublicOption
 * @param {String} vinylPublicOption.cwd 当前工作目录
 * @param {String} vinylPublicOption.base glob解析的基础路径
 * @param {String} vinylPublicOption.pathWithoutExt 路径
 * @param {String} ext 后缀(不含'.')
 * @param {Buffer} contents Buffer内容
 * */
class VinylReadStream extends Readable {
    constructor({ vinylPublicOption, ext, contents }) {
        super({
            highWaterMark: 64 * 1024,
            objectMode: true
        });
        this.vinylFile = new Vinyl({
            cwd: vinylPublicOption.cwd,
            base: vinylPublicOption.base,
            path: vinylPublicOption.pathWithoutExt + '.' + ext,
            contents
        });
        this.canRead = true;
    }
    _read() {
        if (this.canRead) {
            this.push(this.vinylFile);
            this.canRead = false;
        } else {
            this.push(null);
        }
    }
}

module.exports = VinylReadStream;
