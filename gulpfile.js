var gulp = require('gulp'),
	mocha = require('gulp-mocha');

var paths = {
	src: ['lib/**/*.js', 'tests/**/*.js', 'index.js']
};

gulp.task('mocha', function() {
	return gulp.src('./tests/*.js', { read: false })
		.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('watch', function() {
	gulp.watch(paths.src, ['mocha']);
});

gulp.task('default', ['mocha', 'watch']);