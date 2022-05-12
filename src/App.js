import React, { useEffect } from "react";

// Components
import ScoreTracker from "./components/ScoreTracker";

// Contexts
import PlayersContextProvider from "./contexts/PlayersContextProvider";

// styles
import "./App.scss";

const App = () => {
  useEffect(() => {
    try {
      const isKeyAvailable = localStorage.getItem("players");
      if (!isKeyAvailable) localStorage.setItem("players", JSON.stringify([]));
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <PlayersContextProvider>
      <div className="App">
        <ScoreTracker />
      </div>
    </PlayersContextProvider>
  );
};

export default App;
