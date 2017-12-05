import * as React from 'react';
import './App.css';
import EnterPlayers from './EnterPlayers';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jouons au tarot !</h2>
        </div>
        <EnterPlayers/>
      </div>
    );
  }
}

export default App;
