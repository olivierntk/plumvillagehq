import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import $ from 'jquery';

export default class RetreatFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let defaultOption = {};

    return (
      <div>
        <h3 className="ui header">Select a retreat</h3>
        <div className="ui divider"></div>
        <select className="ui dropdown" id="retreatDropdown" onChange={e => {
          e.preventDefault()
          $('#languageDropdown').prop('selectedIndex', 0);
          $('#themeDropdown').prop('selectedIndex', 0);
          this.props.onFilterChange(e.target.value)
        }}>
          <option value=''>Select a retreat</option>
        {
          this.props.retreats.map(retreat => {
            return (<option value={retreat.keywords} key={retreat.name}>{retreat.name}</option>);
          })
        }
        </select>
      </div>
    )
  }
}

RetreatFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  retreats: PropTypes.array.isRequired
}
