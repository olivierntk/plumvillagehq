import React, { Component, PropTypes } from 'react'

class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = `https://www.youtube.com/watch?v=${this.props.resourceId.videoId}`
    return (
      <li>
        <div>Title: {this.props.title}</div>
        <div>Published date: {this.props.publishedAt}</div>
        <div>Description: {this.props.description} </div>
        <a href={url} target="blank">Watch on YouTube</a><br /><br />
        {/*
        <img src={this.props.thumbnails.default.url} />
         */}
      </li>
    )

  }
}

export default Video
