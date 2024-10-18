
export const updateAnElementOfAnArrayState = (key, newStatus, setState) => {
    setState((prevStatusList) => {
      // Only update the state if the status has actually changed
      if (prevStatusList[key] !== newStatus) {
        const updatedStatusList = [...prevStatusList];
        updatedStatusList[key] = newStatus;
        return updatedStatusList;
      }
      return prevStatusList;
    });
  };