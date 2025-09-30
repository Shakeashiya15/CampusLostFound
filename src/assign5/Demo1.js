
import React, { Component } from 'react';

export default class Demo1 extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleclick = this.handleclick.bind(this);
    this.handleclick1 = this.handleclick1.bind(this);
  }
  
  handleclick() {
    console.log(this.state.count);
    this.setState({ count: this.state.count -1 });
  }
   handleclick1() {
    console.log(this.state.count);
    this.setState({ count: this.state.count +1 });
  }
  
  render() {
    return (
      <div>
        <h3>count: {this.state.count}</h3>
        <button onClick={this.handleclick}>-</button>
         <button onClick={this.handleclick1}>+</button>
      </div>
    );
  }
}

