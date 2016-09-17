/*jshint multistr: true, node: true*/
var applescript = require( 'applescript' );

var TEMPLATE =
  'tell application "System Events"\n\
    if name of every process contains "ScreenSaverEngine" then \n\
      tell application "ScreenSaverEngine"\n\
        quit\n\
      end tell\n\
      delay 0.2\n\
    else \n\
    tell application "Terminal"\n\
      do shell script "caffeinate -u -t 1"\n\
      end tell\n\
      delay 0.5\n\
    end if\n\
    tell application "System Events" to tell process "loginwindow"\n\
      activate\n\
      delay 0.2\n\
        tell window "Login Panel"\n\
          keystroke "PASSWORD"\n\
          keystroke return\n\
        end tell\n\
    end tell\n\
  end tell';

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
