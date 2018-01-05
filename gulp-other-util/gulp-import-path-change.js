const through = require('through2');

function gulpImportPathChange() {
    return through.obj(function(file, enc, cb) {
        this.push(file);
        cb();
    })
}

module.exports = gulpImportPathChange;