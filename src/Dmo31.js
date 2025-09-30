import React ,{Component} from'react';
export default class Dmo31 extends Component{
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
                <h1>using map</h1>
                {this.state.product.map((product,index)=>(
                    <li key={index}>
                        <p><strong>Product Name:</strong>{product.name}</p>
                        <p><strong>Price:</strong>{product.price}</p>
                    </li>
                ))}
            </div>
        )
    }
}