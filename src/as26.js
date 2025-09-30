import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function OneStarToggle() {
  const [filled, setFilled] = useState(false);

  function handleClick() {
    setFilled(!filled);
  }

  return (
    <div>
      <p>Click the star to toggle:</p>
      <span onClick={handleClick}>
        {filled ? <FaStar size={50} color="gold" /> : <FaRegStar size={50} />}
      </span>
    </div>
  );
}

