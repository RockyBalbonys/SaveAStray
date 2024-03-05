import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackbarAnimal = ({ open, onClose, message }) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        // message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert>{message}</Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarAnimal;
