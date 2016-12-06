const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');

// 清除 dist 目录
function delDist() {
  return del(['./y_dist/nImg']);
}

//图片压缩
function imageminImg() {
  return gulp.src('./y_dist/img/*')
    .pipe(imagemin({
    	use: [pngquant()]
    }))
    .pipe(gulp.dest('./y_dist/nImg'))
}

gulp.task('default', gulp.series(
  delDist,
  gulp.parallel(
    imageminImg
  )
));