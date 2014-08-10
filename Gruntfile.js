module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			app: {
				options: {
					sourceMap: true,
				},
				src: [
					'client/app/pheo-app.js',
					'client/app/**/*.js',
					'!client/app/**/*.test.js',
				],
				dest: 'client/app.js',
			},
		},

		sass: {
			main: {
				files: {
					'client/css/main.css': 'client/css/main.scss',
					'client/fonts/fonts.css': 'client/fonts/fonts.scss'
				}
			}
		},

		watch: {
			sass: {
				files: ['client/css/**/*.scss'],
				tasks: ['sass'],
				options: { spawn: false }
			},

			app: {
				files: ['client/app/**/*.js'],
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