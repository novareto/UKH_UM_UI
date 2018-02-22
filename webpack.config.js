module.exports = {
  // the main entry of our app
  entry: [
    './src/index.js',
    './src/auth/index.js'
  ],
  devServer: {
      inline:true,
      port: 8000
  },
  // output configuration
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: 'build.js'
  },
  // how modules should be transformed
  module: {
    loaders: [
	{
	    test: /\.vue$/,
            loader: 'vue-loader'
	},
	{
	    test: /\.css$/,
            loader: 'css-loader'
	},
	{
	    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	    loader: 'url-loader',
	},
	{
	    test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
	}
    ]
  }
}
