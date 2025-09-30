import react,{Component} from 'react';
export default class As73 extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            items:[
                { id:1,name:'Angular'},
                { id:2,name:'vue'}
            ],
            newName:''
        };
    }
    handleChange=(event)=>{
        this.setState({newName:event.target.value});
    }
    addItem=()=>{
        const newId =this.state.items.length +1;
        const newItem={
            id:newId,
            name:this.state.newName
        };
        this.setState(prevState => ({
            items: [...prevState.items, newItem], 
            newName: '' 
        }));
    }
    render()
 {
    return(
        <div>
        <h3>Items:</h3>
        <ul>
            {this.state.items.map(newItem=>(
                <li key={newItem.id}>
                     {newItem.id}-{newItem.name}
                </li>
            ))}
        </ul>
        <input 
                    type="text" 
                    value={this.state.newName} 
                    onChange={this.handleChange} 
                    placeholder="Add new item" 
                />
        <button onClick={this.addItem}>Add Item</button>
        </div>
    );
 }

}

       

