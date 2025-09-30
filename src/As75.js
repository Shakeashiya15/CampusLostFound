import React, { Component } from 'react'
import axios from "axios"
export default class As75 extends Component {
    constructor(props)
    {
        super(props)
        this.state={
           posts:[]
        }
    }
    componentDidMount()
    {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response=>{
             this.setState(
            {posts:response.data}
        )
        })
        .catch(err=>{
            console.log("error")
        })
       
    }
  render() {
    const {posts}=this.state
    return (
      <div>
        {
            posts.map((p,index)=>(
                <li key={index}>
                    <p>userId: {p.userId}</p>
                     <p>id: {p.id}</p>
                      <p>Title: {p.title}</p>
                </li>
            ))
        }
      </div>
    )
  }
}

