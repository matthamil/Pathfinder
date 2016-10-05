const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const connect = require('gulp-connect');

// Babel Task
// Compiles ES6 to ES5
gulp.task('babel', () => {
  gulp.src('js/*.js')
    .pipe(babel({
        presets: ['es2015']
      }))
    .pipe(gulp.dest('es5'));
});

// Uglify Task
// Minifies JavaScript files
gulp.task('uglify', () => {
  gulp.src('es5/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('minjs'));
});

gulp.task('serve', function() {
  connect.server();
});

// Default Task
// Compiles to ES5 and minifies
gulp.task('default', ['babel', 'uglify']);
