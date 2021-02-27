import React from "react";
import ReactPlayer from "react-player";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playerWrapper: {
      position: "relative",
      paddingTop: "56.25%",
    },
    player: {
      position: "absolute",
      top: 0,
      left: 0,
      "&:focus": {
        outline: "none !important",
      },
    },
  })
);

export default function VideoPlayer({ url }: any) {
  const classes = useStyles();

  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        url={url}
        controls
        playing
        width="100%"
        height="100%"
        className={classes.player}
      />
    </div>
  );
}
