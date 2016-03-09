//workflow for es6
var htmlFlag=0,
    publicFlag=0,
    imgFlag=0,
    cssFlag=0,
    indexFlag=0,
    libFlag=0,
    commonFlag=0;
var distHtmlFlag=0,
    distPublicFlag=0,
    distImgFlag=0,
    distCssFlag=0,
    distIndexFlag=0,
    distLibFlag=0,
    distCommonFlag=0;
var rd;
var config = require('./config.js');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var base64 = require('gulp-base64');
var sourcemaps = require('gulp-sourcemaps');
var concat  = require('gulp-concat');
var rename = require('gulp-rename');
var uglify  = require('gulp-uglify');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var replace = require('gulp-replace');
var minifycss = require('gulp-minify-css');
var watch = require('gulp-watch');
var webpack = require('gulp-webpack');
var webpackDevConfig = require('./webpack_dev.config');
var webpackDistConfig = require('./webpack_dist.config');

//dev
// html
gulp.task('html', function() {
    var htmlSrc = config.srcPath + '*.html',
        htmlDev = config.devPath + '';
    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDev));
    htmlFlag = 1;
    console.log('html files are builded!');
    watch(htmlSrc, function(){
       gulp.src(htmlSrc)
            .pipe(gulp.dest(htmlDev))
            .pipe(reload({stream: true}));
        console.log('html file is changed!');
    });
});
//public
gulp.task('public', function () {
    var publicSrc = config.srcPath + 'public/**/*',
        publicDev = config.devPath + 'public/';
    gulp.src(publicSrc)
        .pipe(gulp.dest(publicDev));
    publicFlag = 1;
    console.log('public folder is builded!');
    watch(publicSrc, function(){
        gulp.src(publicSrc)
            .pipe(gulp.dest(publicDev))
            .pipe(reload({stream: true}));
        console.log('public folder is changed!');
    });
});
// images
gulp.task('img', function () {
    var imgSrc = config.srcPath + 'images/**/*',
        imgDev = config.devPath + 'images/';

    gulp.src(imgSrc)
        .pipe(gulp.dest(imgDev));
    imgFlag = 1;
    console.log('img files are builded!');
    watch(imgSrc, function(){
        gulp.src(imgSrc)
            .pipe(gulp.dest(imgDev))
            .pipe(reload({stream: true}));
        console.log('img file is changed!');
    });
});
//css
gulp.task('css', function(){
    var cssSrc = config.srcPath + 'css/*.scss',
        cssDev = config.devPath + 'css/';
    sass(cssSrc)
        .pipe(sourcemaps.init())
        .pipe(base64({
            extensions: ['png', 'jpg'],
            maxImageSize: 10*1024,
            debug: true
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(cssDev));
    cssFlag = 1;
    console.log('css files are builded!');
    watch(cssSrc, function(){
        sass(cssSrc)
            .pipe(sourcemaps.init())
            .pipe(base64({
                extensions: ['png', 'jpg'],
                maxImageSize: 10*1024,
                debug: true
            }))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest(cssDev))
            .pipe(reload({stream: true}));
        console.log('css file is changed!');
    });
});
// js index
gulp.task('index', function() {
    webpack(webpackDevConfig, null, function(err, stats){
        indexFlag = 1;
        console.log('index.min.js file is builded!');
        watch('./src/js/**/*', function(){
            webpack(webpackDevConfig, null, function(err, stats){
                console.log('index.min.js file is changed!');
            })
                .pipe(gulp.dest(config.devPath + 'js'))
                .pipe(reload({stream: true}));
        });
    })
        .pipe(gulp.dest(config.devPath + 'js'));
});
// js lib
gulp.task('lib', function(){
    var jsLibSrc = config.srcPath + 'js/lib/*.js',
        jsLibDev = config.devPath + 'js/lib/';
    gulp.src(jsLibSrc)
        .pipe(gulp.dest(jsLibDev));
    libFlag = 1;
    console.log('lib files are builded!');
    watch(jsLibSrc, function(){
        gulp.src(jsLibSrc)
            .pipe(gulp.dest(jsLibDev))
            .pipe(reload({stream: true}));
        console.log('lib file is changed!');
    });
});
// js common
gulp.task('common', function () {
    var jsCommonSrc = config.srcPath + 'js/common/*.js',
        jsCommonDev = config.devPath + 'js/';
    gulp.src(jsCommonSrc)
        .pipe(concat('common.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsCommonDev));
    commonFlag = 1;
    console.log('common files are builded!');
    watch(jsCommonSrc, function(){
        gulp.src(jsCommonSrc)
            .pipe(concat('common.js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest(jsCommonDev))
            .pipe(reload({stream: true}));
        console.log('common file is changed!');
    });
});
//clean dev
gulp.task('clean', function() {
    gulp.src([config.devPath], {read: false})
        .pipe(clean());
});
// gulp watch
gulp.task('dev', ['clean'], function(){
    setTimeout(function(){
        gulp.start('html','public','img','css','index','lib','common');
        var t = setInterval(function(){
            console.log('loading...');
            if((htmlFlag+publicFlag+imgFlag+cssFlag+indexFlag+libFlag+commonFlag)>=7){
                console.log('server start!');
                clearInterval(t);
                browserSync.init({
                    server: config.devPath,
                    port: config.serverPort,
                    startPath: config.serverStartPath,
                    reloadDelay: config.serverReloadDelay
                });
            }
        },1000);
    },200);
});

//dist
// html
gulp.task('dist_html', function() {
    var htmlSrc = config.srcPath + '*.html',
        htmlDist = config.distPath + '';
    gulp.src(htmlSrc)
        .pipe(replace('.js', '.js?r='+rd))
        .pipe(replace('.css', '.css?r='+rd))
        .pipe(replace('.jpg', '.jpg?r='+rd))
        .pipe(replace('.png', '.png?r='+rd))
        .pipe(replace('.gif', '.gif?r='+rd))
        .pipe(replace(/<!--css start-->([\s\S]*?)<!--css end-->/g, '<link href="'+ config.replaceCssUrl +'index.min.css?r='+rd+'" rel="stylesheet"/>'))
        .pipe(gulp.dest(htmlDist));
    distHtmlFlag = 1;
    console.log('html files are builded!');
});
// php
gulp.task('dist_php', function() {
    var phpSrc = config.srcPath + '*.php',
        phpDist = config.distPath + '';
    gulp.src(phpSrc)
        .pipe(replace('v=', 'v='+rd))
        .pipe(gulp.dest(phpDist));
    console.log('php file is builded!');
});
// public
gulp.task('dist_public', function () {
    var publicSrc = config.srcPath + 'public/**/*',
        publicDist = config.distPath + 'public/';
    gulp.src(publicSrc)
        .pipe(gulp.dest(publicDist));
    distPublicFlag = 1;
    console.log('public folder is builded!');
});
// images
gulp.task('dist_img', function () {
    var imgSrc = config.srcPath + 'images/**/*',
        imgDist = config.distPath + 'images/';
    gulp.src(imgSrc)
        .pipe(gulp.dest(imgDist));
    distImgFlag = 1;
    console.log('img files are builded!');
});
//css
gulp.task('dist_css', function(){
    var cssSrc = config.srcPath + 'css/*.scss',
        cssDist = config.distPath + 'css/';
    sass(cssSrc)
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
        .pipe(gulp.dest(cssDist));
    distCssFlag = 1;
    console.log('css files are builded!');
});
// js index
gulp.task('dist_index', function() {
    webpack(webpackDistConfig, null, function(){
        distIndexFlag = 1;
        console.log('index.min.js file is builded!');
    })
        .pipe(replace('.jpg','.jpg?r='+rd))
        .pipe(replace('.png','.png?r='+rd))
        .pipe(replace('.gif','.gif?r='+rd))
        .pipe(uglify())
        .pipe(gulp.dest(config.distPath + 'js'));
});
// js lib
gulp.task('dist_lib', function(){
    var jsLibSrc = config.srcPath + 'js/lib/*.js',
        jsLibDist = config.distPath + 'js/lib/';
    gulp.src(jsLibSrc)
        .pipe(gulp.dest(jsLibDist));
    distLibFlag = 1;
    console.log('lib files are builded!');
});
// js common
gulp.task('dist_common', function () {
    var jsCommonSrc = config.srcPath + 'js/common/*.js',
        jsCommonDist = config.distPath + 'js/';
    gulp.src(jsCommonSrc)
        .pipe(concat('common.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsCommonDist));
    distCommonFlag = 1;
    console.log('common files are builded!');
});
//clean
gulp.task('dist_clean', function() {
    var cleanFileArr;
    cleanFileArr = (config.cleanFile).concat(config.unCleanFile);
    gulp.src(cleanFileArr, {read: false})
        .pipe(clean());
});
// gulp zip
gulp.task('zip', ['dist_clean'], function(){
    rd = new Date().getTime();
    setTimeout(function(){
        gulp.start('dist_html','dist_php','dist_public','dist_img','dist_css','dist_index','dist_lib','dist_common');
        var t = setInterval(function(){
            console.log('building...');
            if((distHtmlFlag+distPublicFlag+distImgFlag+distCssFlag+distIndexFlag+distLibFlag+distCommonFlag)>=7){
                console.log('build complete!');
                clearInterval(t);
            }
        },1000);
    },200);
});