module.exports = {
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
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10240' }, // inline base64 URLs for <=8k images, direct URLs for the rest
          { test: /\.html$/, loader: 'html-loader'}
        ]
    }
}