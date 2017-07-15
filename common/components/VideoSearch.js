import React, { Component, PropTypes } from 'react'

export default class VideoSearch extends Component {
  render() {

    return (
      <div className="ui container">
        <div className="ui search">
          <div className="ui icon input">
            <input type="text"
              className="prompt"
              placeholder="Search..."
              value={this.props.filterText}
              ref="filterTextInput"
              onChange={this.props.onVideoSearch}
            />
            <i className="search icon"></i>
          </div>
        </div>
      </div>
    )
  }
}

VideoSearch.propTypes = {
  onVideoSearch: PropTypes.func.isRequired
}

