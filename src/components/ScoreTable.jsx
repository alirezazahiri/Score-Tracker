import React, { useEffect, useState } from "react";

// Common
import Player from "./common/Player";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Icons
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ScoreTable = ({ players }) => {
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    setCurrentPlayers(players);
  }, [players]);

  const sortPlayers = (sortBy) => {
    let players = currentPlayers;
    players = players.sort((a, b) => (a.score > b.score ? -1 : 1));
    const scores = players.map((player) => {
      return player.score;
    });
    console.log(scores);
    if (sortBy === "asc") setCurrentPlayers(players);
    else setCurrentPlayers(players.reverse());
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Player</TableCell>
            <TableCell
              align="center"
              onClick={() => sortPlayers(order)}
              style={{ cursor: "pointer" }}
            >
              Score{" "}
              {order === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </TableCell>
            {/* <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPlayers.map((player) => (
            <Player
              key={player.id}
              player={player}
              setCurrentPlayers={setCurrentPlayers}
              currentPlayers={currentPlayers}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;
