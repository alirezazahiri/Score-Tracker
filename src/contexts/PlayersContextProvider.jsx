import React, { createContext, useEffect, useState } from "react";

// services
import getLocalData from "../services/getLocalData";

export const PlayersContext = createContext();

const PlayersContextProvider = ({ children }) => {
  const [players, setPlayers] = useState(getLocalData("players"));
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players ? players : []));
  }, [players]);
  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContextProvider;
