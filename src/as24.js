import React, { useState } from 'react'

export default function Demo2() {
  const [name, set] = useState("click to subscribe")
  const [butname, setbutton] = useState("subscribe")

  const handle = () => {
    set("welcome")
    setbutton("subscribed")
  }

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={handle}>{butname}</button>
    </div>
  )
}
