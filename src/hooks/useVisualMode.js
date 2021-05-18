import React, { useEffect, useState } from "react";


//Setting Initial Mode:
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
  const [mode, setMode] = useState(initial)

  function transition(mode, replace) {
    setMode(mode);
    const newHistory = [...history];

    newHistory.push(mode);

      setHistory(prev => (
        replace
        ? [...prev.slice(0, prev.length-1), mode]
        : [...prev, mode]
      ));
  };

  function back() {
    if (history.length < 2) return;
    setMode(history[history.length-2])
    setHistory(prev => {
      return [...prev.slice(0, history.length-1)]
    });

  };

  return { mode, transition, back };
};




