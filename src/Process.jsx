import React, { useEffect, useState } from 'react';
import "./assets/styles/process.css";
import { updateAnElementOfAnArrayState } from './auxiliar/states';

const Process = ({ title, secondsToComplete, statusListState, id}) => {

  const [centimeInterval, setSeconds] = useState(0);
  const [statusList, setStatusList] = statusListState;

  useEffect(() => {
    if (centimeInterval >= 100 && statusList[id] != "done") {
      updateAnElementOfAnArrayState(id, "done", setStatusList);
    }
    if (centimeInterval <= 100 && statusList[id] === "executing") {
      const intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, (secondsToComplete * 10));
      return () => clearInterval(intervalId); 
    }
  }, [centimeInterval, statusList]);

  const handlePauseOrContinue = () => {
    if (statusList[id] === "executing") updateAnElementOfAnArrayState(id, "paused", setStatusList);
    else if (statusList[id] === "paused") updateAnElementOfAnArrayState(id, "executing", setStatusList);
  }

  return (
    <div className='process-container'>
      <label>{title}</label>
      <div className='progress-bar'>
        <div className='progress-bar-content' style={{marginLeft: "0", width: `${centimeInterval}%`, height: "100%", backgroundColor: "green", borderRadius: "30px"}}></div>
      </div>
      <p>{statusList[id]}</p>
      <button onClick={handlePauseOrContinue}>Pause</button>
      <button>Stop</button>
    </div>
  );
};

export default Process;


