module.exports = function(grunt) {
  grunt.initConfig({
    // Configuration for the "grunt-contrib-clean" plugin
    clean: {
      build: ['dist/*'],
    },
    // Configuration for the "grunt-contrib-copy" plugin
    copy: {
      main: {
        files: [
          { expand: true, src: ['src/**'], dest: 'dist/' },
        ],
      },
    },
    // Configuration for the "grunt-ts" plugin
    ts: {
      default: {
        tsconfig: './tsconfig.json',
      },
    },
    // Configuration for the "grunt-contrib-watch" plugin
    watch: {
      ts: {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        tasks: ['ts', 'copy'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'ts', 'copy']);
  grunt.registerTask('dev', ['default', 'watch']);
};
