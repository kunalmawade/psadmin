"user strict";

var gulp = require("gulp");
var connect = require("gulp-connect"); // Runs local dev server
var open = require("gulp-open"); // open url in web browser

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    dist: './dist'
  }
}

// Start local development server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });

});

// open file in browser
gulp.task('open', ['connect'], function() {
  gulp.src('./dist/index.html')
      .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Copy src files to dist folder and reload in browser
gulp.task('html', function() {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

// watch file change
gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
})

// default tasks to run when you run $ gulp
gulp.task('default', ['html', 'open', 'watch']);