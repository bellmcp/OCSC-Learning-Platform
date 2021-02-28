import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
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

const ReactPlayerWrapper = styled.div`
  video {
    outline: 0;
  }
`;

export default function VideoPlayer({ url }: any) {
  const classes = useStyles();

  return (
    <div className={classes.playerWrapper}>
      <ReactPlayerWrapper>
        <ReactPlayer
          url={url}
          controls
          playing
          width="100%"
          height="100%"
          className={classes.player}
        />
      </ReactPlayerWrapper>
    </div>
  );
}
