var App = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

var win = null;

// Quit when all windows are closed.
App.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    App.quit();
});

// This method will be called when the app is ready.
App.on('ready', function() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,

    frame: false
  });

  // and load the index.html of the App.
  win.loadUrl('file://' + __dirname + '/html/mockup.html');

  // Emitted when the window is closed.
  win.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your App supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
});