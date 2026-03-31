import React, { createContext, useContext, useState } from 'react';

const LeaveContext = createContext({
  leaves: [],
  setLeaves: () => {},
  addLeave: () => {},
});

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      type: 'Casual Leave',
      fromDate: '2026-03-20',
      toDate: '2026-03-21',
      days: 2,
      status: 'Approved',
      reason: 'Personal work',
    },
    {
      id: 2,
      type: 'Sick Leave',
      fromDate: '2026-03-25',
      toDate: '2026-03-25',
      days: 1,
      status: 'Pending',
      reason: 'Fever',
    },
  ]);

  const addLeave = newLeave => {
    setLeaves(prevLeaves => [
      ...prevLeaves,
      {
        id: Date.now(),
        ...newLeave,
      },
    ]);
  };

  return (
    <LeaveContext.Provider value={{ leaves, setLeaves, addLeave }}>
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = () => {
  return useContext(LeaveContext);
};
