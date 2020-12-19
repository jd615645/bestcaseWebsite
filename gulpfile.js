const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')

const paths = {
  src: {
    scss: './src/style/scss/*.scss',
    css: './src/style/css/*.css',
    js: './src/js/*.js',
    lib: './src/js/lib/*.js',
    pug: './src/pug/*.pug',
    images: './src/img/*',
    assets: './src/assets/**/*'
  },
  dist: {
    html: './dist',
    style: './dist/style',
    js: './dist/js',
    lib: './dist/js/lib',
    images: './dist/img',
    assets: './dist/assets'
  }
}

gulp.task('pug', () => {
  return gulp.src(paths.src.pug)
    .pipe($.pug())
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass', () => {
  return gulp.src(paths.src.scss)
    .pipe($.sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(paths.dist.style))
})
gulp.task('css', () => {
  return gulp.src(paths.src.css)
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest(paths.dist.style))
})

gulp.task('scripts', () => {
  return gulp.src(paths.src.js)
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.js))
})
gulp.task('lib', () => {
  return gulp.src(paths.src.lib)
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.lib))
})

gulp.task('images', () => {
  return gulp.src(paths.src.images)
    // .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.images))
})
gulp.task('assets', () => {
  return gulp.src(paths.src.assets)
    .pipe(gulp.dest(paths.dist.assets))
})
gulp.task('assetsmin', () => {
  gulp.src('./src/assets/css/**')
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest('./dist/assets/css'))
  gulp.src('./src/assets/js/**')
    .pipe(gulp.dest('./dist/assets/js'))
  gulp.src('./src/assets/img/**')
    // .pipe($.imagemin())
    .pipe(gulp.dest('./dist/assets/img'))
  gulp.src('./src/assets/plugins/**')
    .pipe(gulp.dest('./dist/assets/plugins'))
})

gulp.task('webserver', () => {
  return gulp
    .src(paths.dist.html)
    .pipe($.webserver({
      port: 8081,
      livereload: true,
      directoryListing: false
    }))
})

// Cleaning
gulp.task('clean', () => {
  return del(['dist/**/*'])
})

gulp.task('watch', () => {
  gulp.watch(paths.src.pug, gulp.series('pug'))
  gulp.watch(paths.src.scss, gulp.series('sass'))
  gulp.watch(paths.src.js, gulp.series('scripts'))
})

gulp.task('default', gulp.series('webserver', 'watch'))
gulp.task('build', gulp.series('pug', 'css', 'sass', 'scripts', 'lib'))
