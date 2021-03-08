import React, { useState } from "react";
import { Collapse, IconButton, Box } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";

export default function MobileAlert() {
  const [open, setOpen] = useState(true);

  return (
    <Box my={2}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
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
          }
        >
          <AlertTitle>ไม่รองรับอุปกรณ์พกพา</AlertTitle>
          หากอุปกรณ์ของคุณไม่สามารถแสดงเนื้อหานี้ได้
          โปรดเข้าสู่บทเรียนอีกครั้งด้วยคอมพิวเตอร์ ขออภัยในความไม่สะดวก
        </Alert>
      </Collapse>
    </Box>
  );
}
