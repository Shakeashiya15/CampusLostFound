import React, { Component } from 'react';

export default class Demo2 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={(node) => {
            this.input = node;
          }}
        />
      </div>
    );
  }
}
