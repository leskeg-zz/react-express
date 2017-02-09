const express = require('express')
const path = require('path')
const app = express()
const port = (process.env.PORT || 8080)

app.get('/test', (req, res) => res.send('test'))

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
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath,'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) return next(err)
      res.set('content-type','text/html')
      res.send(result)
      res.end()
    })
  })
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
