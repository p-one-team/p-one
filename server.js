var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	inline: true,
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
});

server.listen(3000, '192.168.1.166', function(err, result) {
	if (err) {
		return console.log(err);
	}
	console.log('Listening at http://192.168.1.166:3000/');
});