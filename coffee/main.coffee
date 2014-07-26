window.remote = require('remote')
window.win = remote.getCurrentWindow()
window.fs = require('fs')

# ===== GLOBAL KEY EVENT LISTENER =====
window.addEventListener 'keyup', (e) ->
	if e.which == "R".charCodeAt(0) && (e.ctrlKey || e.metaKey) # Reload page on Ctrl/Cmd+R
		location.reload()
	else if(e.keyCode == 123) # Open Dev Tools on F12
		win.toggleDevTools()

# ===== POLYMER ELEMENT BEHAVIOUR =====
window.addEventListener 'polymer-ready', ->
	# Toggle the menu with the menu button
	drawerButton = document.getElementById('menu-toggle');
	drawer = document.getElementById('outer-drawer');
	drawerButton.addEventListener 'click', ->
		drawer.togglePanel()

# ===== DRAG & DROP =====
# Prevent default drag&drop behaviour of changing location to dropped file
window.ondragover = (e) ->
	e.preventDefault()
	return false

# Global listener to drag&drop events, we will trigger library imports from here
window.addEventListener 'drop', (e) ->
	e.preventDefault()

	cover = $('#main-content .cover img')
	tracklist = $('#main-content .tracklist')
	header = $('#main-header-content')

	tracklist.html(''); # clear track list

	# Get the list of files that were dropped on the application
	droppedFiles = e.dataTransfer.files

	for i in droppedFiles
		asset = AV.Asset.fromFile i
		
		asset.on 'error', (err) ->
			alert "Summin fukd up bro, check the console."
			console.log(err)

		asset.get 'metadata', (data) ->
			tracklistEntry = $('<div class="track"><div><span class="tracknumber">' + data.tracknumber +
				'</span>' + data.title + '</div></div>')
			tracklist.append tracklistEntry

			# if(i === 0)
			# 	var headerContent = $('<span class="part">' + data.artist + '</span><span class="part">' + data.album + '</span>');
			# 	header.html(headerContent);

			# 	if(data.coverArt)
			# 		cover.attr('src', data.coverArt.toBlobURL()); // set cover to cover art of first file in list

	return false

# ===== TITLEBAR =====
document.querySelector('#close-win').addEventListener 'click', (e) ->
	win.close()
document.querySelector('#maximize-win').addEventListener 'click', (e) ->
	if win.isMaximized() then win.unmaximize() else win.maximize()
document.querySelector('#minimize-win').addEventListener 'click', (e) ->
	win.minimize()