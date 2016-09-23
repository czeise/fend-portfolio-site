var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename')
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat');

var paths = {
  css: ['src/css/main.css'],
  images: ['src/images/*']
};

gulp.task('css', function(){
  gulp.src(paths.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['css']);
