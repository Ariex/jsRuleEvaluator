var gulp = require("gulp");
var sourcemaps = require('gulp-sourcemaps');
var babel= require('gulp-babel');
var concat = require('gulp-concat');

gulp.task("default", function(){
	console.log("Please use 'npm install' to install necessary packages.");
	console.log("Please use 'bower install' to install babel-polyfill.");
	console.log("Please use 'gulp rebuild' to re-compile, publish, update unit test files.");
	console.log("Please use 'gulp publish' to re-compile and publish to 'dist' folder.");
	console.log("Compilation result will be available at 'dist' folder, this project utilized some method from babel-polyfill, which is also included in this folder.");
	console.log("This project is made originally for SilverStripe, so if you are not using SilverStripe, please modify SilverStripeElementValueExtractor class in SilverStripeElementValueExtractor.es6, or create your own element value extractor then passing to RuleEvaluator.");
	console.log("To run the unit test, a simple web server is required.");
});

gulp.task("rebuild", function(){
	gulp.start("publish");
	gulp.src("dist/*.*").pipe(gulp.dest("unittest/lib"));
	gulp.src("bower_components/babel-polyfill/browser-polyfill.js").pipe(gulp.dest("unittest/lib"));
});

gulp.task("publish", function(){
	gulp.src("bower_components/babel-polyfill/browser-polyfill.js").pipe(gulp.dest('dist'));
	return gulp.src("src/*.es6")
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(concat('RuleEvaluator.dist.js')).pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('dist'));
});