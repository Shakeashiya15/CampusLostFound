import React, { Component } from 'react'

export default class Demo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: ''
        };
    }
    handleChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name }=this.state;
        if(name.trim()==='')
        {

            this.setState({error:'Name is requied'});
        }
        else if(name.length<3)
        {
            this.setState({error:'Name must be at least 3 characters'});
        }
        else
        {
            alert(`Hello ${this.state.name}!`);

            this.setState({name:'',error:''});
        }
    };

    render() {
        const{name,error}=this.state;
        return (
            <div>
                <h2>Enter your name</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Name: </label><br/>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}/><br />
                        {error && <small style={{color:"red"}}>{error}</small>}<br/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
