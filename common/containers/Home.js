import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          This is Home
        </h1>
      </div>
    )
  }
}

export default connect()(Home)
