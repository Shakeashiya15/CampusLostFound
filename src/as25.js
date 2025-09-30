import React, { useState } from 'react';

export default function Demo3() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setSubmitted(true);
  };
  return (
    <div>
      <h1>{submitted ? "Thank you for your feedback!" : "We value your feedback"}</h1>
      <button onClick={handleSubmit} disabled={submitted}>
        {submitted ? "Submitted" : "Submit Feedback"}
      </button>
    </div>
  );
}
