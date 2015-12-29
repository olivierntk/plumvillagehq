import React, { Component, PropTypes } from 'react'

class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <li>
        <div>{this.props.title}</div>
        {/*
        <div>{this.props.publishedAt}</div>
        <div>{this.props.description}</div>
        <img src={this.props.thumbnails.default.url} />
        */}
      </li>
    )

  }
}

export default Video
