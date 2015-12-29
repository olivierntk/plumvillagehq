import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import VideoList from '../components/VideoList'

class App extends Component {

  render() {
    const { videos } = this.props

    return (
      <div>
        <h1>Plum Village youtube videos list</h1>
        <VideoList videos={videos} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { videos } = state

  return {
    videos
  }
}

module.exports = connect(mapStateToProps)(App);
