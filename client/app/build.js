angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);
angular.module('pheoApp', [function() {
}]);


angular.module('pheoApp')
	.service('player', [function () {
		var Player = AV.Player;
		var Asset = AV.Asset;
		var Buffer = AV.Buffer;

		var player, asset, buffer;
	}]);



angular.module('pheoApp')
	.service('player', [function () {
		var player, asset, buffer;

		
	}]);



angular.module('pheoApp')
	.service('player', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp').
	controller('playerController', [function() {
		
	}]);

angular.module('pheoApp')
	.service('player', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', [function() {
		
	}]);

angular.module('pheoApp')
	.service('player', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', [function() {
		
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function(arguments) {
			playerService.loadFile(filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function(arguments) {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;
				
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = 'a';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;
				
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;
				
				console.log(data);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				buffer = new AV.Buffer(data);
				console.log(buffer);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				buffer = new AV.Buffer(data);
				console.log(buffer);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				player.stop();
				delete player;
				
				buffer = new AV.Buffer(data);
				asset = new AV.Asset(buffer);
				player = new AV.Player(asset);
			});
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				player.stop();
				delete player;

				buffer = new AV.Buffer(data);
				asset = new AV.Asset(buffer);
				player = new AV.Player(asset);
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = new AV.Asset(buffer);
				player = new AV.Player(asset);
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = new AV.Asset(buffer);
				player = new AV.Player(asset);

				asset.get('format', function(format) {
					console.log(format);
				});
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.get('format', function(format) {
					console.log(format);
				});
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.get('format', function(format) {
					console.log(format);
				});
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.get('format', function(format) {
					console.log(format);
				});
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.on('metadata', function(data) {
					console.log(data);
				});
				asset.start();
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				var ab = new ArrayBuffer(data.length);
				var view = new Uint8Array(ab);
				for (var i = 0; i < data.length; ++i) {
					view[i] = data[i];
				}

				buffer = new AV.Buffer(ab);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.on('metadata', function(data) {
					console.log(data);
				});
				asset.start();
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.on('metadata', function(data) {
					console.log(data);
				});
				asset.start();
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.on('metadata', function(data) {
					console.log(data);
				});
				asset.start();
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			fs.readFile(path, function(err, data) {
				if(err) throw err;

				if(player) {
					player.stop();
					delete player;
				}

				buffer = new AV.Buffer(data);
				asset = AV.Asset.fromBuffer(buffer);
				player = new AV.Player(asset);

				asset.on('metadata', function(data) {
					console.log(data);
				});
				asset.start();
			});
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			player = AV.Player.fromURL('file://' + path);
			console.log(player);
			// fs.readFile(path, function(err, data) {
			// 	if(err) throw err;

			// 	if(player) {
			// 		player.stop();
			// 		delete player;
			// 	}

			// 	buffer = new AV.Buffer(data);
			// 	asset = AV.Asset.fromBuffer(buffer);
			// 	player = new AV.Player(asset);

			// 	asset.on('metadata', function(data) {
			// 		console.log(data);
			// 	});
			// 	asset.start();
			// });
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			player = AV.Player.fromURL('file://' + path);
			console.log(player);
			// fs.readFile(path, function(err, data) {
			// 	if(err) throw err;

			// 	if(player) {
			// 		player.stop();
			// 		delete player;
			// 	}

			// 	buffer = new AV.Buffer(data);
			// 	asset = AV.Asset.fromBuffer(buffer);
			// 	player = new AV.Player(asset);

			// 	asset.on('metadata', function(data) {
			// 		console.log(data);
			// 	});
			// 	asset.start();
			// });
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
			else {
				throw 'No player defined so far.';
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			player = AV.Player.fromURL('file://' + path);
			console.log(player);
			// fs.readFile(path, function(err, data) {
			// 	if(err) throw err;

			// 	if(player) {
			// 		player.stop();
			// 		delete player;
			// 	}

			// 	buffer = new AV.Buffer(data);
			// 	asset = AV.Asset.fromBuffer(buffer);
			// 	player = new AV.Player(asset);

			// 	asset.on('metadata', function(data) {
			// 		console.log(data);
			// 	});
			// 	asset.start();
			// });
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
			else {
				throw 'No player defined';
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			asset = AV.Asset.fromURL('file://' + path);
			player = new AV.Player(asset);

				asset.on('metadata', function(data) {
					console.log(data);
				});
				asset.start();
			// fs.readFile(path, function(err, data) {
			// 	if(err) throw err;

			// 	if(player) {
			// 		player.stop();
			// 		delete player;
			// 	}

			// 	buffer = new AV.Buffer(data);
			// 	asset = AV.Asset.fromBuffer(buffer);
			// 	player = new AV.Player(asset);

			// 	asset.on('metadata', function(data) {
			// 		console.log(data);
			// 	});
			// 	asset.start();
			// });
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
			else {
				throw 'No player defined';
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			asset = AV.Asset.fromURL('file://' + path);
			player = new AV.Player(asset);

			asset.on('metadata', function(data) {
				console.log(data);
			});
			asset.start();
			// fs.readFile(path, function(err, data) {
			// 	if(err) throw err;

			// 	if(player) {
			// 		player.stop();
			// 		delete player;
			// 	}

			// 	buffer = new AV.Buffer(data);
			// 	asset = AV.Asset.fromBuffer(buffer);
			// 	player = new AV.Player(asset);

			// 	asset.on('metadata', function(data) {
			// 		console.log(data);
			// 	});
			// 	asset.start();
			// });
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
			else {
				throw 'No player defined';
			}
		};
	}]);

angular.module('pheoApp')
	.controller('playerController', ['playerService', function(playerService) {
		this.filePath = '/home/chipf0rk/Music/Wildest Dreams/Wildest Dreams/1. Wildest Dreams - Rollerskates.mp3';

		this.loadFile = function() {
			playerService.loadFile(this.filePath);
		}
	}]);

angular.module('pheoApp')
	.service('playerService', [function () {
		var player, asset, buffer;

		this.loadFile = function(path) {
			asset = AV.Asset.fromFile(File(path));
			player = new AV.Player(asset);

			asset.on('metadata', function(data) {
				console.log(data);
			});
			asset.start();
			// fs.readFile(path, function(err, data) {
			// 	if(err) throw err;

			// 	if(player) {
			// 		player.stop();
			// 		delete player;
			// 	}

			// 	buffer = new AV.Buffer(data);
			// 	asset = AV.Asset.fromBuffer(buffer);
			// 	player = new AV.Player(asset);

			// 	asset.on('metadata', function(data) {
			// 		console.log(data);
			// 	});
			// 	asset.start();
			// });
		};

		var playing = false;
		this.playPause = function() {
			if(player) {
				if(playing)
					player.pause();
				else
					player.play();

				playing = !playing;
			}
			else {
				throw 'No player defined';
			}
		};
	}]);
