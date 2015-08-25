var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');


// not used at the moment
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('sass', function () {
    return sass('assets/scss/styles.scss', { style: 'expanded', sourcemap: true })
        .on('error', function (err) {
            console.error('\x07(!) Error!', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {

    // development files
    gulp.watch('assets/scss/**/*.scss', ['sass']);

    gulp.watch('*.html', function () {
        gulp.src('*.html').pipe(connect.reload());
    });

    gulp.watch('templates/**/*.html', ['templates']);

    // test files
    gulp.watch('test/**/*.html', function () {
        gulp.src('test/**/*.html').pipe(connect.reload());
    });

    gulp.watch('test/**/*.js', function () {
        gulp.src('test/**/*.js').pipe(connect.reload());
    });

    console.log("Visit http://localhost:8080/test/SpecRunner.html to run the tests.");
});

gulp.task('templates', function() {
    gulp.src('templates/*.html')
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

gulp.task('develop', ['sass', 'templates', 'watch', 'connect']);
gulp.task('default', ['develop']);
