import React, { useState } from "react";
import { Button, Collapse, IconButton, Box } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";

export default function FlashAlert() {
  const [open, setOpen] = useState(true);

  return (
    <Box my={2}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <>
              <Button
                component="a"
                href="https://ftp.mozilla.org/pub/firefox/releases/82.0.3/win64/en-US/Firefox%20Setup%2082.0.3.exe"
                target="_blank"
                color="inherit"
                variant="outlined"
                style={{
                  width: 150,
                  margin: "0 5px",
                  textTransform: "none",
                }}
              >
                ดาวน์โหลด Firefox
              </Button>
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
                style={{ margin: "0 10px" }}
              >
                <CloseIcon
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </IconButton>
            </>
          }
        >
          <AlertTitle>เบราว์เซอร์ของคุณไม่รองรับ Abode Flash Player</AlertTitle>
          โปรแกรม Abode Flash Player ซึ่งใช้ในการแสดงเนื้อหานี้
          ได้ถูกยกเลิกการใช้งานโดยผู้ผลิต
          โปรดเข้าสู่บทเรียนอีกครั้งด้วยเบราว์เชอร์ Firefox ขออภัยในความไม่สะดวก
        </Alert>
      </Collapse>
    </Box>
  );
}
