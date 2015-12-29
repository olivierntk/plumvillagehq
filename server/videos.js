/**
 * https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUcv7KJIAsiddB2YRegvrF7g&key={YOUR_API_KEY}
 */
/**
 * https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=plumvillageonline&key={YOUR_API_KEY}
 */

import request from 'superagent'
import { config } from '../config'

export function getUploadPlaylistID (callback) {
  let url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=plumvillageonline&key=${config.googleapikey}`
  request
    .get(url)
    .end((err, res) => {
      if (err) {
        return callback(err)
      }
      try {
        let playlistUploadID = res.body.items[0].contentDetails.relatedPlaylists.uploads
        return callback(null, playlistUploadID)
      } catch (ex) {
        return callback(err)
      }
    })
}

export function getVideosList (params, callback) {
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${params.uploadPlaylistID}&maxResults=50&key=${config.googleapikey}`
  if (params.nextPageToken) {
    url += `&pageToken=${params.nextPageToken}`
  }

  request
    .get(url)
    .end((err, res) => {
      if (err) {
        return callback(err)
      }

      params.videos = params.videos || [];
      params.videos = params.videos.concat(res.body.items.map(function (item) {
        return item.snippet
      }));

      console.log(`Received ${res.body.items.length} videos`);

      if (res.body.nextPageToken) {
        console.log(`nextPageToken ${res.body.nextPageToken} ... Making another call`);
        params.nextPageToken = res.body.nextPageToken;
        return getVideosList(params, callback);
      } else {
        console.log(`Total videos retrieved: ${params.videos.length}`);
        return callback(null, params.videos)
      }
    })
}
