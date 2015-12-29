import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import Home from '../common/containers/Home'
import Podcasts from '../common/containers/Podcasts'
import Videos from '../common/containers/Videos'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)
const rootElement = document.getElementById('app')
const history = createHistory()

syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
  	<Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="podcasts" component={Podcasts}/>
        <Route path="videos" component={Videos}/>
      </Route>
    </Router>
  </Provider>,
  rootElement
)
