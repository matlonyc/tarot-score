import * as React from 'react';
import './App.css';
import EnterPlayers from './EnterPlayers';

const logo = require('./logo.svg');

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      numberOfPlayers: 5,
      playerNames: [],
    };
  }

  onEnterPlayersReady = (playerNames: string[]) => {
    this.setState({
      playerNames: playerNames
    });
  }

  buildPlayerList = () => {
    if (this.state.playerNames.length == 0) {
      return (
        <EnterPlayers
          numberOfPlayers={this.state.numberOfPlayers}
          onReady={this.onEnterPlayersReady}
        />
      );
    } else {
      debugger;
      return (
        <div>Hello! {this.state.playerNames[0]}</div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jouons au tarot !</h2>
        </div>
        {this.buildPlayerList()};
      </div>
    );
  }
}

export default App;
