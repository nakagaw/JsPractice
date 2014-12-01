module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: 'js/*js', //監視したいファイルを指定
      options: {
        livereload: true//livereloadを有効
      }
    },
    connect: {
      uses_defaults: {
        options: {
                    port: 9001
                }
      } //空のサブタスクを入れます。名前は何でもいいです。ここではuses_defaultsにしました。
    }
  });

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');

//これを指定しておくとgruntだけで実行できる
grunt.registerTask('default', ['connect', 'watch']);
};