import React, { Component, PropTypes } from 'react'
import Video from './Video'

class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let videos = (<div>Sorry, no video were found. Try another search.</div>)
    if (this.props.videos.length > 0) {
      videos = (
        <div className="ui container">
          <div className="ui message">
            <div className="header">
              Search results
            </div>
            <p>We found <b>{this.props.videos.length}</b> videos.</p>
          </div>
          <div className="ui relaxed divided items">
            {this.props.videos.map(video =>
              <Video
                key={video.resourceId.videoId}
                {...video} />
            )}
          </div>
        </div>)
    }
    return (
      <div>
        {videos}
      </div>
    )
  }
}

export default VideoList
