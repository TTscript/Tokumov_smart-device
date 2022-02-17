const { src, dest, watch, series, parallel} = require('gulp');
// const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const sync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const minifyjs = require('gulp-minify');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');


function html() {
  return src('source/**.html')
    // .pipe(htmlmin({
    //     collapseWhitespace: true
    // })/
    .pipe(dest('build'));
}

function style() {
  return src('source/sass/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(dest('build/css'))
    .pipe(sync.stream());
}

function clear() {
  return del('build');
}

function server() {
  sync.init({
    server: 'build',
    cors: true,
    notify: false,
    ui: false,
  });

  watch('source/**.html', series(html)).on('change', sync.reload);
  watch('source/sass/**/*.scss', series(style)).on('change', sync.reload);
  watch('source/js/**/*.js', series(js)).on('change', sync.reload);
}

const copy = (done) => {
  src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/img/**/*.{png,jpg,svg}',
  ],
  {
    base: 'source'
  })
    .pipe(dest('build'));
  done();
};

const optimizeImages = () =>
  src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(dest('build/img'));

const createWebp = () =>
  src('source/img/**/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(dest('build/img'));


function copyFonts() {
  return src('source/fonts/*.{woff2,woff}')
    .pipe(dest('build/fonts'));
}

function js() {
  return src('source/js/**/*.js')
    .pipe(dest('build/js'));
}

function devcss() {
  return src('source/sass/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(dest('source/css/'));
}

function svgsprite() {
  return src('source/img/*.svg')
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename('svgsprite.svg'))
    .pipe(dest('build/img'));
}

exports.sprite = svgsprite;
exports.devcss = devcss;
exports.clear = clear;
exports.build = series(clear, copy, optimizeImages, svgsprite, html, style, js, createWebp);
exports.default = series(clear, copy, html, style, js, createWebp, svgsprite, server);
