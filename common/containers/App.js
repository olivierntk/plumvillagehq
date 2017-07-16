import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LanguageFilters, setLanguageFilter, clearLanguageFilter, setSearchFilter, clearSearchFilter, setThemeFilter, setRetreatFilter } from '../actions'
import LanguageFilter from '../components/LanguageFilter'
import RetreatFilter from '../components/RetreatFilter'
import ThemeFilter from '../components/ThemeFilter'
import VideoSearch from '../components/VideoSearch'
import VideoList from '../components/VideoList'
import * as _ from 'lodash'
import $ from 'jquery'

class App extends Component {

  componentDidMount() {
    $('#aboutLink').click((e) => {
      $('.ui.modal').modal('show');
    });
  }

  render() {
    const { dispatch, visibleVideos, languageFilter, searchFilter, retreatList, themeList } = this.props

    const retreats = retreatList.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });

    const themes = themeList.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });

    return (
      <div className="ui container">
        <br /><br />
        <div className="ui two column grid">
          <a id="findACommunity" href="http://www.mindfulnessbell.org/directory/"  target="_blank">Find a community to practice with</a>
          <br /><br />
        </div>

        <div className="ui two column centered grid">
          <h1>Plum Village YouTube dharma talks</h1>
          <VideoSearch onVideoSearch={search => {
            dispatch(clearSearchFilter());
            dispatch(clearLanguageFilter());
            $('#languageDropdown').prop('selectedIndex', 0);
            $('#retreatDropdown').prop('selectedIndex', 0);
            $('#themeDropdown').prop('selectedIndex', 0);
            dispatch(setSearchFilter(search.target.value))}
          }/>
          <br />
          <br />
          <h2>--- Or use one of the filters ---</h2>
          <br />
          <br />
        </div>

        <div className="ui grid">
          <div className="three column row">
            <div className="column">
              <LanguageFilter filter={languageFilter}
                onFilterChange={nextFilter => {
                  dispatch(clearSearchFilter())
                  dispatch(setLanguageFilter(nextFilter))}
                }
              />
            </div>
            <div className="column">
              <RetreatFilter retreats={retreats} currentFilter={searchFilter}
                onFilterChange={nextFilter => {
                  dispatch(clearLanguageFilter())
                  dispatch(setRetreatFilter(nextFilter))}
                }
              />
            </div>
            <div className="column">
              <ThemeFilter themes={themeList} currentFilter={searchFilter}
                onFilterChange={nextFilter => {
                  dispatch(clearLanguageFilter())
                  dispatch(setThemeFilter(nextFilter))}
                }
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <VideoList videos={visibleVideos} />
        <div className="ui divider"></div>
        <br /><br />
      </div>
    )
  }
}

const languageFilters = {
  'DE': ['EIAB German', 'german retreat'],
  'FR': ['fr ', 'francophone', 'french', 'francais', 'français'],
  'IT': ['Italian'],
  'NL': ['EIAB Dutch', 'dutch', 'dutch retreat'],
  'TH': ['Applied Ethics', 'Bangkok'],
  'VN': ['vn ', 'vn)', 'in Vietnamese.', 'Vietnamese language',
          'VN Retreat', 'Vietnamese Retreat', 'Vietnamese is on the left channel',
          'Vietnamese and the English translation', 'Vietnamese.', 'Tiếng Việt'],
  'ZH': ['Hong Kong']
}

const retreatList = [
  {
    name: 'Art of suffering',
    keywords: ['Art of suffering']
  },
  {
    name: 'Wake Up ',
    keywords: ['Wake Up']
  },
  {
    name: 'Finding Our True Home',
    keywords: ['Finding Our True Home']
  },
  {
    name: '2017 Summer Family Retreat',
    keywords: ['2017 Summer Family Retreat']
  },
  {
    name: 'The Miracle of Mindfulness Retreat',
    keywords: ['The Miracle of Mindfulness Retreat']
  },
  {
    name: 'Health and Wellness Retreat',
    keywords: ['Health and Wellness Retreat']
  },
  {
    name: 'Earth Retreat',
    keywords: ['Earth Retreat']
  },
  {
    name: 'People of color',
    keywords: ['People of color']
  },
  {
    name: 'Educators Retreat',
    keywords: ['Educators Retreat', 'Mindfulness Retreat for Educators']
  },
  {
    name: 'Applied Ethics Retreat',
    keywords: ['Applied Ethics Retreat']
  },
  {
    name: 'OI retreat',
    keywords: ['OI retreat']
  },
  {
    name: 'BCM Holiday retreat',
    keywords: ['BCM Holiday retreat']
  },
  {
    name: 'Autumn Retreat',
    keywords: ['Autumn Retreat', 'Autumn Opening']
  },
  {
    name: 'Vulture Peak Gathering',
    keywords: ['Vulture Peak Gathering']
  },
  {
    name: '2015 - Breathe it\'ll be okay',
    keywords: ['DPM EN']
  },
  {
    name: 'The time is now',
    keywords: ['time is now']
  },
  {
    name: 'Retraite Francophone',
    keywords: ['Retraite Francophone']
  },
  {
    name: 'Cooking retreat',
    keywords: ['Cooking retreat']
  },
  {
    name: '2016 - Winter Retreat',
    keywords: ['Winter Retreat - 2016']
  }
];

const themeList = [
  {
    name: 'The Four Noble Truths',
    keywords: ['Four Noble Truths']
  },
  {
    name: 'The Noble Eightfold Path',
    keywords: ['Right Livelihood', 'Right Action', 'Right Speech', 'Right Concentration', 'Right Thinking', 'Right View', 'Right Diligence']
  },
  {
    name: 'The Four Foundations of Mindfulness',
    keywords: ['Four Establishments of Mindfulness', 'foundation']
  },
  {
    name: 'Beginning Anew',
    keywords: ['Beginning Anew']
  },
  {
    name: 'The Five Mindfulness Trainings',
    keywords: ['mindfulness trainings']
  },
  {
    name: 'Compassion',
    keywords: ['compassion']
  },
  {
    name: 'The Inner Child',
    keywords: ['inner child']
  },
  {
    name: 'The Five Powers',
    keywords: ['The Five Powers']
  }
];

function selectVideos(videos, languageFilter, searchFilter = '') {
  let searchTerms = searchFilter.toLowerCase().split(',')
  let filteredVideos

  switch (languageFilter) {
    case LanguageFilters.ALL:
      if (searchTerms.length > 0 && searchTerms[0] !== '') {
        return _.filter(videos, curriedFilter(searchTerms))
      } else {
        return videos
      }
      return getFilterVideos(videos, languageFilters.ALL, searchTerms)
    case LanguageFilters.DE:
      return getFilterVideos(videos, languageFilters.DE, searchTerms)
    case LanguageFilters.EN:
      filteredVideos = _.filter(videos, curriedReject(languageFilters.FR.concat(languageFilters.VN)))
      return filteredVideos

      if (searchTerms.length > 0 && searchTerms[0] !== '') {
        return _.filter(filteredVideos, curriedFilter(searchTerms))
      } else {
        return filteredVideos
      }
    case LanguageFilters.FR:
      return getFilterVideos(videos, languageFilters.FR, searchTerms)
    case LanguageFilters.IT:
      return getFilterVideos(videos, languageFilters.IT, searchTerms)
    case LanguageFilters.NL:
      return getFilterVideos(videos, languageFilters.NL, searchTerms)
    case LanguageFilters.TH:
      return getFilterVideos(videos, languageFilters.TH, searchTerms)
    case LanguageFilters.VN:
      return getFilterVideos(videos, languageFilters.VN, searchTerms)
    case LanguageFilters.ZH:
      return getFilterVideos(videos, languageFilters.ZH, searchTerms)
  }
}

function getFilterVideos (videos, filter, searchTerms) {
  let filteredVideos =  _.filter(videos, curriedFilter(filter))
  if (searchTerms.length > 0 && searchTerms[0] !== '') {
    return _.filter(filteredVideos, curriedFilter(searchTerms))
  } else {
    return filteredVideos
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
    retreatList: retreatList,
    themeList: themeList,
    searchFilter: state.searchFilter,
    visibleVideos: selectVideos(state.videos, state.languageFilter, state.searchFilter)
  }
}

module.exports = connect(mapStateToProps)(App)
