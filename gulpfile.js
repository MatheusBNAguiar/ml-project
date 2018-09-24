const fs = require('fs');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jsdoc2md = require('jsdoc-to-markdown');

gulp.task('lint', () => gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('docs', () => {
    const docs = jsdoc2md.renderSync({ files: '{,!(node_modules)/**/}*.{js,json}' });
    fs.writeFileSync('./docs/docs.md', docs);
});
