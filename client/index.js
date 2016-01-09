import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)
const rootElement = document.getElementById('app')

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/lib/locale-data/en'

addLocaleData(en)

render(
  <Provider store={store}>
    <IntlProvider locale="en">
  	 <App />
    </IntlProvider>
  </Provider>,
  rootElement
)
