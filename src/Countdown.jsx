import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 100);

      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }
  }, [seconds]);

  return (
    <div>
      <h1>Seconds Remaining: {seconds}</h1>
      <button onClick={() => {console.log("click!")}}>Click</button>
    </div>
  );
};

export default Countdown;
