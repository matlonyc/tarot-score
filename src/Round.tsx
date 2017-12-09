import * as React from 'react';

class Round extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      numberOfPlayers: props.playerNames.length,
      playerNames: props.playerNames,
    };
  }

  componentWillReceiveProps(props: any) {
    this.setState({
      numberOfPlayers: props.playerNames.length,
      playerNames: props.playerNames,
    });
  }

  render() {
    return (
      <div>
        New Game!
      </div>
    );
  }
};

export default Round;
