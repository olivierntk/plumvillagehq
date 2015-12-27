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
import Foo from '../common/containers/Foo'
import Bar from '../common/containers/Bar'

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
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  rootElement
)
