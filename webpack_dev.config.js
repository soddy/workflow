var config = require('./config.js');
module.exports = {
	entry: {
		'index': config.srcPath + 'js/app/index' + config.jsSuffix
	},
	output: {
		filename: '[name].min.js'
	},
	module: {
        loaders: [
			{
				test: /\.(jsx?|es6)$/,
				//exclude: /(node_modules|bower_components)/,
				loader: "babel",
				query: {
					presets: ['es2015']
				}
			},
			{ test: /\.js$/, loader: 'jsx-loader?harmony' },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit='+ config.imgLimit +'' },
			{ test: /\.html$/, loader: 'html-loader'}
        ]
    },
	devtool: 'source-map'
}