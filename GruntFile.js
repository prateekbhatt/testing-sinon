module.exports = function (grunt) {

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    ui: 'bdd',
                    recursive: true,
                    colors: true,
                    'check-leaks': true,
                    growl: true,
                    'inline-diffs': true,
                    'no-exit': true,
                    'async-only': true
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['mochaTest']);
};