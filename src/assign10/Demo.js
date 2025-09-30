import React, { Component } from 'react';
export default class Demo extends Component {
constructor(props) {
super(props);
 this.myRef = React.createRef(); 
 }
 componentDidMount() {
this.myRef.current.focus(); 
 }
 render() {
 return (
<input type="text" ref={this.myRef} placeholder="Auto focused"/>
);
}
}