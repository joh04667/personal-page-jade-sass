module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'server/public/stylesheets/style.css': 'stylesheets/style.scss',
          'server/public/stylesheets/admin.css': 'stylesheets/admin.scss',
          'server/public/stylesheets/blog.css': 'stylesheets/blog.scss',
          'server/public/stylesheets/index.css': 'stylesheets/index.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: ['client/*', 'stylesheets/*'],
        tasks: ['uglify', 'copy', 'sass'],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
        expand: true,
        src: '*.js',
        dest: 'server/public/assets/scripts',
        cwd: './client'
       }]
      }
    },
    copy: {
      main : {
        files: [
          {expand: true,
          cwd: 'node_modules/',
          src: [
            'angular/angular.min.js',
            'angular/angular.min.js.map',
            'angular/angular-csp.css'
          ],
          dest: 'server/public/vendor/'},

          // bootstrap css
          {expand: true, cwd: 'node_modules/bootstrap/dist/css/', src: ['bootstrap.min.css'], dest: 'server/public/stylesheets/'},

          // bootstrap js
          {expand: true, cwd: 'node_modules/bootstrap/dist/js/', src: ['bootstrap.min.js'], dest: 'server/public/vendor/bootstrap/'},

          // bootstrap fonts
          {expand: true, cwd: 'node_modules/bootstrap/dist/fonts/', src: ['**'], dest: 'server/public/fonts/'}

              ],
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s)
  grunt.registerTask('default', ['copy', 'uglify']);
};
