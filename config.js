module.exports = {
    srcPath: './src/',
    devPath: './dev/',
    distPath: './dist/',
    serverPort: 8211,
    serverStartPath: '',
    serverReloadDelay: 500,
    replaceCssUrl: 'css/',
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