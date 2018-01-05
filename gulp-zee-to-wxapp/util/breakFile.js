/**
 * @func 将文件str内容转换为小程序对应的 js, wxss, wxml, json
 * @param {String} content
 * @return {Object} {js, less, wxml, json}
 * */
function breakFile(content) {
    // const breakFileObj = {};
    // let _content = content;
    // _content = breakWxml.call(breakFileObj, _content);
    // _content = breakJsJson.call(breakFileObj, _content);
    // breakLess.call(breakFileObj, _content);
    const breakFileObj = new BreakFileObj(content);
    breakFileObj.break();
    return {
        js: breakFileObj.js,
        less: breakFileObj.less,
        wxml: breakFileObj.wxml,
        json: breakFileObj.json
    }
}

// 处理文件 类
class BreakFileObj {
    constructor(content) {
        this.js = null;
        this.less = null;
        this.wxml = null;
        this.json = null;
        this.content = content;
    }
    breakWxml() {
        this.content = this.content.split(/<\/?template>/);
        if (this.content.length == 3) { // 有 template 标签
            if (/^[\W]*$/.test(this.content[1])) {
                this.wxml = null;
            } else { // 有 wxml
                this.wxml = this.content[1]; // 推入 wxml
            }
            return (this.content = this.content[2]);
        }
        // 无 wxml
        this.content = this.content[0];
    }
    breakJsJson() {
        this.content = this.content.split(/<\/?script>/);
        let jsAndJson = this.content[1];
        this.js = this.content[1]; // 推入 js
        jsAndJson = jsAndJson.replace(/(^[\w\W]*?(Page|Component|App)\()|\)[^)]*?$/g, '');
        let temObj;
        try {
            temObj = eval(`(function(){return ${jsAndJson}})()`);
        } catch (e) {
            console.error(`gulp-zee-to-wxapp/breakFile.js : 页面 eval String -> js Object 出错`);
        }
        if (temObj.config) { // 有json字段
            this.json = JSON.stringify(temObj.config) // 推入json
        } else {
            this.json = null
        }
        this.content = this.content[2]
    }
    breakLess() {
        this.content = this.content.split(/<\/?style[^>]*>/);
        if (this.content.length == 3) { // 有 less
            this.less = this.content[1] // 推入 less
        } else {
            this.less = null
        }
    }
    break() {
        this.breakWxml();
        this.breakJsJson();
        this.breakLess();
    }
}

module.exports = breakFile;