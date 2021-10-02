import React, { useState } from "react";
import ModalAlt from "./common/ModalAlt";

// Components
import ScoreTable from "./ScoreTable";

const ScoreTracker = () => {
  const [players, setPlayers] = useState([]);
  const [open, setOpen] = useState(false);
  console.log(players)
  return (
    <div>
      <div>
        <h1>ScoreTracker</h1>
        <button onClick={() => setOpen(true)}>add player</button>
      </div>
      <ScoreTable players={players} />
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
