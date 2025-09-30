import react,{Component} from'react';
export default class As72 extends Component{
  constructor(props)
 {
    super(props);
    this.state=
    {
        items:[ {id:1,name:'java'},
            {id:2,name:'python'}
        ]
    };
 }
 addItem=()=>{ 
    const newId=this.state.items.length+1;
    const newItem={id:newId,
        name:"React"};
        this.setState({
             items:[...this.state.items,newItem]
        });        
 }
 render()
 {
    return(
        <div>
        <h3>Items:</h3>
        <ul>
            {this.state.items.map(item=>(
                <li key={item.id}>
                     {item.id}-{item.name}
                </li>
            ))}
        </ul>
        <button onClick={this.addItem}>Add Item</button>
        </div>
    );
 }
 }
