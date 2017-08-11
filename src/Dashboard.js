import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchDb = this.searchDb.bind(this);
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value
    });
  }

  searchDb(e) {
    e.preventDefault();

    var lowerCaseSearch = this.state.search.toLowerCase();

    var data = {
      ingredient: lowerCaseSearch
    }

    $.post('/api/ingredients', {
      data: data
    })
    .done((str) => {
      console.log('received', str)
    })

  }
  render() {
    return (
      <div>
        <div>
          <h2>Search Ingredients 20/20</h2>
        </div>

        <form onSubmit={this.searchDb}>
          <input type="text" value={this.state.search} placeholder="Search Ingredient"
              onChange={this.handleSearch}/>
          <input type="submit" value="Submit"/>
        </form>

      </div>
    );
  }
}

export default Dashboard;