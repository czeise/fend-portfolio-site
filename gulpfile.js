var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename')
  cleancss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  minifyhtml = require('gulp-minify-html');

var paths = {
  css_src: ['src/css/styles.css'],
  css_dist: 'dist/css',
  images_src: ['src/images/*'],
  images_dist: 'dist/images',
  content: ['src/index.html'],
  dist: 'dist'
};

gulp.task('clean-css', function(){
  gulp.src(paths.css_src)
    .pipe(cleancss())
    .pipe(gulp.dest(paths.css_dist));
});

gulp.task('minify-html', function(){
  gulp.src(paths.content)
    .pipe(minifyhtml({
      empty: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('watch', function(){
  gulp.watch(paths.css, ['clean-css']);
  gulp.watch(paths.content, ['minify-html']);
});

gulp.task('default', ['clean-css', 'minify-html', 'watch']);
