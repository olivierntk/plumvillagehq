import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Foo extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>
          Foo
        </h1>
      </div>
    )
  }
}

export default connect()(Foo)
