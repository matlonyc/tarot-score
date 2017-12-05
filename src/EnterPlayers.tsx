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

class EnterPlayers extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      numberOfPlayers: 5,
      playerNames: []
    };
  }

  componentWillReceiveProps(props: any) {

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
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 2"
                  floatingLabelFixed={true}
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 3"
                  floatingLabelFixed={true}
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 4"
                  floatingLabelFixed={true}
                /><br/>
              </ListItem>
              <ListItem>
                <TextField
                  hintText="Enter player name"
                  floatingLabelText="Player 5"
                  floatingLabelFixed={true}
                /><br/>
              </ListItem>
              <ListItem>
                <RaisedButton
                  label="Ready!"
                  primary={true}
                  style={buttonStyle}
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
