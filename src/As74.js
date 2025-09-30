import react,{Component} from 'react';
export default class As74 extends Component{
    render()
    {
        const{id,task,completed}=this.props;
        return(
        <div>
        <h3>Items:</h3>
        <ul>
           <h4>Task ID:{id}</h4>
            <p>Task :{task}</p>
            <p>Status:{completed ? "Completed" :"Not completed"}</p>
        </ul>
        </div>
        );
    }
}