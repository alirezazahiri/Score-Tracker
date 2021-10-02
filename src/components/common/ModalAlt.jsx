import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalAlt = ({ open, setOpen, players, setPlayers }) => {
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setPlayers([
      ...players,
      {
        id: `${players.length + 1}`,
        name: name ? name : `Unknown ${players.length}`,
        score: 0,
      },
    ]);
    setOpen(false);
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Player ?
          </Typography>
          <form onSubmit={submitHandler}>
            <input type="text" onChange={changeHandler} value={name} />
            <button type="submit">submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAlt;
