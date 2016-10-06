var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

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
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(paths.css_dist));
});

gulp.task('minify-html', function(){
  gulp.src(paths.content)
    .pipe(plugins.minifyHtml({
      empty: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('prep-images', function(){
  gulp.src(paths.images_src)
    .pipe(gulp.dest(paths.images_dist));
});

gulp.task('watch', function(){
  gulp.watch(paths.css_src, ['clean-css']);
  gulp.watch(paths.content, ['minify-html']);
  gulp.watch(paths.images_src, ['prep-images']);
});

gulp.task('default', ['clean-css', 'minify-html', 'prep-images', 'watch']);
