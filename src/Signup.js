import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Signup extends Component {

  submitUser(e) {
    e.preventDefault();

    var data = {
      username: this.state.email,
      password: this.state.password
    }

    $.post('http://localhost:3000/api/user', {
      data: data
    })
    .fail(function() {
      console.log('Signup failed');
    });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Welcome to Ingredients 20/20</h2>
        </div>
        <form onSubmit={this.submitUser} >
          <input type="email" value={this.state.email} />
          <input type="password" value={this.state.password} />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default Signup;
