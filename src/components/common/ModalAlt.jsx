import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Styles
import "../../styles/Modal.scss";

// services
import createID, { createName } from "../../services/randomServices";

// Toast
import toast, { Toaster } from "react-hot-toast";

const toastStyle = {
  background: "#000",
  border: "1px solid #F0A500",
  boxShadow: "0 0 12px #F0A500",
  padding: "16px",
  color: "#F0A500",
}

const ModalAlt = ({ open, setOpen, players, setPlayers }) => {
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const newPlayer = name ? name : createName()
    setPlayers([
      ...players,
      {
        id: `${createID()}`,
        name: newPlayer,
        score: 0,
      },
    ]);
    setName("");
    toast.dismiss();
    toast.success(`${newPlayer} Added!`);
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: toastStyle
        }}
      />

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
            <p>Add as much as players you need to track their scores!</p>
            <input
              type="text"
              onChange={changeHandler}
              value={name}
            />
            <button type="submit">Add Player</button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAlt;
