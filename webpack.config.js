const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const APP_PATH = path.resolve(__dirname, "src");

module.exports = {
	entry: APP_PATH,
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					},
					"postcss-loader"
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.join(APP_PATH, "index.html")
		}),
		new ForkTsCheckerWebpackPlugin()
	]
};
