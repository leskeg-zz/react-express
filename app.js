const express = require('express')
const app = express()
const port = (process.env.PORT || 8080)

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('./webpack.config.js')
  const compiler = webpack(webpackConfig)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
}
app.get('*', (req, res) => res.send('404'))

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
