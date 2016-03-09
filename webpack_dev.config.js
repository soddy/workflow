module.exports = {
	watch: true,
	entry: {
		'index': './web/src/js/app/index.js'
	},
	output: {
		filename: '[name].min.js'
	},
	module: {
        loaders: [
          { test: /\.js$/, loader: 'jsx-loader?harmony' },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10240' },
          { test: /\.html$/, loader: 'html-loader'}
        ]
    }
}