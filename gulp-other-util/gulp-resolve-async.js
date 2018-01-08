const through = require('through2');

/**
 * @func 为有async的 js 添加runtime包引用
 * @deprecated 可以在 需要 runtime包的页面直接引入，省去一个编译
 * */
function gulpResolveAsync() {
    return through.obj(function (file, enc, cb) {
        const pathBaseOnSrc = file.path.replace(file.base, '');
        const levels = pathBaseOnSrc.match(/[/\\]/g).length;
        const relativePath = './' + '../'.repeat(levels);

        /**
         * 未写完，暂时不用
         * */
        const requireRunTime = `var regeneratorRuntime require `;
        let contents = file.contents.toString();
        contents = 'wait to continue';
    })

}

module.exports = gulpResolveAsync;
