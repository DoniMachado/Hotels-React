import style from "./Dialog.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, forwardRef, useImperativeHandle } from "react";

const CustomDialog = forwardRef(function CustomDialog(props, ref) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openDialog: () => {
      handleClickOpen();
    },
  }));

  return (
    <Dialog
      id={style.dialog}
      open={open}
      onClose={handleClose}
      aria-labelledby={style.dialog_title}
      aria-describedby={style.dialog_description}
    >
      <DialogTitle id={style.dialog_title}>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={style.dialog_description}>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={() => {
            props.onConfirm();
            handleClose();
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default CustomDialog;
