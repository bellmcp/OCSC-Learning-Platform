import React, { useState } from "react";
import Iframe from "react-iframe";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";

export default function File() {
  const [open, setOpen] = useState(true);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={2}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color="initial"
              gutterBottom
              style={{ fontSize: "1.4rem", fontWeight: 600 }}
            >
              ไฟล์: ทดสอบระบบ
            </Typography>
            <Link
              href="https://learn.ocsc.info/test/flash/NEW_A001.html"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined" color="default">
                เปิดในแท็บใหม่
              </Button>
            </Link>
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>
          <Box mb={3}>
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
                <AlertTitle>โปรดทราบ</AlertTitle>
                โปรแกรม Abode Flash Player ซึ่งใช้ในการเปิดบทเรียน
                ได้ถูกยกเลิกการใช้งาน โปรดเข้าสู่บทเรียนอีกครั้งด้วยเบราว์เชอร์
                Firefox ขออภัยในความไม่สะดวก
              </Alert>
            </Collapse>
          </Box>
          <Iframe
            url="https://learn.ocsc.info/test/flash/NEW_A001.html"
            width="100%"
            height="800px"
            allowFullScreen
            frameBorder={0}
            scrolling="auto"
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
