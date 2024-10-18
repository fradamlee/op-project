import React, { useEffect, useState } from 'react';
import "./assets/styles/process.css";
// import { updateAnElementOfAnArrayState } from './auxiliar/states';

const Buffer = ({ title, secondsToComplete, statusListState, id}) => {

  const [centimeInterval, setSeconds] = useState(100);
  const [statusList, ] = statusListState;

  useEffect(() => {

    if (centimeInterval >= 0 && statusList[id] === "finishing") {
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, (secondsToComplete * 10));
      return () => clearInterval(intervalId); 
    }
  }, [centimeInterval, statusList]);

  return (
    <div className='process-container'>
      <label>{title}</label>
      <div className='progress-bar'>
        <div className='buffer-bar-content' style={{marginLeft: "0", width: `${centimeInterval}%`, height: "100%", backgroundColor: "green", borderRadius: "30px"}}></div>
      </div>
      <p>{statusList[id]}</p>
    </div>
  );
};

export default Buffer;