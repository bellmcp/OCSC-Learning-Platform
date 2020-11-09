import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playerWrapper: {
      position: "relative",
      paddingTop: "56.25%",
    },
    reactPlayer: { position: "absolute", top: 0, left: 0 },
  })
);

export default function Video() {
  const classes = useStyles();
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
            สรุปเนื้อหา (Youtube)
          </Typography>
        </Box>
        <Box my={4}>
          <div className={classes.playerWrapper}>
            <ReactPlayer
              className={classes.reactPlayer}
              url="https://www.youtube.com/watch?v=-3dIcqNtAyQ"
              width="100%"
              height="100%"
              playing
            />
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}
