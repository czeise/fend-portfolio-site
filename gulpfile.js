var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

var paths = {
  css_src: ['src/css/styles.css'],
  css_dist: 'docs/css',
  images_src: ['src/images/*.{png,jpg}'],
  images_dist: 'docs/images',
  content: ['src/index.html'],
  dist: 'docs'
};

gulp.task('clean-css', function() {
  gulp.src(paths.css_src)
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(paths.css_dist));
});

gulp.task('minify-html', function() {
  gulp.src(paths.content)
    .pipe(plugins.minifyHtml({
      empty: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('prep-images', function() {
  gulp.src(paths.images_src)
    .pipe(plugins.responsive({
      '*.png': {
        width: 330,
        rename: {
          suffix: '-xs',
          extname: '.jpg'
        }
      },
      'working.png': [{
        width: 720,
        height: 288,
        rename: {
          suffix: '-sm',
          extname: '.jpg'
        }
      }, {
        width: 940,
        height: 376,
        rename: {
          suffix: '-md',
          extname: '.jpg'
        }
      }, {
        width: 1140,
        height: 456,
        rename: {
          extname: '.jpg'
        }
      }],
      'survivr.png': {
        rename: {
          extname: '.jpg'
        }
      },
      'udacitask-part2.png': {
        rename: {
          extname: '.jpg'
        }
      },
      'animal-trading-cards.png': [{
        width: 360,
        height: 285.47,
        crop: 'north',
        rename: {
          suffix: '-short',
          extname: '.jpg'
        }
      }, { // For the modal version of the taller image (except "-xs")
        rename: {
          extname: '.jpg'
        }
      }]
    }))
    .pipe(gulp.dest(paths.images_dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.css_src, ['clean-css']);
  gulp.watch(paths.content, ['minify-html']);
  gulp.watch(paths.images_src, ['prep-images']);
});

gulp.task('default', ['clean-css', 'minify-html', 'prep-images', 'watch']);
