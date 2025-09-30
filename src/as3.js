import React ,{Component} from'react';
export default class as3 extends Component{
    constructor(props)
    {
        super(props);
        this.state={
           product:[{name:"Laptop",price:50000},{name:"mobile",price:20000},{name:"Tablet",price:30000}] 
        };
    }
    render(){
        return(
            <div>
                <h2>product list</h2>
                <ul>
                    <li> {this.state.product[0].name}---{this.state.product[0].price} </li>
                    <li> {this.state.product[1].name}---{this.state.product[1].price} </li>
                    <li> {this.state.product[2].name}---{this.state.product[2].price} </li>
                </ul>
            </div>
        )
    }
}