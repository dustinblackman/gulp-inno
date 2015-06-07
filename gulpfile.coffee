gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'

gulp.task 'npm', ->
  gulp.src('./index.coffee', {base: './'})
    .pipe(coffee(bare: true).on('error', gutil.log))
    .pipe gulp.dest('./')
