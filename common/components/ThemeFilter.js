import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

export default class ThemeFilter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3 className="ui header">Select a theme</h3>
        <div className="ui divider"></div>
        <select className="ui dropdown" id="themeDropdown" onChange={e => {
          e.preventDefault()
          $('#retreatDropdown').prop('selectedIndex', 0);
          $('#languageDropdown').prop('selectedIndex', 0);
          this.props.onFilterChange(e.target.value)
        }}>
          <option value=''>Select a theme</option>
        {
          this.props.themes.map(theme => {
            return (<option value={theme.keywords} key={theme.name}>{theme.name}</option>)
          })
        }
        </select>
      </div>
    )
  }
}

ThemeFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  themes: PropTypes.array.isRequired
}
