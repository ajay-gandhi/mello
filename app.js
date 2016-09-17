
var util = require('./util'),
    fs   = require('fs');

var command = process.argv[2];

if (command === 'setup') {
  console.log('Recording for setup...');
  // Record sample and set config
  util.record(function (res) {
    if (res.fingerprint) {
      var config = {
        f: res.fingerprint
      }
      fs.writeFile('./config.json', JSON.stringify(config), function (err) {
        if (err) return console.error('Error writing config file:', err);
        console.log('Saved config. Setup complete!');
      });
    }
  });

} else if (command = 'test') {
  console.log('Recording for test...');
  // Record sample and set config
  var truth = require('./config');
  util.record(function (res) {
    if (res.fingerprint) {
      console.log('Voices match:', util.compare(truth.f, res.fingerprint));
    }
  });
}
