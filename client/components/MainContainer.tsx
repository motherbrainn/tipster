import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import Form from "./Form";

const env = process.env.NODE_ENV;
const PROD_CLIENT_URL = process.env.NEXT_PUBLIC_PROD_CLIENT_URL;

const clientUrl = env === "production" ? PROD_CLIENT_URL : "localhost:3000";

const MainContainer = () => {
  const [qrCodeKey, setQrCodeKey] = useState("");
  const [qrCodePrompt, setQrCodePrompt] = useState("");

  const handleClose = () => {
    setQrCodeKey("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Form setKey={setQrCodeKey} setPrompt={setQrCodePrompt} />
      <Dialog
        open={qrCodeKey.length > 0 && true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="hide-when-printing">
          YOUR QR CODE IS NOT ACTIVE UNTIL YOU CONFIRM VIA TEXT.. CHECK YOUR
          PHONE
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {qrCodePrompt}
          </DialogContentText>
          <QRCode
            title="qr code"
            value={`${clientUrl}/qr-code-landing-page?qrkey=${qrCodeKey}`}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            size={256}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePrint}
            className="hide-when-printing"
            autoFocus
          >
            Print Notification QR Code
          </Button>
          <Button onClick={handleClose} className="hide-when-printing">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainContainer;
