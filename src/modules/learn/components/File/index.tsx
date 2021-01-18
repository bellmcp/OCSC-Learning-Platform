import React from "react";
import Iframe from "react-iframe";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function File() {
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
