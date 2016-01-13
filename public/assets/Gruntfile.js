module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {

      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.min.css': 'src/scss/app.scss'
        }
      },
      dev: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          'css/app.css': 'src/scss/app.scss'
        }
      }
    },

    concat: {
      options: {
        separator: ';',
        banner: '\n',
      },
      vendor: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
          'bower_components/components-font-awesome/',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/modernizr/src/Modernizr.js',
          'src/js/custom.js',
          '../modules/app.js',
        ],
        dest: 'js/vendor.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'js/vendor.min.js':['js/vendor.js']
        }
      }
    },

    // removelogging: {
    //   js: {
    //     src: "js/app.min.js",
    //     dest: "js/app.min.js"
    //   }
    // },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['development-task']
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['development-task']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['development-task']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('development-task', ['sass:dev','concat:vendor']);
  grunt.registerTask('production-task', ['sass:dist','uglify']);

  grunt.registerTask('build', ['production-task']);
  grunt.registerTask('default', ['development-task','watch']);
};
