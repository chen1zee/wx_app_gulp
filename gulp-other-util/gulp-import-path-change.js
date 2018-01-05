const through = require('through2');

function gulpImportPathChange() {
    return through.obj(function(file, enc, cb) {
        for (let i in file) {
            console.log('**********');
            console.log(i);
            console.log(file[i]);
            console.log('**********');
        }
        this.push(file);
        cb();
    })
}

module.exports = gulpImportPathChange;