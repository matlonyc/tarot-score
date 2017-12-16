import * as React from 'react';
import Score from './Score';
import Round from './Round';

class Game extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      numberOfPlayers: props.playerNames.length,
      playerNames: props.playerNames,
      scores: [this.getRoundZero(props.playerNames)],
      rounds: [],
      roundNumber: 0
    };
  }

  getRoundZero(playerNames: string[]) {
    let roundZero = {
      roundNumber: 0
    };

    playerNames.map((name: string) => {
      roundZero[name] = 0
    });
    return roundZero;
  }

  componentWillReceiveProps(props: any) {
    this.setState({
      numberOfPlayers: props.playerNames.length,
      playerNames: props.playerNames,
      scores: [this.getRoundZero(props.playerNames)],
    });
  }

  onNewRound = (roundScores: any) => {
    const newRoundNumber = this.state.roundNumber + 1;
    const currentScores = this.state.scores.find(
      (elt: any) => elt.roundNumber === this.state.roundNumber);
    let newScores = {
      roundNumber: newRoundNumber
    };

    this.state.playerNames.map((playerName: string) => {
        newScores[playerName] = currentScores[playerName]
          + roundScores[playerName];
    });
    this.setState({
      scores: this.state.scores.concat([newScores]),
      roundNumber: newRoundNumber,
    });
  }

  render() {
    return (
      <div>
        <Round
          playerNames={this.state.playerNames}
          onNewRound={this.onNewRound.bind(this)}
        />
        <Score scores={this.state.scores}/>
      </div>
    );
  }
};

export default Game;
