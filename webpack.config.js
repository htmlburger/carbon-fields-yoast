/**
 * External dependencies.
 */
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: process.env.NODE_ENV,

	entry: {
		'carbon-fields-yoast': './src/index.js'
	},

	output: {
		filename: isProduction ? '[name].min.js' : '[name].js',
		path: path.resolve(__dirname, 'dist')
    }
};
