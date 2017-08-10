import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Ingredients 20/20</h2>
        </div>
        <p className="App-intro">
          YO YO YO THIS IS MY APP
        </p>
        <button className="login">LOGIN</button>
        <button className="signup">SIGNUP</button>
      </div>
    );
  }
}

export default App;
