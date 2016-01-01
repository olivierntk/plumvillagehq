import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { LanguageFilters, setLanguageFilter } from '../actions'
import Filter from '../components/Filter'
import VideoList from '../components/VideoList'
import * as _ from 'lodash'

class App extends Component {

  render() {
    const { dispatch, visibleVideos, languageFilter } = this.props
    return (
      <div>
        <h1>Plum Village YouTube videos list</h1>
        <Filter filter='ALL'
          onLanguageFilterChange={nextFilter => {
            dispatch(setLanguageFilter(nextFilter))}
          }/>
        <VideoList videos={visibleVideos} />
      </div>
    )
  }
}

function selectVideos(videos, filter) {
  switch (filter) {
    case LanguageFilters.ALL:
      return videos
    case LanguageFilters.EN:
      return videos.filter(filterEN)
    case LanguageFilters.FR:
      return videos.filter(filterFR)
    case LanguageFilters.VN:
      return videos.filter(filterVN)
  }
}

function filterEN (video) {
  let content = video.title.toLowerCase() + video.description.toLowerCase()
  let regexList = ['fr ', 'francophone', 'french', 'francais', 'français', 'vn ', 'vn)', 'vietnamese']
  let results = _.map(regexList, (regex) => {
    return !content.includes(regex)
  })
  let result = _.reduce(results, (prev, next) => {
    return prev && next
  })
  if (result) {
    return video
  }
}

function filterFR (video) {
  let content = video.title.toLowerCase() + video.description.toLowerCase()
  let regexList = ['fr ', 'francophone', 'french', 'francais', 'français']
  let results = _.map(regexList, (regex) => {
    return content.includes(regex)
  })
  let result = _.reduce(results, (prev, next) => {
    return prev || next
  })
  if (result) {
    return video
  }
}

function filterVN (video) {
  let content = video.title.toLowerCase() + video.description.toLowerCase()
  let regexList = ['vn ', 'vn)', 'vietnamese']
  let results = _.map(regexList, (regex) => {
    return content.includes(regex)
  })
  let result = _.reduce(results, (prev, next) => {
    return prev || next
  })
  if (result) {
    return video
  }
}

function mapStateToProps(state) {
  const { videos } = state

  return {
    languageFilter: state.languageFilter,
    visibleVideos: selectVideos(state.videos, state.languageFilter),
  }
}

module.exports = connect(mapStateToProps)(App);
