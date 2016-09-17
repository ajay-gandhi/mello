
var fpcalc = require('fpcalc'),
    record = require('node-record-lpcm16'),
    tmp    = require('tmp'),
    fs     = require('fs');

// var filename = tmp.tmpNameSync();
var filename = 'temp.wav';
var file = fs.createWriteStream(filename, { encoding: 'binary' });

// Constants
var DURATION = 5000;
var THRESHOLD = 0.85;

/**
 * Records audio and calls the callback function with the fingerprint
 */
module.exports.record = function (cb) {
  record.start();

  // Stop recording after three seconds and write to file
  setTimeout(function () {
    record.stop().pipe(file);
    console.log('Recorded');
    fpcalc(filename, function (err, result) {
      if (err) return console.error('Error fingerprinting audio.\nFilename:', file, '\nError:', err);
      console.log(result);
      cb(result);
    });
  }, DURATION);
}

/**
 * Set duration of recorded audio
 */
module.exports.setDuration = function (d) { DURATION = parseInt(d); }

/**
 * Compare two fingerprints using Hamming distance
 */
module.exports.compare = function (fp_ref, fp_comp) {
  var max_size = Math.max(fp_ref.length, fp_comp.length);

  var score = match_score(fp_ref, fp_comp);

  var match = score / max_size;

  console.log(match);
  return match >= THRESHOLD ? true : false;
}

/**
 * Computes the maximum match score, based on Hamming distance
 */
var match_score = function (ref, comp) {
  var max_d = 0;
  var j = 0;
  while (comp.length > 0) {
    var d = 0;
    var min = Math.min(ref.length, comp.length);
    for (var i = 0; i < min; i++) {
      if (ref.charAt(i + j) === comp.charAt(i)) d++;
    }
    if (d > max_d) max_d = d;

    j++;
    comp = comp.slice(0, -1);
  }
  return max_d;
}
