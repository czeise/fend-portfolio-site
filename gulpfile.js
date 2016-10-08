var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

var paths = {
  css_src: ['src/css/styles.css'],
  css_dist: 'dist/css',
  images_src: ['src/images/*.{png,jpg}'],
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
    .pipe(plugins.responsive({
      '*.png': {
        format: 'jpeg',
        width: 330,
        rename: {
          suffix: '-xs',
          extname: '.jpg'
        }
      },
      'working.png': [
        {
          format: 'jpeg',
          width: 720,
          height: 288,
          rename: {
            suffix: '-sm',
            extname: '.jpg'
          }
        }, {
          format: 'jpeg',
          width: 940,
          height: 376,
          rename: {
            suffix: '-md',
            extname: '.jpg'
          }
        }, {
          format: 'jpeg',
          width: 1140,
          height: 456,
          rename: {
            suffix: '-lg',
            extname: '.jpg'
          }
        }
      ]
    }))
    .pipe(gulp.dest(paths.images_dist));
});

gulp.task('watch', function(){
  gulp.watch(paths.css_src, ['clean-css']);
  gulp.watch(paths.content, ['minify-html']);
  gulp.watch(paths.images_src, ['prep-images']);
});

gulp.task('default', ['clean-css', 'minify-html', 'prep-images', 'watch']);
