import path from "path";
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";


import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from "eslint-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}


const config: Configuration = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {     filename: 'bundle.js',     path: path.resolve(__dirname, 'build')   },
  performance: {     hints: 'warning',     maxEntrypointSize: 2000000,     maxAssetSize: 2000000 },
  module: {
    rules: [
          {
            test: /\.(ts|js)x?$/i,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
              },
            },
          },
          {
            test: /\.s?css$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'vue-style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
          },
          {
            test: /\.(png|jpe?g|ico|gif)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          },
          {         
            test: /\.svg$/,         
            use: ['@svgr/webpack', 'url-loader'],       
          },

    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
        async: false
    }),
    new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new MiniCssExtractPlugin({       filename: "[name].[contenthash].css",     }),
  ],
};

export default config;