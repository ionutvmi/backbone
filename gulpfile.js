var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');
var amdOptimize = require("amd-optimize");
var addSrc = require("gulp-add-src");
var processhtml = require('gulp-processhtml');


/**
 * Start a static server with livereload enabled
 */
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

/**
 * Compile the sass files
 */
gulp.task('sass', function () {
    return sass('assets/scss/styles.scss', { style: 'expanded', sourcemap: true })
        .on('error', function (err) {
            console.error('\x07(!) Error!', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
        .pipe(connect.reload());
});

/**
 * Build the templates.js file based on the html files from the /templates folder
 */
gulp.task('templates', function() {
    return gulp.src('templates/*.html')
        .pipe(template({
            namespace: '_templates_app_',
            templateSettings: {
                // evaluate:    /\{\{#([\s\S]+?)\}\}/g,            // {{# console.log("blah") }}
                // interpolate: /\{\{\{(\s*\w+?\s*)\}\}\}/g,       // {{ title }}
                // escape:      /\{\{(\s*\w+?\s*)\}\}(?!\})/g,     // {{{ title }}}
            }
        }).on('error', function (err) {
            console.log("\x07(!) There is a syntax error in the file: " + err.fileName);
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('assets/js/app'));
});

/**
 * Watch for any file changes and use livereload
 */
gulp.task('watch', function() {

    // development files
    gulp.watch('assets/scss/**/*.scss', ['sass']);

    gulp.watch('assets/js/**/*.js', function () {
        gulp.src('assets/js/**/*.js').pipe(connect.reload());
    });

    gulp.watch('*.html', function () {
        gulp.src('*.html').pipe(connect.reload());
    });

    gulp.watch('templates/**/*.html', ['templates']);

    // test files
    gulp.watch(['test/**/*.{html,js}'], function () {
        gulp.src('test/**/*.{html,js}').pipe(connect.reload());
    });

});

/**
 * Process the html files to remove the requirejs script.
 */
gulp.task('build-html', function() {
    return gulp.src('*.html')
        .pipe(processhtml())
        .pipe(gulp.dest('dist'));
});

/**
 * Copy all the static assets to the dist folder
 */
gulp.task('build-assets', ['sass'], function() {
    return gulp.src(['assets/**/*.*', '!assets/**/*.{js,scss,sass}'])
        .pipe(gulp.dest('dist/assets'));
});

/**
 * Merge all the js files using amd-optimize
 */
gulp.task('build-js', ['templates'], function() {
    return gulp.src("assets/js/**/*.js")
        // Traces all modules and outputs them in the correct order.
        .pipe(amdOptimize("main", {
            configFile: 'assets/js/main.js'
        }))
        .pipe(addSrc.prepend('assets/js/libs/almond.js'))
        .pipe(concat("main.all.js"))
        .pipe(gulp.dest("dist/assets/js"));
});

gulp.task('build', ['build-js', 'build-assets', 'build-html']);
gulp.task('develop', ['sass', 'templates', 'watch', 'connect']);

gulp.task('default', ['develop']);
