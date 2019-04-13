const gulp = require('gulp');
// const sourcemaps = require('gulp-sourcemaps');
// const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); // 编译、混淆、压缩es5版本
const uglify = require('uglify-es').default; // 编译、混淆、压缩es6版本
// var ts = require('gulp-typescript');
const src = 'src/**/*.js';

/* gulp.task('build', function () {
  return gulp.src(src)
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'output.js'
    }))
    .pipe(gulp.dest('dist'));
});
 */
gulp.task('build', function () {
  gulp.src([src])
    // .pipe(sourcemaps.init()) // 调试需要
    .pipe(babel())
    // .pipe(sourcemaps.write('../map', {includeContent: false, sourceRoot: '../src'})) // 调试需要
    .pipe(gulp.dest('lib'))
    .pipe(uglify())  // 调试期间不混淆，方便调试
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function () {
  gulp.watch(src, ['build']);
});

gulp.watch(src, function (event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default', ['watch']);