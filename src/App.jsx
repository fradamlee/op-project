import React, { useEffect, useRef, useState } from 'react';
import Process from './Process';
import "./assets/styles/process.css";
import { updateAnElementOfAnArrayState } from './auxiliar/states';

const App = () => {
  const [secondsItTakes, setSecondsItTakes] = useState(0);
  const [priority, setPriority] = useState(0);
  const [title, setTitle] = useState("");
  const [processDataList, setProcessDataList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const buttonRef = useRef(null);
  const [isAutoClickActive, setIsAutoClickActive] = useState(false);

  const handleSecondsItTakesChanges = (evt) => {
    setSecondsItTakes(evt.target.value*1);
  }

  const handlePriorityChanges = (evt) => {
    setPriority(evt.target.value*1);
  };

  const handleTitleChanges = (evt) => {
    setTitle(evt.target.value);
  };

  const addAProcess = () => {
    const data = {title, secondsItTakes, priority};
    console.log(data);
    setProcessDataList((prevProcessDataList) => [
      ...prevProcessDataList,
      data,
    ]);
    setStatusList((prevStatusList) => [
      ...prevStatusList,
      "ready",
    ]);
  };

  const algorithm = () => {
    if (isAutoClickActive) {
      let highestPriority = null;
      let highestPriorityIndex = -1;
  
      for (let i = 0; i < statusList.length; i++) {
        const status = statusList[i];
        const { priority, secondsItTakes } = processDataList[i];
  
        // Skip already done processes
        if (status === "done") continue;
  
        // Find the highest priority process that is not done
        if (highestPriority === null || priority < highestPriority) {
          highestPriority = priority;
          highestPriorityIndex = i;
        } 
      }
  
      if (highestPriorityIndex !== -1) {
        // Preempt any running process
        for (let i = 0; i < statusList.length; i++) {
          if (statusList[i] === "executing" && i !== highestPriorityIndex) {
            updateAnElementOfAnArrayState(i, "waiting", setStatusList);
          }
        }
  
        // Execute the highest priority process
        const statusOfHighest = statusList[highestPriorityIndex];
        if (statusOfHighest === "waiting" || statusOfHighest === "ready") {
          updateAnElementOfAnArrayState(highestPriorityIndex, "executing", setStatusList);
        }
  
        // Check if the process has completed its execution
        const process = processDataList[highestPriorityIndex];
        if (process.secondsItTakes <= 0) {
          updateAnElementOfAnArrayState(highestPriorityIndex, "done", setStatusList);
        } else {
          // Decrement the remaining time
          processDataList[highestPriorityIndex].secondsItTakes -= 1;
        }
      }
    }
  };
  

  useEffect(() => {
    let intervalId;
  
    intervalId = setInterval(() => {
      if (buttonRef.current) {
          buttonRef.current.click();
        }
      }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>

      <div>
        <h2>Add process: </h2>
        <label>Title: </label>
        <input onChange={handleTitleChanges} type="text" />
        <label>Seconds it takes: </label>
        <input onChange={handleSecondsItTakesChanges} type="text" />
        <label>Priority: </label>
        <input onChange={handlePriorityChanges} type="text" />
        <button onClick={addAProcess}>Add a process</button>
        <div className='process-list-container'>
          {processDataList.map((processData, index) => {
            const { title, secondsItTakes } = processData;
            return (
              <Process 
                key={index} 
                id={index}
                title={title} 
                secondsToComplete={secondsItTakes}
                statusListState={[statusList, setStatusList]}
              />
            );
          })}
        </div>
      </div>

      <button ref={buttonRef} onClick={algorithm} onMouseUp={()=>{setIsAutoClickActive(true)}}>Iniciar algoritmo de prioridades</button>
    </div>
  );
};

export default App;

