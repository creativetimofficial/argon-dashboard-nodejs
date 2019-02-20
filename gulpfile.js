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
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const wait = require('gulp-wait');

// Define paths

const paths = {
  public: {
    base: 'public',
    img: './public/img',
    libs: './public/vendor',
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
    ejs: 'views/**/*.ejs',
    scss: 'public/scss/**/*.scss',
  },
};

// Compile SCSS
function scss() {
  console.log('SCSS handler called here!!!');
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
    .pipe(browserSync.stream({ match: '**/*.css' }));
}

// Minify CSS
function minifyCSS() {
  return gulp
    .src([`${paths.src.css}/argon.css`])
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.dist.base}/css`));
}

// Minify JS
function minifyJS() {
  return gulp
    .src([`${paths.src.base}/assets/js/argon.js`])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.dist.base}/js`));
}

// Live reload
function serve(done) {
  browserSync.init({
    files: ['public/**/*', 'views/**/*'],
    proxy: 'http://0.0.0.0:8000',
  });

  done();
}

// Watch for changes
function watch() {
  gulp.watch(paths.src.scss, scss);
  gulp.watch(paths.src.js, browserSync.reload);
  gulp.watch(paths.src.html, browserSync.reload);
  gulp.watch(paths.src.ejs, browserSync.reload);
}

// Clean
function cleanDist() {
  return del.sync(paths.dist.base);
}

// Copy CSS
function copyCSS() {
  return gulp
    .src([`${paths.src.base}/assets/css/argon.css`])
    .pipe(gulp.dest(`${paths.dist.base}/css`));
}

// Copy JS
function copyJS() {
  return gulp
    .src([`${paths.src.base}/assets/js/argon.js`])
    .pipe(gulp.dest(`${paths.dist.base}/js`));
}

// Build
const build = gulp.series(cleanDist, scss, copyCSS, copyJS, minifyJS, minifyCSS);

// Default
const defaultTask = gulp.series(scss, serve, watch);

module.exports = {
  scss,
  minifyCSS,
  minifyJS,
  serve,
  watch,
  cleanDist,
  copyCSS,
  copyJS,
  build,
  default: defaultTask,
};
