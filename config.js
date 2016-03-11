module.exports = {
    srcPath: './src/',
    devPath: './dev/',
    distPath: './dist/',
    serverPort: 8211,
    serverStartPath: '',
    serverReloadDelay: 500,
    replaceCssUrl: 'css/',
    verFlag: true,  //是否给js css添加随机版本号
    jsSuffix: '.es6',
    imgLimit: 10240,
    cleanFile: [
        './dist/*'
    ],
    unCleanFile: [
        '!./dist/background',
        '!./dist/uploads',
        '!./dist/mobile'
    ]
}