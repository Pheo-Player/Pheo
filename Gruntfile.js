module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			app: {
				src: ['client/app/**/*.js'],
				dest: 'client/app/build.js',
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