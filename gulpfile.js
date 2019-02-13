/**
 * Gulp file to automate the various tasks
 * */

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const csscomb = require('gulp-csscomb');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const wait = require('gulp-wait');
const pm2 = require('pm2');

// Define paths

const paths = {
  dist: {
    base: 'dist',
    img: 'dist/public/img',
    libs: 'dist/public/vendor',
  },
  base: {
    base: './public',
    node: 'node_modules',
  },
  src: {
    base: './public',
    css: 'public/css',
    html: '**/*.html',
    img: 'public/img/**/*.+(png|jpg|gif|svg)',
    js: 'public/js/**/*.js',
    scss: 'public/scss/**/*.scss',
  },
};

// Compile SCSS

gulp.task('scss', () => {
  return gulp
    .src(paths.src.scss)
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-flexbugs-fixes')])) // eslint-disable-line
    .pipe(
      autoprefixer({
        browsers: ['> 1%'],
      })
    )
    .pipe(csscomb())
    .pipe(gulp.dest(paths.src.css))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// Minify CSS

gulp.task('minify:css', () => {
  return gulp
    .src([`${paths.src.css}/argon.css`])
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.dist.base}/css`));
});

// Minify JS

gulp.task('minify:js', () => {
  return gulp
    .src([`${paths.src.base}/assets/js/argon.js`])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.dist.base}/js`));
});

// Live reload

gulp.task('browserSync', () => {
  browserSync.init({
    proxy: 'http://0.0.0.0:8000',
  });
});

// Watch for changes

gulp.task('watch', ['browserSync', 'scss'], () => {
  gulp.watch(paths.src.scss, ['scss']);
  gulp.watch(paths.src.js, pm2.restart);
  gulp.watch(paths.src.html, pm2.restart);
});

// Clean

gulp.task('clean:dist', () => {
  return del.sync(paths.dist.base);
});

// Copy CSS

gulp.task('copy:css', () => {
  return gulp
    .src([`${paths.src.base}/assets/css/argon.css`])
    .pipe(gulp.dest(`${paths.dist.base}/css`));
});

// Copy JS

gulp.task('copy:js', () => {
  return gulp
    .src([`${paths.src.base}/assets/js/argon.js`])
    .pipe(gulp.dest(`${paths.dist.base}/js`));
});

// Build

gulp.task('build', callback => {
  runSequence('clean:dist', 'scss', 'copy:css', 'copy:js', 'minify:js', 'minify:css', callback);
});

// Default

gulp.task('default', callback => {
  runSequence(['scss', 'browserSync', 'watch'], callback);
});
