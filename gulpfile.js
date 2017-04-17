var gulp = require('gulp');
	
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

/*--------------- SASS ---------------*/
gulp.task('sass', function () {  
    gulp.src('./app/assets/styles/styles.scss')
		.pipe(sass().on('error', sass.logError)) /*sass error handler*/
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./app/temp/css'));
});

/*--------------- Browser Sync ---------------*/
gulp.task('browser-sync', function() {  
    browserSync.init(["app/temp/css/*.css"], {
		notify:false, /*remove notification popup*/
        server: {
            baseDir: "app" /*index.html location*/
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {  
    gulp.watch("./app/assets/styles/**/*.scss", ['sass']);
});

 gulp.watch('./app/*.html', function() {
    browserSync.reload();
  });








