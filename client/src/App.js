import React, { Component } from 'react';
import ExportCSV from './ExportCSV.js';
import GS from './google_spread.js';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
        data: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState(res))
      .catch(console.error);
  }

  callApi = async () => {
    const resp = await fetch('/api');

    window._resp = resp;

    let text = await resp.text();

    let data = null;
    try {
      data = JSON.parse(text); // cannot call both .json and .text - await resp.json();
    } catch (e) {
      console.err(`Invalid json\n${e}`);
    }

    if (resp.status !== 200) {
      throw Error(data ? data.message : 'No data');
    }

    return data;
  };

  handleCallback = (childData) => {
      this.setState((prevState) => {
          return {
              data: childData
          };
      })
  }

  render() {
    const {data} = this.state;
    return (
      <div className="App">
          <h1>Tracking</h1>
          <ExportCSV parentCallback={this.handleCallback}/>
          <GS parentToChild={data}/>
      </div>
    );
  }
}

export default App;
