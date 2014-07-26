(function() {
  window.remote = require('remote');

  window.win = remote.getCurrentWindow();

  window.fs = require('fs');

  window.addEventListener('keyup', function(e) {
    if (e.which === "R".charCodeAt(0) && (e.ctrlKey || e.metaKey)) {
      return location.reload();
    } else if (e.keyCode === 123) {
      return win.toggleDevTools();
    }
  });

  window.addEventListener('polymer-ready', function() {
    var drawer, drawerButton;
    drawerButton = document.getElementById('menu-toggle');
    drawer = document.getElementById('outer-drawer');
    return drawerButton.addEventListener('click', function() {
      return drawer.togglePanel();
    });
  });

  window.ondragover = function(e) {
    e.preventDefault();
    return false;
  };

  window.addEventListener('drop', function(e) {
    var asset, cover, droppedFiles, header, i, tracklist, _i, _len;
    e.preventDefault();
    cover = $('#main-content .cover img');
    tracklist = $('#main-content .tracklist');
    header = $('#main-header-content');
    tracklist.html('');
    droppedFiles = e.dataTransfer.files;
    for (_i = 0, _len = droppedFiles.length; _i < _len; _i++) {
      i = droppedFiles[_i];
      asset = AV.Asset.fromFile(i);
      asset.on('error', function(err) {
        alert("Summin fukd up bro, check the console.");
        return console.log(err);
      });
      asset.get('metadata', function(data) {
        var tracklistEntry;
        tracklistEntry = $('<div class="track"><div><span class="tracknumber">' + data.tracknumber + '</span>' + data.title + '</div></div>');
        return tracklist.append(tracklistEntry);
      });
    }
    return false;
  });

  document.querySelector('#close-win').addEventListener('click', function(e) {
    return win.close();
  });

  document.querySelector('#maximize-win').addEventListener('click', function(e) {
    if (win.isMaximized()) {
      return win.unmaximize();
    } else {
      return win.maximize();
    }
  });

  document.querySelector('#minimize-win').addEventListener('click', function(e) {
    return win.minimize();
  });

}).call(this);
