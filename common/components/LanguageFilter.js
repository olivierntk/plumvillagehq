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
        <h2>Select a language:</h2>
        <ul>
          <li>{this.renderFilter('ALL', 'All')}</li>
          <li>{this.renderFilter('EN', 'English')}</li>
          <li>{this.renderFilter('ZH', 'English/Chinese')}</li>
          <li>{this.renderFilter('NL', 'English/Dutch')}</li>
          <li>{this.renderFilter('FR', 'French')}</li>
          <li>{this.renderFilter('DE', 'English/German')}</li>
          <li>{this.renderFilter('TH', 'English/Thai')}</li>
          <li>{this.renderFilter('VN', 'Vietnamese')}</li>
        </ul>
        <hr />
      </div>
    )
  }
}

LanguageFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'ALL',
    'EN',
    'ZH',
    'NL',
    'DE',
    'FR',
    'TH',
    'VN'
  ]).isRequired
}
