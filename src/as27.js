import React, { useState } from 'react';

export default function Demo4() {
  const [darkMode, setDarkMode] = useState(false);
  const toggle = () => setDarkMode(!darkMode);

  const pageStyle = {
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
    height: '100vh',
    textAlign: 'center',
    paddingTop: '50px',
  };

  return (
    <div style={pageStyle}>
      <h1>{darkMode ? "Dark Mode On" : "Light Mode On"}</h1>
      <button onClick={toggle}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}
