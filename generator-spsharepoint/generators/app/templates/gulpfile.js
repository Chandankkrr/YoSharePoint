'use strict';
var gulp = require('gulp');
var robocopy = require('robocopy');
var spsave = require("spsave").spsave;

gulp.task('jquery', function () {
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('files/'));
});

gulp.task('sp-deploy', ['jquery'], () => {
    return robocopy({
        source: 'files',
        destination: '<%= davurl%>',
        files: ['*.*'],
        copy: { mirror: false },
        file: {
            excludeFiles: [],
            excludeDirs: []
        },
        retry: {
            count: 2,
            wait: 3
        }
    });
});