const through = require('through2');
const colorConsole = require('../util/colorConsole');

/**
 * @var 记录各个task的 beginTimeStamp
 * */
const all = {};
/**
 * @func gulpConsoleRunTime console 任务耗时
 * @param {String} hook 钩子: 'begin':开始 'end':结束
 * */
function gulpConsoleRunTime(taskName, hook) {
    if (!all[taskName]) all[taskName] = 0;
    return through.obj(function(file, enc, cb) {
        if (hook == 'begin') {
            all[taskName] = new Date().getTime();
        } else {
            colorConsole.info(
                `[${(new Date().getTime() - all[taskName]) / 1000}s] 完成${taskName}
                ${file.path}`
            )
        }
        this.push(file);
        cb();
    });
}

module.exports = gulpConsoleRunTime;
