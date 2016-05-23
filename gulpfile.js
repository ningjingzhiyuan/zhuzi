var gulp = require('gulp');
 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin'); 

var base = {
	src:"../src/gg/",
	build:"../build/gg/"
}

var paths = {
	src:{
		scripts: base.src+"*.js",
		images: base.src+'images/**/*',
		html:base.src+"*.html"
	},
	build:{
		scripts:base.build+"js",
		images:base.build+"images",
		html:base.build+"html"
	}
};

gulp.task('scripts', function() {

  return gulp.src(paths.src.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(paths.build.scripts));
});


gulp.task("imgmin",function(){
	
	return gulp.src(paths.src.images)
	.pipe(imagemin({
		optimizationLevel: 5,
		progressive: true
	}))
	.pipe(gulp.dest(paths.build.images));
}) 

gulp.task('htmlminify', function() {
	var opt = {
		removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
	}
	
	
  return gulp.src(paths.src.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.build.html))
});


gulp.task('default', ['scripts','htmlminify']);