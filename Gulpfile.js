//pc css,html,js
var rd;
var gulp = require('gulp');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var base64 = require('gulp-base64');
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var replace = require('gulp-replace');
var webpackDevConfig = require('./webpack_dev.config');
var webpackDistConfig = require('./webpack_dist.config');

/*gulp.task('dev', function(){
    var devConfig = Object.create(webpackDevConfig);
    webpack(devConfig, function(err, stats) {
        console.log(err);
    });
});*/

/*gulp.task('build', function(){
    var distConfig = Object.create(webpackDistConfig);
    webpack(distConfig, function(err, stats) {
        console.log(err);
    });
});*/

//dev
// html
gulp.task('html', function() {
    var htmlSrc = './web/src/html/*.html',
        htmlDst = './web/dev/html/';

    return gulp.src(htmlSrc)
        .pipe(watch(htmlSrc, function(){
            gulp.src(htmlSrc)
                .pipe(gulp.dest(htmlDst))
                .pipe(reload({stream: true}));
        }))
});
// images
gulp.task('img', function () {
    var imgSrc = './web/src/img/**/*',
        imgDst = './web/dev/img/';
    return gulp.src(imgSrc)
        .pipe(watch(imgSrc))
        .pipe(gulp.dest(imgDst))
        .pipe(reload({stream: true}));
});
//css
gulp.task('css', function(){
    var cssSrc = './web/src/css/*.scss',
       cssDst = './web/dev/css/';
    gulp.src(cssSrc)
        .pipe(watch(cssSrc, function(){
            return sass(cssSrc)
                .pipe(base64({
                    extensions: ['png', 'jpg'],
                    maxImageSize: 10*1024,
                    debug: true
                }))
                .pipe(gulp.dest(cssDst))
                .pipe(reload({stream: true}));
        }));
});
// js index
gulp.task('index', function() {
    return webpack(webpackDevConfig)
        .pipe(gulp.dest('./web/dev/js'))
        .pipe(reload({stream: true}));
});
// js lib
gulp.task('lib', function(){
    var jsLibSrc = './web/src/js/lib/*.js',
        jsLibDst = './web/dev/js/lib/';
    gulp.src(jsLibSrc)
        .pipe(watch(jsLibSrc, function(){
            gulp.src(jsLibSrc)
                //.pipe(rename({ suffix: '.min' }))
                //.pipe(uglify())
                .pipe(gulp.dest(jsLibDst))
                .pipe(reload({stream: true}));
        }))
});
// js common
gulp.task('common', function () {
    var jsCommonSrc = './web/src/js/common/*.js',
        jsCommonDst ='./web/dev/js/';

    gulp.src(jsCommonSrc)
        .pipe(watch(jsCommonSrc, function(){
            gulp.src(jsCommonSrc)
            .pipe(concat('common.js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest(jsCommonDst))
            .pipe(reload({stream: true}));
        }))
});
//clean dev
gulp.task('clean', function() {
    gulp.src(['./web/dev'], {read: false})
        .pipe(clean());
});
// gulp watch
gulp.task('dev', ['clean'], function(){
    setTimeout(function(){
        browserSync.init({
            server: './web/dev',
            port: 8211,
            startPath: '/html',
            reloadDelay: 500
        });
        gulp.start('html','img','css','index','lib','common');
    },200);
});

//dist
// html
gulp.task('dist_html', function() {
    var htmlSrc = './web/src/html/*.html',
        htmlDst = './web/dist/html/';
    return gulp.src(htmlSrc)
        .pipe(replace('.js', '.js?r='+rd))
        .pipe(replace('.css', '.css?r='+rd))
        .pipe(replace('.jpg', '.jpg?r='+rd))
        .pipe(replace('.png', '.png?r='+rd))
        .pipe(replace('.gif', '.gif?r='+rd))
        .pipe(replace(/<!--css start-->([\s\S]*?)<!--css end-->/g, '<link href="../css/index.min.css" rel="stylesheet"/>'))
        .pipe(gulp.dest(htmlDst));
});
// images
gulp.task('dist_img', function () {
    var imgSrc = './web/src/img/**/*',
        imgDst = './web/dist/img/';
    return gulp.src(imgSrc)
        .pipe(gulp.dest(imgDst));
});
//css
gulp.task('dist_css', function(){
    var cssSrc = './web/src/css/*.scss',
        cssDst = './web/dist/css/';
    return sass(cssSrc)
        .pipe(base64({
            extensions: ['png', 'jpg'],
            maxImageSize: 10*1024,
            debug: true
        }))
        .pipe(replace('.jpg', '.jpg?r='+rd))
        .pipe(replace('.png', '.png?r='+rd))
        .pipe(concat('index.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst))
});
// js index
gulp.task('dist_index', function() {
    return webpack(webpackDistConfig)
        .pipe(replace('.jpg','.jpg?r='+rd))
        .pipe(replace('.png','.png?r='+rd))
        .pipe(replace('.gif','.gif?r='+rd))
        .pipe(uglify())
        .pipe(gulp.dest('./web/dist/js'));
});
// js lib
gulp.task('dist_lib', function(){
    var jsLibSrc = './web/src/js/lib/*.js',
        jsLibDst = './web/dist/js/lib/';
    gulp.src(jsLibSrc)
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        .pipe(gulp.dest(jsLibDst))
});
// js common
gulp.task('dist_common', function () {
    var jsCommonSrc = './web/src/js/common/*.js',
        jsCommonDst ='./web/dist/js/';
    gulp.src(jsCommonSrc)
        .pipe(concat('common.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsCommonDst))
});
//clean
gulp.task('dist_clean', function() {
    gulp.src(['./web/dist'], {read: false})
        .pipe(clean());
});
// gulp watch
gulp.task('zip', ['dist_clean'], function(){
    rd = new Date().getTime();
    setTimeout(function(){
        gulp.start('dist_html','dist_img','dist_css','dist_index','dist_lib','dist_common');
    },200);
});

//gulp.task('htmltest', function(){
//    var htmlSrc = './web/src/html/*.html',
//        htmlDst = './web/dist/html/';
//    return gulp.src(htmlSrc)
//        .pipe(replace(/<!--css start-->([\s\S]*?)<!--css end-->/g, '<link href="../css/index.min.css" rel="stylesheet"/>'))
//        .pipe(gulp.dest(htmlDst));
//});