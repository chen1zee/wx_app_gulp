const through = require('through2');

function gulpImportPathChange() {
    return through.obj(function(file, enc, cb) {
        const pathBaseOnSrc = file.path.replace(file.base, '');
        // todo continue
        console.log(pathBaseOnSrc);
        this.push(file);
        cb();
    })
}

module.exports = gulpImportPathChange;