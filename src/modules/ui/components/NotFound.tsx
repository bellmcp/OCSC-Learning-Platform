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

export default function NotFound() {
  const history = useHistory();
  const path = "/learning-platform";

  const linkToHome = () => {
    history.push(`${path}`);
  };

  return (
    <Container maxWidth="lg">
      <Toolbar />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: 500, textAlign: "center" }}
      >
        <Typography variant="h2" color="textPrimary">
          404
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ lineHeight: 0.9 }}
        >
          ขออภัย ไม่พบหน้าเว็บไซต์ที่คุณต้องการ
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: 200 }}
            onClick={linkToHome}
          >
            กลับหน้าหลัก
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}
