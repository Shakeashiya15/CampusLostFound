import React from 'react'
export default function Demo()
{
    const now = new Date();
    return(
        <div>
      <h1>Curent date and time :<p>{now.toLocaleString()}</p></h1>
      </div>
    )
    
}