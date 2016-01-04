import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LanguageFilters, setLanguageFilter, setSearchFilter } from '../actions'
import LanguageFilter from '../components/LanguageFilter'
import VideoSearch from '../components/VideoSearch'
import VideoList from '../components/VideoList'
import * as _ from 'lodash'

class App extends Component {

  render() {
    const { dispatch, visibleVideos, languageFilter, searchFilter } = this.props
    return (
      <div>
        <h1>Plum Village YouTube videos list</h1>
        <LanguageFilter filter={languageFilter}
          onFilterChange={nextFilter => {
            dispatch(setLanguageFilter(nextFilter))}
          }/>
        <VideoSearch onVideoSearch={search => {
          dispatch(setSearchFilter(search.target.value))}
        }/>
        <VideoList videos={visibleVideos} />
      </div>
    )
  }
}

const languageFilters = {
  'FR': ['fr ', 'francophone', 'french', 'francais', 'français'],
  'VN': ['vn ', 'vn)', 'in Vietnamese.', 'Vietnamese language', 'VN Retreat', 'Vietnamese Retreat', 'Vietnamese is on the left channel', 'Vietnamese and the English translation', 'Vietnamese.']
}

function selectVideos(videos, languageFilter = LanguageFilters.ALL, searchFilter = '') {
  let searchTerms = searchFilter.toLowerCase().split(',')
  let filteredVideos
  // if (searchFilter) {
  //   return _.filter(videos, curriedFilter(searchFilter.toLowerCase().split(',')))
  // }

  switch (languageFilter) {
    case LanguageFilters.ALL:
      if (searchTerms.length > 0 && searchTerms[0] !== '') {
        return _.filter(videos, curriedFilter(searchTerms))
      } else {
        return videos
      }
    case LanguageFilters.EN:
      filteredVideos = _.filter(videos, curriedReject(languageFilters.FR.concat(languageFilters.VN)))
      if (searchTerms.length > 0 && searchTerms[0] !== '') {
        return _.filter(filteredVideos, curriedFilter(searchTerms))
      } else {
        return filteredVideos
      }
    case LanguageFilters.FR:
      filteredVideos =  _.filter(videos, curriedFilter(languageFilters.FR))
      if (searchTerms.length > 0 && searchTerms[0] !== '') {
        return _.filter(filteredVideos, curriedFilter(searchTerms))
      } else {
        return filteredVideos
      }
    case LanguageFilters.VN:
      filteredVideos =  _.filter(videos, curriedFilter(languageFilters.VN))
      if (searchTerms.length > 0 && searchTerms[0] !== '') {
        return _.filter(filteredVideos, curriedFilter(searchTerms))
      } else {
        return filteredVideos
      }
  }
}

let filter = function (stringPatternList, video) {
  let content = video.title.toLowerCase() + video.description.toLowerCase()
  if (stringPatternList.length > 1) {
    let results = _.map(stringPatternList, (pattern) => {
      return content.includes(pattern.toLowerCase())
    })
    let result = _.reduce(results, (prev, next) => {
      return prev || next
    })
    if (result) {
      return video
    }
  } else {
    if (content.includes(stringPatternList[0].toLowerCase())) {
      return video
    }
  }
}

let curriedFilter = _.curry(filter)

let reject = function (stringPatternList, video) {
  let content = video.title.toLowerCase() + video.description.toLowerCase()
  let results = _.map(stringPatternList, (pattern) => {
    return !content.includes(pattern.toLowerCase())
  })
  let result = _.reduce(results, (prev, next) => {
    return prev && next
  })
  if (result) {
    return video
  }
}

let curriedReject = _.curry(reject)

function mapStateToProps(state) {
  const { videos } = state

  return {
    languageFilter: state.languageFilter,
    searchFilter: state.searchFilter,
    visibleVideos: selectVideos(state.videos, state.languageFilter, state.searchFilter)
  }
}

module.exports = connect(mapStateToProps)(App)
