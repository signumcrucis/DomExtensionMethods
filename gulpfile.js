const gulp = require('gulp');
const compiler = require('google-closure-compiler-js').gulp();
 
gulp.task('build', function() {
  return gulp.src('./src/DomExtensionMethods.js', {base: './'})
      // your other steps here 
      .pipe(compiler({
          compilationLevel: 'SIMPLE',
          warningLevel: 'VERBOSE',
          jsOutputFile: 'DomExtensionMethods.min.js',
          createSourceMap: true,
          outputWrapper: 
`/*!
 * DomExtensionMethods
 * @license MIT
 */
%output%`
        }))
      .pipe(gulp.dest('./dist'));
});