// Require's
var gulp       = require('gulp-help')(require('gulp'));
var less       = require('gulp-less');
var minifyCss  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var args       = require('yargs').argv;
var sourcemaps = require('gulp-sourcemaps');
var gulpif     = require('gulp-if');

/**
 * Check if the sourcemap flag is enabled or not.
 * Used in: compile-less, compile-js.
 * @type {boolean}
 */
var isSourcemaps  = args.sourcemaps === 'true';

/**
 * I don't really have a default task.
 * So i will redirect to the task 'gulp help'
 */
gulp.task('default', 'The default task for gulp', function() {
    gulp.run('help');
});

/**
 * Merge all the js files into files,
 * and place them into web/js
 *
 * Flags:
 * --sourcemaps=true | Enable sourcemaps for your js.
 */
gulp.task('compile-js', 'merge all the js files into files.', function() {
    // Merge everything for /build/js/bootstrap/*js
    gulp.src('build/js/bootstrap/*.js')
        .pipe(concat('bootstrap.js'))
        .pipe(gulp.dest('web/css'))
        .pipe(uglify())
        .pipe(gulpif(isSourcemaps, sourcemaps.init()))
        .pipe(gulpif(isSourcemaps, sourcemaps.write('./maps')))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('web/css'));

    // Do the same for /build/js/costum/*js
    gulp.src('build/js/costum/*.js')
        .pipe(concat('clean-blog.js'))
        .pipe(gulp.dest('web/css'))
        .pipe(uglify())
        .pipe(gulpif(isSourcemaps, sourcemaps.init()))
        .pipe(gulpif(isSourcemaps, sourcemaps.write('./maps')))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('web/css'));
}, {
    options: {
        'sourcemaps=true' : 'Compile-js -> Enable sourcemaps',
    }
});

/**
 * Compile all the less resources and place them into /web/css.
 * 
 * Flags:
 * --sourcemaps=true | Enable sourcemaps for your js.
 */
gulp.task('compile-less', 'Convert your less files to plain css.', function() {
    var files = [
        'build/less/costum/clean-blog.less',
        'build/less/bootstrap/bootstrap.less'
        ];

    gulp.src(files)
        .pipe(less())
        .pipe(gulp.dest('web/css'))
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('web/css'));
});

/**
 * Move all the font files to /web/fonts
 */
gulp.task('move-fonts', 'Move the fonts to the assets directory', function() {
    gulp.src('build/fonts/*')
        .pipe(gulp.dest('web/fonts'));
});

/**
 * Move the images form /build/img/* to /web/img
 */
gulp.task('move-images', 'Move the images to the assets directory', function() {
    gulp.src('build/img/*')
        .pipe(gulp.dest('web/img'));
});

/**
 *  Watch in the build directory for any changes.
 */
gulp.task('watch-less', 'Watch for changes.', function() {
    // Watch .less files.
    gulp.watch('build/less/**/*.less', ['compile-less']);
});