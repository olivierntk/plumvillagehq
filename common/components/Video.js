import React, { Component, PropTypes } from 'react'

class Video extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = `https://www.youtube.com/watch?v=${this.props.resourceId.videoId}`
    let date = new Date(this.props.publishedAt);
    return (
      <div className="item">
        <div className="ui small image"><img src={this.props.thumbnails.default.url} /></div>
        <div className="content">
          <h4 className="header">{this.props.title}</h4>
          <div className="meta"><span className="extra">Published on: {date.toLocaleDateString()}</span></div>
          <div className="description">
            {this.props.description}
          </div>
          <div className="extra"><a href={url} target="_blank">
            <div className="ui right floated primary button">
              Watch on Youtube
              <i className="right chevron icon"></i>
            </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Video
