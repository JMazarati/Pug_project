var gulp = require('gulp');
var plumber = require('gulp-plumber');

// templates
// var htmlmin = require('gulp-htmlmin');

// gulp.task('templates', function(){
// 	gulp.src('./dev/*.html')
// 		.pipe(htmlmin({
// 			collapseWhitespace: true
// 		}))
// 		.pipe(gulp.dest('./site'))
// 		.pipe(connect.reload());
// });


var pug = require('gulp-pug');
 
gulp.task('templates', function() {
	gulp.src('./dev/pug_files/*.pug')
		.pipe(plumber())
		.pipe(pug({
			locals: {
				login: true
			}
		}))
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});


// styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('styles', function(){
	gulp.src('./dev/scss/style.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(prefix('last 12 version'))
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});

// scripts
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglifyjs');
// gulp.task('scripts', function(){
// 	gulp.src('./dev/js/*.js')
// 		.pipe(plumber())
// 		.pipe(concat('script.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./site'))
// 		.pipe(connect.reload());
// });

// images
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
	gulp.src('./dev/images/*')
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('./site/images'))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	gulp.watch('./dev/pug_files/**/*.pug', ['templates']);
	gulp.watch('./dev/scss/*.scss', ['styles']);
	// gulp.watch('./dev/js/*.js', ['scripts']);
	gulp.watch('images/*.{jpg, png, gif, svg}', {cwd: './dev/'}, ['images']);
});

// connect
var connect = require('gulp-connect-multi')();
gulp.task('connect', connect.server({
	host: '127.0.0.1',
	port: 9090,
	root: ['site'],
	livereload: true,
	open: {
		browser: 'Chrome'
	}
}));

gulp.task('default', ['templates', 'styles', 'images']);
gulp.task('dev', ['default', 'connect', 'watch']);