module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		coffee: {
			all: {
				files: {
					'js/main.js': 'coffee/**/*.coffee'
				}
			},
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
				files: ['coffee/**/*.js'],
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
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['coffee', 'sass', 'watch']);
}