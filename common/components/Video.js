import React, { Component, PropTypes } from 'react'

class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = `https://www.youtube.com/watch?v=${this.props.resourceId.videoId}`
    return (
      <li>
        <div>
          {this.props.title} - <a href={url} target="blank">link</a>
        </div>
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
