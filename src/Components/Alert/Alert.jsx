import { useState, forwardRef, useImperativeHandle } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomAlert = forwardRef(function CustomAlert(props, ref) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [isSucessAlert, setIsSucessAlert] = useState(true);
  const [alertText, setAlertText] = useState("");

  function CloseAlert() {
    setAlertOpen(false);
  }

  function OpenAlert(isSucess, text) {
    setIsSucessAlert(isSucess ?? true);
    setAlertText(text);
    setAlertOpen(true);
  }

  useImperativeHandle(ref, () => ({
    closeAlert: () => {
      CloseAlert();
    },

    openAlert: (isSucess, text) => {
      OpenAlert(isSucess, text);
    },
  }));

  return (
    <Snackbar open={alertOpen} autoHideDuration={2000} onClose={CloseAlert}>
      <Alert
        onClose={CloseAlert}
        severity={isSucessAlert ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alertText ?? "Sem texto"}
      </Alert>
    </Snackbar>
  );
});

export default CustomAlert;
