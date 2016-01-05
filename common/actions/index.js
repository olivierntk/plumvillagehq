export const SET_LANGUAGE_FILTER = 'SET_LANGUAGE_FILTER'
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER'

/*
 * other constants
 */

export const LanguageFilters = {
  ALL: 'ALL',
  EN: 'EN',
  DE: 'DE',
  FR: 'FR',
  IT: 'IT',
  NL: 'NL',
  TH: 'TH',
  VN: 'VN',
  ZH: 'ZH'
}

export function setLanguageFilter(filter) {
  return { type: SET_LANGUAGE_FILTER, filter }
}

export function setSearchFilter(filter) {
  return { type: SET_SEARCH_FILTER, filter }
}
