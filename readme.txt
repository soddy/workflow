workflow v1.1.0
更新10之后

1.先安装 	npm install -g gulp
	npm install -g webpack

2.将目录复制到开发文件夹，运行 npm install

3.gulp dev 为开发环境，会生成dev目录，不压缩，ip和端口可以在Gulpfile.js中修改，默认为8211端口

4.gulp zip 为生产环境，会生成dist目录，代码压缩

5.src目录为源代码目录，目录结构参照workflow.txt，该工作流适合CMD模式

6.css采用scss方式

7.支持es6编译

8.config.js->cleanFile 为清除生产环境的目录，unCleanFile为不需要清除的生产环境的目录，用于gulp zip时去除掉不需要重新编译的目录或者文件

9.config.js->imgLimit 为css中将图片转换为二进制流的大小，默认为10*1024k

10.config.js->jsSuffix 为js目录中逻辑js文件的后缀，可以为es6,js等，如果编辑器支持es6语法，那用.js也可以

11.config.js->verFlag 是否给js css添加随机版本号，用于清除缓存，如果页面有loading，不建议使用，true为添加版本号，false为不添加

12.gulp create 命令创建项目