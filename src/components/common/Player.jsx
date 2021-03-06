import React, { useContext, useReducer, useState } from "react";

// Contexts
import { PlayersContext } from "../../contexts/PlayersContextProvider";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// Icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

// Styles
import "../../styles/Player.scss";

const initialState = {
  score: 0,
  value: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_SCORE":
      return { ...state, score: state.score + action.payload, value: "" };
    case "RESET":
      return { ...state, score: 0, value: "" };
    case "CHANGE_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const Player = ({ player, showToast }) => {
  const { setPlayers, players } = useContext(PlayersContext);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    score: player.score,
  });
  const [open, setOpen] = useState(false);

  const { score, value } = state;

  const updatePlayers = (newScore, type="") => {
    let currentPlayers = players;
    const index = currentPlayers.findIndex((p) => p.id === player.id);
    const prevScore = currentPlayers[index].score;
    currentPlayers[index].score = score + newScore;
    setPlayers(currentPlayers);
    localStorage.setItem("players", JSON.stringify(currentPlayers));
    const message = `${currentPlayers[index].name} Score Updated from ${prevScore} to ${type === "reset" ? newScore : currentPlayers[index].score}`;
    showToast("success", message);
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    if (`${Number(value)}` !== "NaN" || value[0] === "-")
      dispatch({ type: "CHANGE_VALUE", payload: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (`${Number(value)}` !== "NaN") {
      dispatch({ type: "ADD_SCORE", payload: Number(value) });
      updatePlayers(Number(value));
    } else {
      showToast("error", "Failed to Update Score!");
    }
    dispatch({ type: "CHANGE_VALUE", payload: "" });
  };

  const resetHandler = () => {
    dispatch({ type: "RESET" });
    updatePlayers(0, "reset");
    dispatch({ type: "CHANGE_VALUE", payload: "" });
  };

  const deleteHandler = () => {
    const currentPlayers = players.filter((p) => p.id !== player.id);
    setPlayers(currentPlayers);
  };

  return (
    <>
      <TableRow className="container">
        <TableCell>
          <IconButton
            className="dropdown"
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{player.name}</TableCell>
        <TableCell align="center">{score}</TableCell>
        <TableCell>
          <IconButton
            className="reset"
            aria-label="expand row"
            size="small"
            onClick={resetHandler}
          >
            <RotateLeftIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            className="delete"
            aria-label="expand row"
            size="small"
            onClick={deleteHandler}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className="option-container">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="score table">
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        border: "none",
                      }}
                    >
                      <form onSubmit={submitHandler} className="score-form">
                        <input
                          type="text"
                          onChange={changeHandler}
                          value={value}
                        />
                        <button type="submit" disabled={!value}>
                          Add
                        </button>
                      </form>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Player;
