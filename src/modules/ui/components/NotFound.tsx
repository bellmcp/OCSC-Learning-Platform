import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Toolbar,
  Container,
  Button,
  Box,
} from "@material-ui/core";

import HeroImage from "assets/images/hero-notfound.svg";

export default function NotFound() {
  const history = useHistory();
  const PATH = process.env.REACT_APP_BASE_PATH;

  const linkToHome = () => {
    history.push(`${PATH}`);
  };

  return (
    <Container maxWidth="lg">
      <Toolbar />
      <Box my={10}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: 500, textAlign: "center" }}
        >
          <Grid
            item
            style={{
              width: "50%",
              minWidth: 280,
              maxWidth: 500,
              marginBottom: 24,
            }}
          >
            <img
              src={HeroImage}
              alt="ไม่พบหน้าที่คุณต้องการ"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Typography
            variant="h6"
            color="textPrimary"
            gutterBottom
            style={{ fontSize: "1.7rem", fontWeight: 600, lineHeight: "1.3" }}
          >
            ขออภัย ไม่พบหน้าที่คุณต้องการ
          </Typography>
          <Typography variant="body1" color="textSecondary">
            โปรดตรวจสอบ URL อีกครั้ง
          </Typography>
          <Box mt={4}>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: 200 }}
              onClick={linkToHome}
            >
              กลับสู่หน้าหลัก
            </Button>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}
