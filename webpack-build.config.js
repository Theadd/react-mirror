var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './scripts/index'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: './build/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'scripts'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        include: path.join(__dirname, 'scripts')
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=32768' }
    ]
  }
};
