import React, { Component } from 'react';
import './App.css';
import {bindAll} from 'lodash';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
// import SavedItems from './SavedItems';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchResName: '',
      searchResLink: '',
      data_uri: null,
      processing: false,
      passed: 'No Flagged Ingredients, feel free to gobble this up!',
      pastSearches: [],
      username: localStorage.getItem('username')
    };

    bindAll(this, 'renderPastSearches', 'handleFile', 'handleSearch', 'handleSubmit', 'searchDb', 'renderSearch', 'logout');
  }

  logout() {
    this.props.auth.logout();
    this.props.history.push('/');
  }

  renderPastSearches() {
    console.log('my saved items btn was clicked');

    var data = {
      username: this.state.username
    }
    //here we need to create a get method to populate pastSearches array

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

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;
    var data = {
      data_uri: this.state.data_uri,
      filename: this.state.filename,
      filetype: this.state.filetype
    }

    $.ajax({
      url: '/api/image',
      type: 'POST',
      data: data,
      dataType: 'json'
    })
    .done(function(data){
      console.log(data);
      _this.setState({
        passed: data
      });
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
    var username = this.state.username;

    var data = {
      ingredient: lowerCaseSearch,
      username: username
    }

    $.post('/api/ingredients', {
      data: data
    })
    .done((obj) => {
      this.renderSearch(obj.name, obj.link);
    })
    .fail((obj) => {
      this.renderSearch(obj.responseText);
    })

  }

  render() {
    console.log(this.props.auth);
    const {isAuthenticated } = this.props.auth;

    return (
      <div>
        {
          !isAuthenticated() &&
          <h1>Please log in to gain access to this page</h1>
        }
        {
        isAuthenticated() && (
        <div>
          <div>
            <Button bsStyle="default" className="Logout-btn" onClick={this.logout}>LOG OUT</Button>
          </div>
          <div>
            <h2>Search Ingredients 20/20</h2>
          </div>

          <form onSubmit={this.searchDb}>
            <input type="text" value={this.state.search} placeholder="Search Database for Ingredient"
                onChange={this.handleSearch}/>
            <input type="submit" value="Submit"/>
          </form>

        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
          <input type='file' name='image' onChange={this.handleFile} />
          <input type="submit" value="Submit"/>
        </form>
          <img src={this.state.data_uri} height="200" alt=""></img>
          <div>
            {this.state && this.state.searchResLink ?
              <div>{this.state.searchResName + ' found in database! - '}
                <a href={this.state.searchResLink} target="_blank">{this.state.searchResLink}</a>
              </div> :
              <div>{this.state.searchResName}</div>
            }
          </div>

          <div>
            <button onClick={this.renderPastSearches}>
              MY SAVED ITEMS
            </button>
            <div>
              {this.state.pastSearches.map((ingredient) => (
                <search
                  key={ingredient._id}
                >{ingredient.name + ' - ' + ingredient.link}<br/></search>
              )
              )}
            </div>
          </div>
        </div>)}
      </div>
    );
  }
}

export default Dashboard;
