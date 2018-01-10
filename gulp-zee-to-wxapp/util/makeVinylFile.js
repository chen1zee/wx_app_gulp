const Vinyl = require('vinyl');

/**
 * @func 制作 vinyl 格式 fileObject
 * @param {Object} vinylPublicOption
 * @param {String} vinylPublicOption.cwd 当前工作目录
 * @param {String} vinylPublicOption.base glob解析的基础路径
 * @param {String} vinylPublicOption.pathWithoutExt 路径
 * @param {String} ext 后缀(不含'.')
 * @param {Buffer} contents Buffer内容
 * */
function makeVinylFile(vinylPublicOption, ext, contents) {
    return new Vinyl({
        cwd: vinylPublicOption.cwd,
        base: vinylPublicOption.base,
        path: vinylPublicOption.pathWithoutExt + '.' + ext,
        contents
    });
}

module.exports = makeVinylFile;
