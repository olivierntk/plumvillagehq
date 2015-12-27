import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import { routeReducer } from 'redux-simple-router'

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunk, logger
)(createStore)

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routeReducer
}))

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
