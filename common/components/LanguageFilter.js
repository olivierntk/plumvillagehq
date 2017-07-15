import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

export default class LanguageFilter extends Component {

  render() {
    return (
      <div>
        <h3 className="ui header">Select a language</h3>
        <div className="ui divider"></div>
        <select className="ui dropdown" id="languageDropdown" onChange={e => {
          e.preventDefault()
          $('#retreatDropdown').prop('selectedIndex', 0);
          $('#themeDropdown').prop('selectedIndex', 0);
          this.props.onFilterChange(e.target.value)
        }}>
          <option value='ALL' key={'All'}>All</option>
          <option value='EN' key={'EN'}>English</option>
          <option value='ZH' key={'ZH'}>English/Chinese</option>
          <option value='NL' key={'NL'}>English/Dutch</option>
          <option value='DE' key={'DE'}>English/German</option>
          <option value='IT' key={'IT'}>English/Italian</option>
          <option value='TH' key={'TH'}>English/Thai</option>
          <option value='FR' key={'FR'}>French</option>
          <option value='VN' key={'VN'}>Vietnamese</option>
        </select>
      </div>
    )
  }
}

LanguageFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
}
