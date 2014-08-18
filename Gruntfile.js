module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			app: {
				options: {

				},
				src: [
					'<%= pkg.devConfig.clientDir %>app/pheo-app.js',
					'<%= pkg.devConfig.clientDir %>app/**/*.js',
					'!<%= pkg.devConfig.clientDir %>app/**/*.test.js',
				],
				dest: '<%= pkg.devConfig.clientDir %>app.js',
			},
		},

		sass: {
			main: {
				files: {
					'<%= pkg.devConfig.clientDir %>css/main.css': '<%= pkg.devConfig.clientDir %>css/main.scss',
					'<%= pkg.devConfig.clientDir %>fonts/fonts.css': '<%= pkg.devConfig.clientDir %>fonts/fonts.scss'
				}
			}
		},

		watch: {
			sass: {
				files: ['<%= pkg.devConfig.clientDir %>css/**/*.scss'],
				tasks: ['sass'],
				options: { spawn: false }
			},

			app: {
				files: ['<%= pkg.devConfig.clientDir %>app/**/*.js'],
				tasks: ['concat'],
				options: { spawn: false }
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'sass', 'watch']);
}