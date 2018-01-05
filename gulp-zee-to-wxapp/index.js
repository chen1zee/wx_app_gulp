const through = require('through2');
const colorConsole = require('./util/colorConsole');
const PumpStreams = require('./PumpStreams');

/**
 * 处理zee文件
 * @param {Object} opt
 * @param {Array} opt.js 数组，处理js的transform流
 * @param {Array} opt.less 数组，处理less的transform流
 * @param {Array} opt.wxml 数组，处理wxml的transform流
 * @param {Array} opt.json 数组，处理json的transform流
 * */
function gulpZeeToWxapp(opt) {
    return through.obj(function(file, enc, cb) {
        const pumpStream = new PumpStreams(file, opt);
        try {
            pumpStream.breakOriginFile();
            pumpStream.pumpStreams();
            cb();
        } catch(e) {
            colorConsole.error(`${file.path} gulpZeeToWxapp出错`);
            colorConsole.error(`${e}`);
            cb();
        }
    })
}

module.exports = gulpZeeToWxapp;