import React, { Component, PropTypes } from 'react'

export default class VideoSearch extends Component {
  // handleChange () {
  //   this.props.onVideoSearch(
  //     this.refs.filterTextInput.value
  //   )
  // }

  render() {

    return (
      <div>
        <h2>Try your luck!</h2>
         <form>
            <input type="text"
              placeholder="Search..."
              value={this.props.filterText}
              ref="filterTextInput"
              onChange={this.props.onVideoSearch}
            />
          </form>

          <div>
            <p>Tips: You can try searching for a talk using many types of search. Some examples:</p>
            <ul>
              <li>Search by a topic: type 'interbeing' or 'impermanence' to list the dharma talks on a given topic</li>
              <li>Search by a retreat: type 'miracle of mindfulness' or 'art of suffering' to list the dharma talks related to the desired retreat</li>
              <li>Search by a dharma teacher: type 'Jina' or 'phap dung' to list the dharma talks given by a specific dharma teacher</li>
            </ul>
          </div>
        <hr />
      </div>
    )
  }
}

VideoSearch.propTypes = {
  onVideoSearch: PropTypes.func.isRequired
}

