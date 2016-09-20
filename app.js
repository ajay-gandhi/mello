
var dash_button = require('node-dash-button'),
    Unlocker    = require('./unlock');

var DASH_ADDRESS = 'your dash button MAC address here';
var PASSWORD     = 'your pw here';

var dash = dash_button(DASH_ADDRESS);
var u = new Unlocker(PASSWORD);

dash.on('detected', function () {
  u.unlock();
});

// Don't quit this process
process.stdin.resume();
