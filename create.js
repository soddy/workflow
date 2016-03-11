module.exports = {
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>workflow for es6</title>
        <!--css start-->
        <link href="./css/index.css" rel="stylesheet"/>
        <link href="./css/sub.css" rel="stylesheet"/>
        <!--css end-->
        <script src="./js/common.min.js?r"></script>
        <script src="./js/index.min.js?r"></script>
    </head>
    <body>
        <div class='sub'>sub</div>
        <div id="indexController"></div>
        <div id="subController"></div>
    </body>
    </html>`,
    css: {
        indexCss: `body{
            margin: 0px;
            padding: 0px;
        }`,
        subCss: `.sub{
            color: green;
        }`
    },
    js: {
        indexJs: `let subController = require('../controllers/subController.es6');
        $(function(){
            $('#indexController').html('indexController');
            subController.init();
        });`,
        subJs: `module.exports = function(){
            return({
                init: function(){
                    let str = 'subController';
                    $('#subController').html(str);
                }
            });
        }();`
    }
}