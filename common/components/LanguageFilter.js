import React, { Component, PropTypes } from 'react'

export default class LanguageFilter extends Component {
  renderFilter(filter, language) {
    if (filter === this.props.filter) {
      return language
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {language}
      </a>
    )
  }

  render() {
    return (
      <div>
        <h1 className="ui header">Select a language</h1>
        <div className="ui divider"></div>
        <select className="ui dropdown" onChange={e => {
        e.preventDefault()
        this.props.onFilterChange(e.target.value)
      }}>
          <option value='ALL'>All</option>
          <option value='EN'>English</option>
          <option value='ZH'>English/Chinese</option>
          <option value='NL'>English/Dutch</option>
          <option value='DE'>English/German</option>
          <option value='IT'>English/Italian</option>
          <option value='TH'>English/Thai</option>
          <option value='FR'>French</option>
          <option value='VN'>Vietnamese</option>
        </select>
      </div>
    )
  }
}

LanguageFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,

  filter: PropTypes.oneOf([
    'ALL',
    'EN',
    'IT',
    'ZH',
    'NL',
    'DE',
    'FR',
    'TH',
    'VN'
  ]).isRequired
}
