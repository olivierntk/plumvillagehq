import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Podcasts extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>
          Podcasts
        </h1>
      </div>
    )
  }
}

export default connect()(Podcasts)
