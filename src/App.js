import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      keyword: '' ,
      open: false ,
      dialogContent: ''
    };
    this.txtChange = this.txtChange.bind(this);
    this.btnClick = this.btnClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  txtChange(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  btnClick() {
    axios.post('http://203.151.85.73:7777/twitter/addQuery',  {
      query: this.state.keyword
    }).then((response) => {
      console.log(response);
      this.handleOpen();
      this.setState({
        dialogContent: 'Sending is complete'
      });
    })
    .catch((error) => {
      this.setState({
        dialogContent: error
      });
      this.handleOpen();
    })
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  render() {
    const style = {
      width: '90%',
      margin:'1% 5% 1%',
      textAlign: 'center',
      display: 'inline-block',
    };

    const head = {
      padding:"10px 0px 10px 0px",
      textAlign:"center",
      color:"#FFFFFF",
      backgroundColor:"#00BCD4"
    };

    const plain = {
      padding: '10px'
    };

    const actions = [
      <FlatButton
        label="close"
        primary={true}
        onTouchTap={this.handleClose}/>
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Paper style={style}>
          <div style={head}>
            Query Adding
          </div>
          <div style={plain}>
            <TextField  hintText="Please enter keyword." floatingLabelText="Keyword" fullWidth={true} onChange={this.txtChange}></TextField>
            <TextField hintText='Please enter a latitude' floatingLabelText='Latitude' fullWidth={true}></TextField>
            <TextField hintText='Please enter a longitude' floatingLabelText='Longitude' fullWidth={true}></TextField>
          </div>
          <div style={plain}>
            <RaisedButton label="send" secondary={true} onClick={this.btnClick}></RaisedButton>
          </div>
          <Dialog title="Adding" actions={actions} modal={true} open={this.state.open}>
            {this.state.dialogContent}
          </Dialog>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
