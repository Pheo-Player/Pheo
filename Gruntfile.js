module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		coffee: {
			all: {
				files: {
					'js/main.js': 'coffee/main.coffee',
					'js/app.js': 'coffee/app/**/*.coffee'
				}
			},
		},

		concat: {
			aurora: {
				src: [
					'js/vendor/aurora/aurora.js',
					'js/vendor/aurora/flac.js',
					'js/vendor/aurora/mp3.js',
					'js/vendor/aurora/ogg.js',
					'js/vendor/aurora/aac.js',
					'js/vendor/aurora/vorbis.js',
					'js/vendor/aurora/alac.js'
				],
				dest: 'js/vendor/aurora.js'
			}
		},

		sass: {
			main: {
				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		},

		watch: {
			coffee: {
				files: ['coffee/**/*.coffee'],
				tasks: ['coffee'],
				options: { spawn: false }
			},

			sass: {
				files: ['css/main.scss'],
				tasks: ['sass'],
				options: { spawn: false }
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['coffee', 'sass', 'watch']);
	grunt.registerTask('aurora', ['concat:aurora']);
}