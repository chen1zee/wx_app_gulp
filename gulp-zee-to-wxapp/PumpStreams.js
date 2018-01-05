const pump = require('pump');
const breakFile = require('./util/breakFile');
const VinylReadStream = require('./VinylReadStream');
/**
 * pump stream 类
 * @function {}
 * */
class PumpStreams {
    /**
     * @param {Object} file vinyl文件对象
     * @param {Object} opt gulpZeeToWxapp的配置对象
     * @property {Object} _file
     * @property {Object} _opt
     * @property {Object} _vinylPublicOption 制作分离后 (zee -> js,json,wxml,less)的vinyl文件对象 公共配置
     * @property {Object} _afterBreakContents 分离后的 contents(Buffer) 对象 (js,json,wxml,less)
     * @property {Object} _opt
     * */
    constructor(file, opt) {
        this._file = file;
        this._opt = opt;
        this._vinylPublicOption = {
            cwd: file.cwd,
            base: file.base,
            pathWithoutExt: file.path.replace(/\.\w+$/, '')
        };
    }
    /**
     * @func 分离文件
     * */
    breakOriginFile() {
        this._afterBreakContents = breakFile(this._file.contents.toString());
    }
    /**
     * @func 启动4个(js,json,wxml,less)流操作
     * */
    pumpStreams() {
        this._makePump('js');
        this._makePump('json');
        this._makePump('wxml');
        this._makePump('less');
    }
    /**
     * @func 制作对应ext的流操作
     * @param {String} ext 文件后缀: js || json || wxml || less
     * */
    _makePump(ext) {
        const content = this._afterBreakContents[ext];
        if (!content || /^[\W]*$/.test(content)) return;
        pump([
            new VinylReadStream({
                vinylPublicOption: this._vinylPublicOption,
                ext,
                contents: Buffer.from(content)
            })
        ].concat(this._opt[ext].map(i => i())));
    }
}

module.exports = PumpStreams;
