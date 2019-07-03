import React, { Component } from 'react'
import data from './data'
import './app.css'

export default class App extends Component {
  state = {
    search: '',
    visible: 5,
  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 4 }
    })
  }

  filterSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
    this.setState({ visible: 5 })
  }

  render() {
    let filterBooks = data.filter(data => {
      return (
        data.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      )
    })

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Search by Title.."
            className="search"
            value={this.state.search}
            onChange={this.filterSearch.bind(this)}
          />

          {filterBooks.slice(0, this.state.visible).map((data, name) => (
            <li>
              <a href={data.uri}>{data.name}</a>
            </li>
          ))}
        </div>

        {this.state.visible < filterBooks.length && (
          <button
            className="button"
            onClick={this.loadMore.bind(this)}
            type="button">
            Load more
          </button>
        )}
      </div>
    )
  }
}
