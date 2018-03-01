module.exports = {
  // the main entry of our app
  entry: [
    './src/index.js',
    './src/auth/index.js'
  ],
  devServer: {
      inline: true,
      host: '0.0.0.0',
      port: 7000,
      disableHostCheck: true
  },
  // output configuration
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: 'build.js'
  },
  // how modules should be transformed
    module: {
	rules: [
	    {
		test: /\.css$/,
		use: [
		    'style-loader',
		    'css-loader'
		]
	    },
	    {
		test: /\.vue$/,
		use: [
		    'vue-loader'
		]
	    },
	    {
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		use: [
		    'url-loader'
		]
	    },
	    {
		test: /\.js$/,
		use: [
		    'babel-loader'
		]
	    }
	]
    }
}
