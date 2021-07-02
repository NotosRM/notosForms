const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const APP_PATH = path.resolve(__dirname, "src");
const MONACO_DIR = path.resolve(__dirname, "node_modules/monaco-editor");

const themes = ["dark", "pink", "coffee", "dark-blue", "light-blue", "modern-blue"];
module.exports = {
	entry: APP_PATH,
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"]
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
				include: APP_PATH,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[path][name]__[local]",
								getLocalIdent: (_context, _localIdentName, localName) => {
									if (themes.includes(localName)) return localName;
								}
							}
						}
					},
					"postcss-loader"
				]
			},
			{
				test: /\.css$/,
				include: MONACO_DIR,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.ttf$/,
				use: ["file-loader"]
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
		new ForkTsCheckerWebpackPlugin(),
		new MonacoWebpackPlugin({
			languages: ["json"]
		}),
		new CleanWebpackPlugin()
		// new BundleAnalyzerPlugin()
	]
};
