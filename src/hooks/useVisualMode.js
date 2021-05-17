import React, { useEffect, useState } from "react";


//Setting Initial Mode:
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
  const [mode, setMode] = useState(initial)

  const transition = function(newMode) {
    const newHistory = [...history];

    newHistory.push(newMode);
      setHistory(newHistory);
      setMode(newMode);
  };

  return { mode, transition };
};


