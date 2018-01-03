const gulp        = require('gulp');
const config      = require('./gulp.config');
const gutil       = require('gulp-util');
const debug       = require('gulp-debug');
const plumber     = require("gulp-plumber");
const changed     = require('gulp-changed');

const pug            = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');

const tslint      = require('gulp-tslint');

// for server
const path        = require('path');
const browserSync = require('browser-sync').create();
const nodemon     = require('gulp-nodemon');
const cp          = require('child_process');
const tsb         = require('gulp-tsb');

// print the error out
var printError = function(error) {
  console.log(error.toString());
}

gulp.task('tslint', function() {
  return gulp.src(config.ts.src)
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red('Error: ' + error.message));
      this.emit('end');
    }))
    .pipe(tslint({
      formatter: "verbose",
      configuration: "tslint.json"
    }))
    .on('error', printError)
    .pipe(tslint.report());
});

gulp.task('pug', function() {
  return gulp.src(config.pug.src)
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red('Error: ' + error.message));
      this.emit('end');
    }))
		.pipe(changed(config.pug.dest, {extension: '.html'}))
    .pipe(debug({title: 'after changed:'}))
    // 関連ファイルを探す
    // .pipe(pugInheritance({basedir: config.pug.base}))
    // .pipe(debug({title: 'after pugInheritance:'}))
		// process pug templates
    .pipe(pug(config.pug.options))
		// save all the files
    .pipe(gulp.dest(config.pug.dest))
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

// for server
// run browser-sync on for client changes
gulp.task('browser-sync', ['nodemon', 'watch'], function () {
  browserSync.init({
    proxy: "http://localhost:3000",
    port: 3100,
    files: [
			"server/out/**/*.*",
      "server/out/routes/**/*.*",
      "server/out/public/**/*.*", 
      "server/out/views/**/*.*"
    ]
  });
});

// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
  var started = false;

  return nodemon({
    script: 'server/out/www.js',
    watch: ['server/out/*.js']
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', function onRestart() {
    console.log('called restart');
    setTimeout(function reload() {
      browserSync.reload();
    }, 500);  // browserSync reload delay
  });
});

// TypeScript build for /src folder 
var tsConfigSrc = tsb.create('server/src/tsconfig.json');
gulp.task('build', function () {
  return gulp.src('./server/src/**/*.ts')
             .pipe(tsConfigSrc()) 
             .pipe(gulp.dest('./server/out'));
});

// watch for any TypeScript file changes
// if a file change is detected, run the TypeScript compile gulp tasks
gulp.task('watch', function () {
  gulp.watch('server/src/**/*.ts', ['build']);
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(config.pug.src, ['pug']);
  gulp.watch(config.ts.src, ['tslint']);
});