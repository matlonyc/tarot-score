import * as React from 'react';
import './App.css';
import EnterPlayers from './EnterPlayers';
import Game from './Game';

const logo = require('./logo.svg');

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      numberOfPlayers: 5,
      playerNames: []//['Mathieu', 'Krisztina', 'Madeleine', 'Viktor', 'Lucille'],
    };
  }

  onEnterPlayersReady = (playerNames: string[]) => {
    this.setState({
      playerNames: playerNames
    });
  }

  buildPlayerList = () => {
    if (this.state.playerNames.length === 0) {
      return (
        <EnterPlayers
          numberOfPlayers={this.state.numberOfPlayers}
          onReady={this.onEnterPlayersReady}
        />
      );
    } else {
      return (
        <Game
          playerNames={this.state.playerNames}
        />
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
        {this.buildPlayerList()}
      </div>
    );
  }
}

export default App;
