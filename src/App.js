import React, { Component } from 'react';
import './style.css';


class CtrlInput extends Component {

  render() {
    return (
      <div>
      <button onClick={this.props.startClock}> Start </button>
      <button onClick={this.props.stopClock}> Stop </button>
      <button onClick={this.props.resetClock}> Reset </button>
      </div>
    );
  }
}


class Clock extends Component {

  render() {
    return (
      <div>
      <Text>{this.props.time}</Text>
      <p>Running: {this.props.status ? "Yes" : "No"}</p>
      </div>
    );
  }
}

// example of a stateless component
const Text = (props) => <h2>{props.children}</h2>


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      run: false,
      time: 0.00
    };

    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.clock = this.clock.bind(this);

  }

  handleKeyPress = (e) => {
     if (e.key === 'Enter') {
       this.addItem();
     }
  }

  startClock() {
    this.setState({
      run: true
    }, this.clock);

  }

  stopClock() {
    this.setState({
      run: false
    });
  }

  clock() {

    if(this.state.run){
      let time = this.state.time + .10;
      this.setState({
        time: time
      });

      // use recursion to increment time in 10 ms intervals
      setTimeout(() => this.clock(), 10);
    }

  }

  resetClock() {
    this.setState({
      run: false,
      time: 0
    });
  }

  render() {
    return (
      <div className="App">
        <Text>Stop Watch</Text>
        <Clock time={this.state.time.toFixed(2)} status={this.state.run}/>
        <CtrlInput startClock={this.startClock} stopClock={this.stopClock} resetClock={this.resetClock}/>
      </div>
    );
  }
}

export default App;
