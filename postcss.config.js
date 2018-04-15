module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-px-to-viewport')({
			viewportWidth: 750,
			viewportHeight: 667,
			unitPrecision: 5,
			viewportUnit: 'vw',
			selectorBlackList: [],
			minPixelValue: 1,
			mediaQuery: false
		})
	]
}

// var autoprefixer = require('autoprefixer');
// module.exports = {
// 	plugins: [
// 		require('postcss-px2rem')({ remUnit: 75 }),
// 		autoprefixer({
// 			browsers: 'last 2 version'
// 		})
// 	]
// }