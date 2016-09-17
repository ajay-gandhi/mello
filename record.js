
var record = require('node-record-lpcm16'),
    fs     = require('fs');

var file = fs.createWriteStream(process.argv[2] || 'test.wav', { encoding: 'binary' });

record.start();

// Stop recording after three seconds and write to file
setTimeout(function () {
  record.stop().pipe(file);
}, 3000);
