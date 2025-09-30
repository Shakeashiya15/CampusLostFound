import React,{useState} from 'react'

export default function Demo4() {
    const[pid,setpid]=useState(10)
    const[pname,setpname]=useState("Laptop")
    const[pprice,setprice]=useState("85000")
    const handle=()=>
    {
        setpid(67);
        setpname("Mobile");
        setprice(35000);
    }
  return (
    <div>
      <h1>The product details </h1>
      <p>The product id is {pid}</p>
      <p>The product name is {pname}</p>
      <p>The product price is {pprice}</p>
      <button onClick={handle}>Change</button>
    </div>
  )
}
