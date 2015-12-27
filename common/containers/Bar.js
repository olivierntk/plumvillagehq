import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Bar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>
          Bar
        </h1>
      </div>
    )
  }
}

export default connect()(Bar)
