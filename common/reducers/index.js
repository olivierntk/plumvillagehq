import { combineReducers } from 'redux'
import { SET_LANGUAGE_FILTER, LanguageFilters, SET_SEARCH_FILTER } from '../actions'
const { ALL } = LanguageFilters
import videos from './videos'

function languageFilter(state = ALL, action) {
  switch (action.type) {
    case SET_LANGUAGE_FILTER:
      return action.filter
    case SET_SEARCH_FILTER:
      return ALL
    default:
      return state
  }
}

function searchFilter(state = '', action) {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return action.filter
    default:
      return state
  }
}


const rootReducer = combineReducers({
  languageFilter,
  searchFilter,
  videos
})

export default rootReducer
