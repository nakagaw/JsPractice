module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['stylesheets/*.css']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};