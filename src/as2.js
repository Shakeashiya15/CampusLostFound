
import React, { Component } from 'react';
export default class greeting extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        name: props.name  
    };
 }
    render() {
    return (   <div>
       <h2>good morning</h2>
       <h2>{this.state.name}</h2>
   </div>)}

}