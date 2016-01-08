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
        <div>
          <p>We found <b>{this.props.videos.length}</b> videos.</p>
          <ul>
            {this.props.videos.map(video =>
              <Video
                key={video.resourceId.videoId}
                {...video} />
            )}
          </ul>
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
