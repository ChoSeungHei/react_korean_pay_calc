import React, { Component,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './style/css/font.css';
import CalcContainer from './calc/CalcContainer';

class App extends Component {


  render() {
    return (
      <CalcContainer/>
    );
  }
}

export default App;