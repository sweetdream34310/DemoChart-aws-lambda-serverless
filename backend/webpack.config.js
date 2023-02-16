const path = require('path');
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	entry: slsw.lib.entries,
	externals: [
		{ 'aws-sdk': 'commonjs aws-sdk' },
		'sharp',
		'pg',
		'sqlite3',
		'tedious',
		'pg-hstore',
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
	target: 'node',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	optimization: {
		// TODO optimize optimizer settings
		minimize: false,
	},
	plugins: [
		// Copy all files in the assets fodler
		{
			apply: (compiler) => {
				new CopyWebpackPlugin({
					patterns: [
						{
							from: 'assets',
							to: 'assets',
							noErrorOnMissing: true,
							globOptions: {
								ignore: ['**.afdesign', '**.afphoto'],
							},
						},
					],
				}).apply(compiler);
			},
		},
	],
};
