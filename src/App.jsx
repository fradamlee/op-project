import React, { useEffect, useRef, useState } from 'react';
import Process from './Process';
import Buffer from './Buffer';
import "./assets/styles/process.css";
import { updateAnElementOfAnArrayState } from './auxiliar/states';

const App = () => {
  const [secondsItTakes, setSecondsItTakes] = useState(0);
  const [priority, setPriority] = useState(0);
  const [title, setTitle] = useState("");
  // const [processDataList, setProcessDataList] = useState(["waiting"]);
  const [statusListReader, setStatusListReader] = useState(["waiting"]);
  const [statusListWriter, setStatusListWriter] = useState(["waiting"]);
  const [statusListBuffer, setStatusListBuffer] = useState(["charged"]);
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

  // const addAProcess = () => {
  //   const data = {title, secondsItTakes, priority};
  //   console.log(data);
  //   setProcessDataList((prevProcessDataList) => [
  //     ...prevProcessDataList,
  //     data,
  //   ]);
  //   setStatusList((prevStatusList) => [
  //     ...prevStatusList,
  //     "ready",
  //   ]);
  // };

  const algorithm = () => {
    if (isAutoClickActive) {
      if(statusListReader[0] === "waiting" && statusListWriter[0] === "waiting") {
        setStatusListWriter(["executing"]);
      }
      if(statusListReader[0] === "waiting" && statusListWriter[0] === "done") {
        setStatusListReader(["executing"]);
        setStatusListBuffer(["finishing"]);
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
        {/* <h2>Add process: </h2>
        <label>Title: </label>
        <input onChange={handleTitleChanges} type="text" />
        <label>Seconds it takes: </label>
        <input onChange={handleSecondsItTakesChanges} type="text" />
        <label>Priority: </label>
        <input onChange={handlePriorityChanges} type="text" /> */}
        {/* <button onClick={addAProcess}>Add a process</button> */}
        <div className='process-list-container'>
          {/* {processDataList.map((processData, index) => {
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
          })} */}
            <Process 
              key={0} 
              id={0}
              title={"writter"} 
              secondsToComplete={4}
              statusListState={[statusListWriter, setStatusListWriter]}
            />
            <Process 
              key={1} 
              id={0}
              title={"reader"} 
              secondsToComplete={4}
              statusListState={[statusListReader, setStatusListReader]}
            />
            <Buffer
              key={2} 
              id={0}
              title={"buffer"} 
              secondsToComplete={4}
              statusListState={[statusListBuffer, setStatusListBuffer]}
            />
        </div>
      </div>

      <button ref={buttonRef} onClick={algorithm} onMouseUp={()=>{setIsAutoClickActive(true)}}>Iniciar algoritmo control de lector y escritor con semáforo</button>
    </div>
  );
};

export default App;

