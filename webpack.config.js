var webpack = require('webpack');
var	HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		index: [path.join(__dirname, 'src', 'index.js'), 'webpack-hot-middleware/client']
	},
	output: {
		filename: '[name]-bundle_[hash].js',
		chunkFilename: '[id]-chunk_[hash].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: ['react-hot-loader', 'babel-loader']
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true)
	]
};
