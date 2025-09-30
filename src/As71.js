import react,{Component} from'react';
export default class As71 extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            items:[1,2,3]
        };
    }
    addItem=()=>
    {
        this.setState({items:[...this.state.items,4]});
    }
    render(){
        return(
            <div>
                <h3>Items:{this.state.items.join(',')}</h3>
                <button onClick={this.addItem}>Add Items</button>
            </div>
        )
    }
}