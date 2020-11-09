import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Player from "../Player";

export default function Video() {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={2}>
          <Typography
            variant="h6"
            color="initial"
            gutterBottom
            style={{ fontSize: "1.5rem" }}
          >
            ประวัติศาสตร์ไทย (Video)
          </Typography>
        </Box>
        <Box my={4}>
          <Player />
        </Box>
      </Container>
    </React.Fragment>
  );
}
