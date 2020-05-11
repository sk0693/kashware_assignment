// const multer = require('multer');
const compressing = require('compressing');
const { v4: uuid } = require('uuid');

var fs = require('fs')

function getDestination(req, file, cb) {
    cb(null, '/dev/null')
}

function getFileName(req, file, cb) {
    cb(null, Date.now());
}

function MyCustomStorage(opts) {
    this.getDestination = (opts.destination || getDestination);
    this.getFileName = (opts.filename || getFileName);
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    this.getDestination(req, file, (err, path) => {

        if (err) return cb(err);

        this.getFileName(req, file, (err, fileExt, mimeType) => {

            if (err) return cb(err);

            let filename = uuid();
            let canCompressed;

            path += '/' + filename;

            if (['.txt'].includes(fileExt)) {
                canCompressed = true;
                req['isCompressed'] = true;
                fileExt = '.gz';
            }

            path += fileExt;
            filename += fileExt;

            var outStream = fs.createWriteStream(path);

            if (canCompressed) {
                file.stream.pipe(new compressing.gzip.FileStream()).pipe(outStream)
            } else {
                file.stream.pipe(outStream);
            }


            req['filename'] = filename;
            req['mimeType'] = mimeType;

            outStream.on('error', cb)
            outStream.on('finish', function () {
                cb(null, {
                    path: path,
                    size: outStream.bytesWritten
                })
            })
        })
    })
}

// const compressed = (stream) => {
//     return compressing.gzip.compressFile(stream, 'path/to/destination.gz')
//         .then(compressDone)
// }


MyCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    fs.unlink(file.path, cb)
}

// var storage = new MyCustomStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/var/www/uploads/' + file.originalname)
//     }
// })


// const upload = multer({ storage: storage })

// module.exports = upload;

module.exports = function (opts) {
    return new MyCustomStorage(opts)
}


