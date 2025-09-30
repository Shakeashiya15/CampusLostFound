import React ,{useState,useEffect} from 'react';
function ShowDateTime()
{
    const[now,setNow]=useState(new Date());
    useEffect(()=>{
        setInterval(()=>
            {setNow( new Date());
           },1000);
        });
    return(
         <div>
      <h1>Curent date and time :<p>{now.toLocaleString()}</p></h1>
      </div>
    )
}
export default ShowDateTime;