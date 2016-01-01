import React, { Component, PropTypes } from 'react'
import Video from './Video'

class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <ul>
          {this.props.videos.map(video =>
            <Video
              key={video.resourceId.videoId}
              {...video} />
          )}
        </ul>
      </div>
    )
  }
}

export default VideoList
