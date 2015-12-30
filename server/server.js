/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'

import { getUploadPlaylistID, getVideosList } from './videos'

const app = new Express()
const port = 3000

let cache = {
  videos: []
}

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
  // Compile an initial state
  const initialState = { videos: cache.videos }

  console.log('initialState');
  console.log(initialState);

  // Create a new Redux store instance
  const store = configureStore(initialState)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const finalState = store.getState()

  console.log('finalState');
  console.log(finalState);

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState))
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Plumvillage HQ</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

// Retrieve all the videos and start the application
getUploadPlaylistID((err, uploadPlaylistID) => {
  if (err) {
    console.error(err)
  } else {
    console.log(uploadPlaylistID);
    getVideosList({uploadPlaylistID: uploadPlaylistID}, (err, videos) => {
      if (err) {
        console.log(err);
      } else {
        cache.videos = videos

        app.listen(port, (error) => {
          if (error) {
            console.error(error)
          } else {
            console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
          }
        })
      }
    })
  }
})




