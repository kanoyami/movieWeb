module.exports = {
  entry:  __dirname + "/app/App.js",//已多次提及的唯一入口文件
  output: {
    path:  '/home/kanoyami/webtest/movie-server/pages/',//打包后的文件存放的地方
    filename: "index.js"//打包后输出文件的文件名
  },
  devServer: {
	inline: true,
	port: 8888
  },
  module: {
    loaders: [{
    test: /.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'react','stage-1']
     }
    }]
  }


}