import React, { Component, PropTypes } from 'react'

export default class Filter extends Component {
  renderFilter(filter, language) {
    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        this.props.onLanguageFilterChange(filter)
      }}>
        {language}
      </a>
    )
  }

  render() {
    return (
      <ul>
        <li>{this.renderFilter('ALL', 'All')}</li>
        <li>{this.renderFilter('EN', 'English')}</li>
        <li>{this.renderFilter('FR', 'French')}</li>
        <li>{this.renderFilter('VN', 'Vietnamese')}</li>
      </ul>
    )
  }
}

Filter.propTypes = {
  onLanguageFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'ALL',
    'EN',
    'FR',
    'VN',
    'CH'
  ]).isRequired
}
