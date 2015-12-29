import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Videos extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>
          Videos
        </h1>
      </div>
    )
  }
}

export default connect()(Videos)
