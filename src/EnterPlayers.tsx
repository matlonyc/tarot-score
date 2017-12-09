import * as React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider, lightBaseTheme} from "material-ui/styles";
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const style = {
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const buttonStyle = {
  margin: 12,
};

class EnterPlayers extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      numberOfPlayers: props.numberOfPlayers,
      playerNames: Array(props.numberOfPlayers).fill(''),
      onEnterPlayersReady: props.onReady
    };
  }

  componentWillReceiveProps(props: any) {
    this.setState({
      numberOfPlayers: props.numberOfPlayers,
      playerNames: Array(props.numberOfPlayers).fill(''),
      onEnterPlayersReady: props.onReady
    });
  }

  onChange = (event: any, newValue: string) => {
    const index = parseInt(event.target.name);
    const updatedNames = this.state.playerNames.map(
      (name: string, idx: number) => idx === (index - 1) ? newValue : name
    );

    this.setState({
      playerNames: updatedNames
    });
  }

  onReady = () => {
    this.state.onEnterPlayersReady(this.state.playerNames);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <Paper style={style} zDepth={5} rounded={false}>
            <AppBar title="Enter the player names" showMenuIconButton={false}/>
            <List>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 1"
                  floatingLabelFixed={true}
                  name="1"
                  onChange={this.onChange.bind(this)}
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 2"
                  floatingLabelFixed={true}
                  name="2"
                  onChange={this.onChange.bind(this)}
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 3"
                  floatingLabelFixed={true}
                  name="3"
                  onChange={this.onChange.bind(this)}
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 4"
                  floatingLabelFixed={true}
                  name="4"
                  onChange={this.onChange.bind(this)}
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 5"
                  floatingLabelFixed={true}
                  name="5"
                  onChange={this.onChange.bind(this)}
                /><br/>
              </ListItem>
              <ListItem>
                <RaisedButton
                  label="Ready!"
                  primary={true}
                  style={buttonStyle}
                  onClick={this.onReady.bind(this)}
                />
              </ListItem>
            </List>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
};

export default EnterPlayers;
