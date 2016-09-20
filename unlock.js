
var applescript = require( 'applescript' );

var TEMPLATE =
  'tell application "System Events"\n' +
    'do shell script "caffeinate -u -t 1"\n' +
    'delay 0.1\n' +
    'tell application "System Events" to tell process "loginwindow"\n' +
      'activate\n' +
        'tell window "Login Panel"\n' +
          'keystroke "PASSWORD"\n' +
          'keystroke return\n' +
        'end tell\n' +
    'end tell\n' +
  'end tell';

module.exports = (function () {

  function Unlocker (password) {
    this.script = TEMPLATE.replace('PASSWORD', password);
  }

  Unlocker.prototype.unlock = function (cb) {
    applescript.execString(this.script, function (err, rtn) {
      if (err) return console.error('Error running AppleScript:', err);
      if (cb) cb();
    });
  }

  return Unlocker;

})();
