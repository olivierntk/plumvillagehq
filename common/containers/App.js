import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class App extends Component {
  render() {
    return (
      <div>
        APP SHELL
        <header>
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/podcasts">Podcasts</Link>
          {' '}
          <Link to="/videos">Videos</Link>
        </header>
        <div>
          <button onClick={() => pushPath('/podcasts')}>Go to /podcasts</button>
        </div>
        <div style={{marginTop: '1.5em'}}>{this.props.children}</div>
      </div>
    )
  }
}


module.exports = connect(
  null,
  { pushPath }
)(App);
