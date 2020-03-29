import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      counterDisplayText: 'The counter is currently',
    }
  }
  handleIncrementButton = () => {
    this.setState({ counter: this.state.counter + 1, counterDisplayText: 'The counter is currently' })
  }

  handleDecrementButton = () => {
    this.state.counter !== 0
      ? this.setState({ counter: this.state.counter - 1, counterDisplayText: 'The counter is currently' })
      : this.setState({ counterDisplayText: 'Counter cannot go below' })
  }
  render() {
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>{this.state.counterDisplayText} {this.state.counter}</h1>
        <button data-test='increment-button' onClick={this.handleIncrementButton}>+</button>
        <button data-test='decrement-button' onClick={this.handleDecrementButton}>-</button>
      </div>
    );
  }
}

export default App;
