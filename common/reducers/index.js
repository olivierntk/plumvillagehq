import { combineReducers } from 'redux'
import { SET_LANGUAGE_FILTER, LanguageFilters } from '../actions'
const { ALL } = LanguageFilters
import videos from './videos'

function languageFilter(state = ALL, action) {
  switch (action.type) {
    case SET_LANGUAGE_FILTER:
      return action.filter
    default:
      return state
  }
}


const rootReducer = combineReducers({
  languageFilter,
  videos
})

export default rootReducer
