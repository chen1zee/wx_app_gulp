const { Readable } = require('stream');
const through = require('through2');

let i = 5;

class CreateVinylStream extends Readable {
    constructor(options) {
        super(options);
        this.contents = 5;
        this.on('pipe', (src) => {
            console.log('触发 pipe');
            // console.log(src);
            // this._read();
        });
        this.on('readable', () => {
            console.log('触发 readable');
        });
        this.on('data', (file) => {
            console.log('触发 data');
            // console.log(file);
        });
        this.on('end', () => {
            console.log('触发 end');
        });
    }
    _read() {
        if (this.contents) {
            if (this.contents == 3) {
                return this._destroy();
            }
            this.push(Buffer.from(this.contents.toString()));
        } else {
            this.push(null);
        }
        this.contents--;
    }
    _destroy() {
        console.log('调用_destroy');
    }
}

const aaa = new CreateVinylStream();

aaa
    .pipe(through.obj(function(file, enc, cb) {
        // console.log(file);
        cb();
    }));