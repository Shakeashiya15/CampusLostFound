import React, { Component } from 'react';

export default class Demo6 extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
        pid: 10,
        pname: "Mobile",
        isAvailable: true
    };  }
    handle=()=>
    {
        this.setState({ pid: 50,
        pname: "Laptop",
        isAvailable: true })
    }
    
    render() {
        
        
        return (
            <div>
                <h1>The product details</h1>
                <p>The product id is {this.state.pid}</p>
                <p>The product name is {this.state.pname}</p>
                <p>Available status: {this.state.isAvailable.toString()}</p>
                <button onClick={this.handle}>change</button>
            </div>
        );
    }
}