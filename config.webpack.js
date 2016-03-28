const path = require('path');
const webpack = require('webpack');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const projectRoot = path.resolve(__dirname);
const assetPath = path.resolve('./static/dist');
const htmlIndex = path.resolve('./src/client/index.html');
const entryJS = path.resolve('./src/client/index.js');

const isProduction = process.env.NODE_ENV === 'production';

const productionPlugins = [
  new CleanPlugin([path.join(assetPath, 'dist')], { root: projectRoot, verbose: true }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

const developmentPlugins = [
  new BrowserSyncPlugin({
    proxy: 'http://localhost:' + process.env.PORT,
    open: false
  })
];

const commonPlugins = [
  new HtmlWebpackPlugin({
    template: htmlIndex,
    inject: 'body'
  }),

  new CommonsChunkPlugin({
    name: 'vendor',
    filename: isProduction ? 'vendor-[hash:6].js' : 'vendor.js',
    minChunks: Infinity
  }),
];

module.exports = {
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  context: __dirname,
  entry: {
    vendor: ['angular', 'angular-ui-router'],
    app: entryJS
  },
  output: {
    path: assetPath,
    filename: isProduction ? '[name]-[hash:6].js' : '[name].js',
    chunkFilename: isProduction ? '[name]-[chunkhash:6].js' : '[name].js',
    publicPath: 'dist/'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [{
      test: /\.tpl.html$/,
      loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src/client')) + '/!html-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'ng-annotate!babel'
    }, {
      test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?name=fonts/[name].[ext]&limit=100000'
    }, {
      test: /\.png$/,
      loader: 'url-loader?name=images/[hash:6]-[name].png&limit=100000&mimetype=image/png'
    }, {
      test: /\.jpg$/,
      loader: 'file-loader?name=images/[name].[ext]'
    }, {
      test: /\.json$/,
      loader: 'file?name=json/[name].[ext]'
    }]
  },
  progress: true,
  plugins: isProduction ? commonPlugins.concat(productionPlugins) : commonPlugins.concat(developmentPlugins),
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.js', '.json', '.css', '.scss']
  }
};
