const path = require("path");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "out")
	},
	// Enable sourcemaps for debugging webpack's output.
	devtool: "sourcemap",
	mode: "development",
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				}],
			}, {   // SASS Modules
				test: /\.mod\.scss$/,
				exclude: /node_modules/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader",
					query: {
						modules: true
					}
				}, {
					loader: "sass-loader"
				}]
			}
		],
	},
};