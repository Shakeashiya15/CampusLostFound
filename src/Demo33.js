import React, { Component } from 'react';

export default class Dmo31 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [
                { name: "Laptop", price: 50000 },
                { name: "mobile", price: 20000 },
                { name: "Tablet", price: 30000 }
            ]
        };
    }

    render() {
   
        const filteredProducts = this.state.product.filter(p => p.price > 25000);

        return (
            <div>
               <h2>Filtered Product List (Price &gt; Rs 25000)</h2>

                {filteredProducts.map((product, index) => (
                    <li key={index}>
                        <p><strong>Product Name:</strong> {product.name}</p>
                        <p><strong>Price:</strong> ₹{product.price}</p>
                    </li>
                ))}
            </div>
        );
    }
}
