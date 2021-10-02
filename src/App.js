import React from "react";

// Components
import ScoreTracker from "./components/ScoreTracker";

// Contexts
import PlayersContextProvider from "./contexts/PlayersContextProvider";

// styles
import "./App.scss";

const App = () => {
  return (
    <PlayersContextProvider>
      <div className="App">
        <ScoreTracker />
      </div>
    </PlayersContextProvider>
  );
};

export default App;
