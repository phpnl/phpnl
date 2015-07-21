// Require's
var gulp      = require('gulp-help')(require('gulp'));
var less      = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');

// Gulp tasks
gulp.task('default', 'The default task for gulp', function() {
    gulp.start('compile-less');
});

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

gulp.task('move-fonts', 'Move the fonts to the assets directory', function() {
    gulp.src('build/fonts/*')
        .pipe(gulp.dest('web/fonts'));
});

gulp.task('move-images', 'Move the images to the assets directory', function() {
    gulp.src('build/img/*')
        .pipe(gulp.dest('web/img'));
});
