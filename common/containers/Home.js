import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchVideosIfNeeded } from '../actions/videos'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchVideosIfNeeded())
  }

  componentWillReceiveProps(nextProps) { }

  render() {
    console.log(this.props);
    const { videos } = this.props
    return (
      <div>

        This is HOME

      </div>
    )
  }
}

Home.propTypes = {
  videos: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videos } = state

  return {
    videos
  }
}

export default connect(mapStateToProps)(Home)
