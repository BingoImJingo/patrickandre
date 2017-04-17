var gulp = require('gulp');
	
/*------------- Styles ----------------*/
var postcss = require('gulp-postcss'),	
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
});

/*------------- Watch ----------------*/
var browserSync = require('browser-sync').create(),
watch = require('gulp-watch');

gulp.task('watch', function() {
	
  browserSync.init({
	  notify:false,
	  server: {
		  baseDir: "app"
	  }
  });	

  watch('./app/*.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

});

gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});







