import request from 'superagent'

export const REQUEST_VIDEOS = 'REQUEST_VIDEOS'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const INVALIDATE_VIDEOS = 'INVALIDATE_VIDEOS'

function requestVideos() {
  return {
    type: REQUEST_VIDEOS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_VIDEOS,
    videos: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchVideos() {
  return dispatch => {
    // dispatch(requestVideos())
    return request
      .get(`http://www.youtube.com/`)
      .end(function(err, res){
        console.log(res);
      })
  }
}

function shouldFetchVideos(state) {
  const videos = state.videos
  if (!videos) {
    return true
  } else if (videos.isFetching) {
    return false
  } else {
    return videos.didInvalidate
  }
}

export function fetchVideosIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchVideos(getState())) {
      return dispatch(fetchVideos())
    }
  }
}
