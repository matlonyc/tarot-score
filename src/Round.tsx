import * as React from 'react';
import Paper from 'material-ui/Paper';
import { MuiThemeProvider } from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

const theme = getMuiTheme(darkBaseTheme);
const style = {
  width: 800,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: '#00acc1',
};
const buttonStyle = {
  margin: 12,
};
const POINTS = [40, 30, 20, 10, 0];
const PETITE = 'petite';
const POUCE = 'pouce';
const GARDE = 'garde';
const GARDE_SANS = 'garde sans';
const GARDE_CONTRE = 'garde contre';
const PETIT_CHLEM = 'petit chlem';
const GRAND_CHLEM = 'grand chlem';
const CONTRATS = [{
  name: PETITE,
  value: 10
}, {
  name: POUCE,
  value: 20
}, {
  name: GARDE,
  value: 40
}, {
  name: GARDE_SANS,
  value: 80
}, {
  name: GARDE_CONTRE,
  value: 160
}, {
  name: PETIT_CHLEM,
  value: 320
}, {
  name: GRAND_CHLEM,
  value: 500
}];
const LOST = 'perdue';
const WON = 'gagnee';
const CONGRATS = 'Bravo!';
const TOO_BAD = 'Dommage!';

class Round extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      numberOfPlayers: props.playerNames.length,
      playerNames: props.playerNames,
      onNewRound: props.onNewRound,
      leaderName: '',
      partnerName: '',
      selectedContract: '',
      contracts: CONTRATS.map( (contrat) => contrat.name),
      wonLost: '',
      selectedPoints: 0,
      buttonLabel: ' ',
      buttonDisabled: true,
      stepIndex: 0,
      finished: false
    };
  }

  componentWillReceiveProps(props: any) {
    this.setState({
      numberOfPlayers: props.playerNames.length,
      playerNames: props.playerNames,
      onNewRound: props.onNewRound,
    });
    this.resetState();
  }

  resetState = () => {
    this.setState({
      leaderName: '',
      partnerName: '',
      selectedContract: '',
      contracts: CONTRATS.map( (contrat) => contrat.name),
      wonLost: '',
      selectedPoints: 0,
      buttonLabel: ' ',
      buttonDisabled: true,
      stepIndex: 0,
      finished: false,
    });
  }

  onDone = () => {
    const selectedContract = CONTRATS.find(
      (elt) => elt.name === this.state.selectedContract);
    const contractValue = (selectedContract ? selectedContract.value : 0) +
      this.state.selectedPoints;
    const sign = this.state.wonLost === WON ? 1 : -1;
    let scores = {};

    scores[this.state.leaderName] = 0;
    scores[this.state.partnerName] = 0;
    this.state.playerNames.map( (playerName: string) => {
      if (playerName === this.state.leaderName) {
        scores[playerName] += 2 * contractValue * sign;
      } else if (playerName === this.state.partnerName) {
        scores[playerName] += contractValue * sign;
      } else {
        scores[playerName] = contractValue * sign * -1;
      }
    });

    this.resetState();
    this.state.onNewRound(scores);
  }

  selectLeader = (event: any, index: number, leaderName: string) => {
    this.setState({
      leaderName: leaderName
    });
  }

  selectPartner = (event: any, index: number, partnerName: string) => {
    this.setState({
      partnerName: partnerName
    });
  }

  selectContract = (event: any, index: number, name: string) => {
    this.setState({
      selectedContract: name
    });
  }

  selectWonLost = (event: any, index: number, name: string) => {
    this.setState({
      wonLost: name,
      buttonLabel: name === WON ? CONGRATS : TOO_BAD,
      buttonDisabled: false
    });
  }

  selectPoints = (event: any, index: number, selectedPoints: number) => {
    this.setState({
      selectedPoints: selectedPoints
    });
  }

  renderPlayerList = () => {
    return this.state.playerNames.map( (playerName: string) => {
      return (<MenuItem
                key={playerName}
                value={playerName}
                primaryText={playerName}
              />);
    });
  }

  renderSelectLeader = () => {
    return (
      <DropDownMenu
        value={this.state.leaderName}
        onChange={this.selectLeader}>
        {this.renderPlayerList()}
      </DropDownMenu>
    );
  }

  renderSelectPartner = () => {
    return (
      <DropDownMenu
        value={this.state.partnerName}
        onChange={this.selectPartner}>
        {this.renderPlayerList()}
      </DropDownMenu>
    );
  }

  renderContractList = () => {
    return this.state.contracts.map( (name: string) => {
      return (<MenuItem key={name} value={name} primaryText={name} />);
    });
  }

  renderSelectContract = () => {
    return (
      <DropDownMenu
        value={this.state.selectedContract}
        onChange={this.selectContract}>
        {this.renderContractList()}
      </DropDownMenu>
    );
  }

  renderWonLost = () => {
      return (<DropDownMenu
        value={this.state.wonLost}
        onChange={this.selectWonLost}>
        <MenuItem value={WON} primaryText={WON}/>
        <MenuItem value={LOST} primaryText={LOST}/>
      </DropDownMenu>);
  }

  renderPointList = () => {
    return POINTS.map( (point: number) => {
      return (<MenuItem key={point} value={point} primaryText={point} />);
    });
  }

  renderPoints = () => {
    return (
      <DropDownMenu
        value={this.state.selectedPoints}
        onChange={this.selectPoints}>
        {this.renderPointList()}
      </DropDownMenu>
    );
  }

  renderDone = () => {
    return (<RaisedButton
              label={this.state.buttonLabel}
              primary={true}
              style={buttonStyle}
              disabled={this.state.buttonDisabled}
              disabledBackgroundColor="#00acc1"
              onClick={this.onDone.bind(this)}/>);
  }

  getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return this.renderSelectLeader();
      case 1:
        return this.renderSelectPartner();
      case 2:
        return this.renderSelectContract()
      case 3:
        return this.renderWonLost()
      case 4:
        return this.renderPoints()
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state;

    if (stepIndex === 4) {
      this.onDone();
      this.resetState();
    } else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 5,
    });
  }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  render() {
    const contentStyle = {margin: '0 16px'};
    const stepIndex = this.state.stepIndex;

    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <Paper style={style} zDepth={5} rounded={false}>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Qui a pris la main ?</StepLabel>
              </Step>
              <Step>
                <StepLabel>Avec qui ?</StepLabel>
              </Step>
              <Step>
                <StepLabel>Quel contrat ?</StepLabel>
              </Step>
              <Step>
                <StepLabel>Resultat ?</StepLabel>
              </Step>
              <Step>
                <StepLabel>Par combien de points ?</StepLabel>
              </Step>
            </Stepper>
            <div style={contentStyle}>
            {this.state.finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Retour"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 4 ? 'Calculer' : 'Suivant'}
                  primary={true}
                  onClick={this.handleNext}
                />
              </div>
            </div>
          )}

            </div>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Round;
