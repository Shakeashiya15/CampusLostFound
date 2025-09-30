import React,{useState} from 'react';
export default function Demo1() {
     const [isVisible,set]=useState(0);
    const toggleparagraph=()=>
    {
    set(!isVisible);
    }; 
    return (
     <div>
        <button onClick={toggleparagraph}>{isVisible?'Hide':'Show'}</button>
        {isVisible && <p>Hai React</p>}
     </div>
 )
}