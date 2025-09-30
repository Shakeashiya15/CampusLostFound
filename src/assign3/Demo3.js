import React,{useState} from 'react'

export default function Demo3() {
    const[pid]=useState(10)
    const[pname]=useState("Laptop")
  return (
    <div>
      <h1>The product details </h1>
      <p>The product id is {pid}</p>
      <p>The product name is {pname}</p>
    </div>
  )
}