import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Styles
import "../../styles/Modal.scss";

// services
import createID, { createName } from "../../services/randomServices";

const ModalAlt = ({ open, setOpen, players, setPlayers }) => {
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setPlayers([
      ...players,
      {
        id: `${createID()}`,
        name: name ? name : `${createName()}`,
        score: 0,
      },
    ]);
    setName("");
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <Modal
      className="container"
      open={open}
      onClose={handleClose}
      aria-labelledby="title"
      aria-describedby="description"
    >
      <Box className="box">
        <div className="header">
          <h2>New Player ?</h2>
          <CloseIcon onClick={handleClose} />
        </div>
        <form onSubmit={submitHandler} className="body">
          <input
            ref={inputRef}
            type="text"
            onChange={changeHandler}
            value={name}
          />
          <button type="submit">Add Player</button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalAlt;
