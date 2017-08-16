import React, { Component } from 'react';
import './App.css';
import {bindAll} from 'lodash';
import $ from 'jquery';
// import SavedItems from './SavedItems';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchResName: '',
      searchResLink: '',
<<<<<<< 3f2a175283b87a0cb4bd83a9c44041d53aaf2652
      data_uri: null,
      processing: false,
=======
>>>>>>> uninstall webcam
      pastSearches: []
    };

    bindAll(this, 'handleFile', 'handleSearch', 'searchDb', 'renderSearch');
    // this.handleSearch = this.handleSearch.bind(this);
    // this.searchDb = this.searchDb.bind(this);
    // this.renderSearch = this.renderSearch.bind(this);
  }

  logOutUser() {
    //probs need some kind of server resp for ending session
    console.log('log out button clicked');
    this.props.history.push('/login');
  }

  renderPastSearches() {
    console.log('my saved items btn was clicked');

    var data = {
      userID: this.props.history.userID
    }
    //here we need to create a get method to populate pastSearches array
    console.log('line 34', data.userID);
    $.post('/api/pastSearches', {
      data: data
    })
    .done((items) => {
      console.log('items received');
      //on sucess we set the new state
      console.log(items);
      this.setState({
        pastSearches: items
      });
    })
    .fail(() => {
      console.log('failed getting items');
    });

  }

  handleSearch(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };

    reader.readAsDataURL(file);
  }

  renderSearch(searchResName, link) {
    this.setState({
      searchResName: searchResName,
      searchResLink: link || ''
    });
  }

  searchDb(e) {
    e.preventDefault();

    var lowerCaseSearch = this.state.search.toLowerCase();
    var userID = this.props.history.userID;

    var data = {
      ingredient: lowerCaseSearch,
      userID: userID
    }

    $.post('/api/ingredients', {
      data: data
    })
    .done((str) => {
      this.renderSearch(str.name, str.link);
    })
    .fail((str) => {
      this.renderSearch(str.responseText);
    })

  }

  googleAPIsearch() {

  }
  
  render() {
    return (
      <div>
        <div>
          <div onClick={this.logOutUser.bind(this)}>LOG OUT</div>
        </div>
        <div>
          <h2>Search Ingredients 20/20</h2>
        </div>

        <form onSubmit={this.searchDb}>
          <input type="text" value={this.state.search} placeholder="Search Database for Ingredient"
              onChange={this.handleSearch}/>
          <input type="submit" value="Submit"/>
        </form>

        <form method='post' action='/api/upload' encType='multipart/form-data'>
          <input type='file' name='image' onChange={this.handleFile} />
          <input type="submit" value="Submit"/>
        </form>


        <div>
          {this.state && this.state.searchResLink ?
            <div>{this.state.searchResName + ' found in database! - '}
              <a href={this.state.searchResLink} target="_blank">{this.state.searchResLink}</a>
            </div> :
            <div>{this.state.searchResName}</div>
          }
        </div>
        <div>
          <button onClick={this.renderPastSearches.bind(this)}>
            MY SAVED ITEMS
          </button>
          <div>
            {this.state.pastSearches}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
