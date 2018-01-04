const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')

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
  gulp.src(paths.src.pug)
    .pipe($.pug())
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass', () => {
  gulp.src(paths.src.scss)
    .pipe($.sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(paths.dist.style))
})
gulp.task('css', () => {
  gulp.src(paths.src.css)
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest(paths.dist.style))
})

gulp.task('scripts', () => {
  gulp.src(paths.src.js)
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.js))
})
gulp.task('lib', () => {
  gulp.src(paths.src.lib)
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.lib))
})

gulp.task('images', () => {
  gulp.src(paths.src.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.images))
})
gulp.task('assets', () => {
  gulp.src(paths.src.assets)
    .pipe(gulp.dest(paths.dist.assets))
})

gulp.task('webserver', () => {
  gulp
    .src(paths.dist.html)
    .pipe($.webserver({
      port: 8080,
      livereload: true,
      directoryListing: false
    }))
})

// Cleaning
gulp.task('clean', () => {
  return del(['dist/**/*'])
})

gulp.task('watch', () => {
  gulp.watch(paths.src.pug, ['pug'])
  gulp.watch(paths.src.scss, ['sass'])
  gulp.watch(paths.src.js, ['scripts'])
})

gulp.task('default', ['webserver', 'watch'])
gulp.task('build', ['pug', 'css', 'sass', 'scripts', 'lib'])
