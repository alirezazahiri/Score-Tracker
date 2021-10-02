import React, { useReducer, useRef, useState } from "react";

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

const Player = ({ player, setCurrentPlayers, currentPlayers }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(true);

  const inputRef = useRef();
  const { score, value } = state;

  const updatePlayers = (newScore) => {
    let players = currentPlayers;
    players[Number(player.id) - 1].score = score + newScore;
    setCurrentPlayers(players);
  };

  const changeHandler = (e) => {
    dispatch({ type: "CHANGE_VALUE", payload: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_SCORE", payload: Number(value) });
    updatePlayers(Number(value));
    inputRef.current.value = "";
  };

  const resetHandler = () => {
    dispatch({ type: "RESET" });
    updatePlayers(0);
    inputRef.current.value = "";
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {player.name}
        </TableCell>
        <TableCell align="center">{score}</TableCell>
        {false && (
          <>
            <TableCell align="center">
              <form onSubmit={submitHandler}>
                <input ref={inputRef} type="text" onChange={changeHandler} />
                <button type="submit" disabled={!value}>
                  Add
                </button>
              </form>
            </TableCell>
            <TableCell align="center">
              <button onClick={resetHandler}>Reset</button>
            </TableCell>
          </>
        )}
      </TableRow>
      {true && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="score table">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ border: "none", display: "flex", justifyContent: "space-between"}}
                      >
                        <form onSubmit={submitHandler}>
                          <input
                            ref={inputRef}
                            type="text"
                            onChange={changeHandler}
                          />
                          <button type="submit" disabled={!value}>
                            Add
                          </button>
                        </form>
                        <button onClick={resetHandler}>Reset</button>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ border: "none" }}
                      ></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default Player;
