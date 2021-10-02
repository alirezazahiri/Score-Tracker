import React, { useState, useContext } from "react";
import ModalAlt from "./common/ModalAlt";

// Components
import ScoreTable from "./ScoreTable";

// Context
import { PlayersContext } from "../contexts/PlayersContextProvider";

// Styles
import "../styles/ScoreTracker.scss";

const ScoreTracker = () => {
  const { players, setPlayers } = useContext(PlayersContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="header">
        <h1>ScoreTracker</h1>
        <button onClick={() => setOpen(true)}>Add Players</button>
      </div>
      <ScoreTable players={players} setPlayers={setPlayers} setOpen={setOpen} />
      <ModalAlt
        open={open}
        setOpen={setOpen}
        players={players}
        setPlayers={setPlayers}
      />
    </div>
  );
};

export default ScoreTracker;
