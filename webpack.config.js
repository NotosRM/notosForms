const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const themes = ["dark", "pink", "coffee", "dark-blue", "light-blue", "modern-blue"];
module.exports = {
	entry: path.resolve(__dirname, "src/main.ts"),
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		libraryTarget: "umd"
	},
	externals: {
		react: {
			commonjs: "react",
			commonjs2: "react",
			amd: "react",
			root: "react"
		}
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
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin()
		// new BundleAnalyzerPlugin()
	]
};
