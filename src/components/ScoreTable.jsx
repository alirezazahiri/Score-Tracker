import React, { useState } from "react";

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

// Styles
import "../styles/ScoreTable.scss";

// Toast
import toast, { Toaster } from "react-hot-toast";

const toastStyle = {
  background: "#000",
  border: "1px solid #F0A500",
  boxShadow: "0 0 12px #F0A500",
  padding: "16px",
  color: "#F0A500",
};

const ScoreTable = ({ players, setPlayers, setOpen }) => {
  const [scoreOrder, setScoreOrder] = useState("asc");
  const [nameOrder, setNameOrder] = useState("asc");

  const sortPlayers = (sortBy, order) => {
    let currentPlayers = players;
    if (sortBy === "name") {
      currentPlayers = players.sort((a, b) => (a.name > b.name ? -1 : 1));
      setNameOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      currentPlayers = players.sort((a, b) => (a.score > b.score ? -1 : 1));
      setScoreOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    }
    setPlayers(order === "asc" ? currentPlayers : currentPlayers.reverse());
  };

  const showToast = (type, message) => {
    toast.dismiss();
    if (type === "success")
      toast.success(message);
    else if(type === "error") 
      toast.error(message)
  }

  return (
    <TableContainer component={Paper}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: toastStyle,
        }}
      />
      <Table className="container" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {players && players.length > 0 && (
              <>
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => sortPlayers("name", nameOrder)}
                >
                  Player
                  {nameOrder === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  onClick={() => sortPlayers("score", scoreOrder)}
                  style={{ cursor: "pointer" }}
                >
                  Score
                  {scoreOrder === "asc" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {players && players.length > 0 ? (
            players.map((player) => <Player key={player.id} player={player} showToast={showToast}/>)
          ) : (
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>
                There are no players in here,{" "}
                <span
                  onClick={() => setOpen(true)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Add Some
                </span>{" "}
                to Get Started!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;
