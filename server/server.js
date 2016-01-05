/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'
import favicon  from 'serve-favicon'

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

const isDevelopment = (process.env.NODE_ENV !== 'production');

const app = new Express()

app.set('port', (process.env.PORT || 5000));
app.use('/public', Express.static('public'));
app.use(favicon(path.join(__dirname,'../public','images','favicon.png')));

let cache = {
  videos: []
}

if (isDevelopment) {
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
  // Compile an initial state
  const initialState = { videos: cache.videos }

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

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState))
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Plumvillage HQ</title>
        <meta name="description" content="A site to gather Plum Village's online resources" />
        <meta name="keywords" content="Thich Nhat Hanh, PlumVillage, Mindfulness, Meditation, Dharma Talks, Peace, Joy" />
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-71915923-1', 'auto');
          ga('send', 'pageview');

        </script>
      </head>
      <body>
        <!-- Google Tag Manager -->
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/public/bundle.js"></script>
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

        app.listen(app.get('port'), (error) => {
          if (error) {
            console.error(error)
          } else {
            console.info(`==> 🌎  Listening on port ${app.get('port')}. Open up http://localhost:${app.get('port')}/ in your browser.`)
          }
        })
      }
    })
  }
})




