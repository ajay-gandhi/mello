
var fpcalc = require('fpcalc');

fpcalc(process.argv[2] || './test.wav', function (err, result) {
  if (err) throw err;
  console.log(result.file, result.duration, result.fingerprint);
});
