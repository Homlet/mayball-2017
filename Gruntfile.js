module.exports = grunt => {
    var sources = {
        scripts: ["src/js/main.js"],
        raw: ["src/raw/**/*"],
        sass: ["src/scss/**/*.scss"]
    };

    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON("package.json"),

        // Tasks.
        concat: {
            // Concatenate all (TODO: uglified) js files into one.
            dist: {
                src: sources.scripts,
                dest: "dist/js/main.js"
            }
        },
        copy: {
            // Copy all raw files into the dist directory.
            dist: {
                files: [{
                    expand: true,
                    cwd: "src/raw",
                    src: ["**/*"],
                    dot: true,
                    dest: "dist"
                }]
            }
        },
        sass: {
            // Compile all scss in src/scss into dist/css.
            dist: {
                options: {
                    style: "compressed"
                },
                files: [{
                    expand: true,
                    cwd: "src/scss",
                    src: ["**/*.scss"],
                    dest: "dist/css",
                    ext: ".css"
                }]
            }
        },
        watch: {
            // Automatically run dist tasks when files are changed.
            concat: {
                files: sources.scripts,
                tasks: ["concat:dist"]
            },
            copy: {
                files: sources.raw,
                tasks: ["clean", "dist"]
            },
            sass: {
                files: sources.sass,
                tasks: ["sass:dist"]
            }
        },
        focus: {
            dist: {}
        },
        shell: {
            // Clean up the dist directory and remove .DS_Stores from the repo.
            clean: {
                command: "./clean.sh"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-focus');
    grunt.loadNpmTasks("grunt-shell");

    grunt.registerTask("default", ["focus:dist"]);
    grunt.registerTask("clean", ["shell:clean"]);
    grunt.registerTask("dist", ["concat:dist",
                                "copy:dist",
                                "sass:dist"]);
};
