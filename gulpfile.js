const gulp = require('gulp');
const clean = require('gulp-clean');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-clean-css');
const pump = require('pump');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

gulp.task('clean', function() {
  return gulp
    .src('dist')
    .pipe(clean());
});

gulp.task('jshint', function() {
  return gulp
    .src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concatApp', function() {
  return gulp.src(['app/**/*.js', '!app/**/*.spec.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/concat'));
});

gulp.task('babel', ['concatApp'],  function() {
  return gulp.src('dist/concat/app.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist/babel'));
});

gulp.task('uglify', ['babel'], function(cb) {
  pump([
    gulp.src('dist/babel/app.js'),
    uglify(),
    gulp.dest('dist/js')
  ], cb);
});

gulp.task('concatLibs', ['uglify'], function() {
  return gulp.src([ 'node_modules/angular/angular.min.js' ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'))    
});

gulp.task('build', ['uglify', 'concatLibs'], function() {
  return gulp
    .src(['dist/babel', 'dist/concat'])
    .pipe(clean());
});


gulp.task('htmlmin', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('htmlminIndex', function() {
  return gulp.src('index.prod.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('rename', function() {
  return gulp.src('dist/index.prod.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('cssmin', function() {
  return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css', 
      'css/**/*.css'
    ])
    .pipe(cssmin())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('default', function() {
  runSequence(
    ['jshint', 'clean'],
    ['build', 'cssmin', 'htmlmin', 'htmlminIndex']);
});
