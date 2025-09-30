import React,{Component} from 'react';
class ShowDateTime extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            now:new Date()
        };
    }
    componentDidMount()
    {
        setInterval(()=>{
            this.setState({now:new Date()});
        },1000)
    }
    render(){
    return(
         <div>
      <h1>Curent date and time :<p>{this.state.now.toLocaleString()}</p></h1>
      </div>
    );
}
}
export default ShowDateTime;