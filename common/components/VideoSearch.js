import React, { Component, PropTypes } from 'react'

export default class VideoSearch extends Component {
  render() {

    return (
      <div className="ui container">
        <h1 className="ui header">Search</h1>
        <div className="ui divider"></div>
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
        <br />
        <div>
          <p>Tips: You can try searching for a talk using many types of search. Some examples:</p>
          <ul>
            <li>Search by a topic: type 'interbeing' or 'impermanence' to list the dharma talks on a given topic</li>
            <li>Search by a retreat: type 'miracle of mindfulness' or 'art of suffering' to list the dharma talks related to the desired retreat</li>
            <li>Search by a dharma teacher: type 'Jina' or 'phap dung' to list the dharma talks given by a specific dharma teacher</li>
          </ul>
        </div>
      </div>
    )
  }
}

VideoSearch.propTypes = {
  onVideoSearch: PropTypes.func.isRequired
}

