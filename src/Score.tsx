import * as React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Score extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      scores: props.scores,
      columns: this.getColumns(props.scores),
    };
  }

  componentWillReceiveProps(props: any) {
    this.setState({
      scores: props.scores,
      columns: this.getColumns(props.scores),
    });
  }

  getColumns(scores: any) {
    const playerNames = Object.keys(scores[0]);

    return playerNames.map((playerName: string) => {
          return {
            Header: playerName,
            accessor: playerName
          };
        }
      )
  }

  renderScores = () => {
    return this.state.scores.map(
      (score: {
        playerName: string,
        points: number,
        roundNumber: number
      }) => {
        return (<div
                  key={score.playerName + score.roundNumber}
                >{score.playerName} {score.points}</div>);
      });
  }

  render() {
    return (
      <div>
        <ReactTable
          columns={this.state.columns}
          data={this.state.scores}
        />
        {this.renderScores()}
      </div>
    );
  }
}

export default Score;
