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
      top: "0 !important",
      left: "0 !important",
    },
  })
);

const ReactPlayerWrapper = styled.div`
  video {
    outline: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  iframe {
    outline: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default function VideoPlayer({ url }: any) {
  const classes = useStyles();

  return (
    <div className={classes.playerWrapper}>
      <ReactPlayerWrapper>
        <ReactPlayer
          className={classes.player}
          width="100%"
          height="100%"
          url={url}
          controls
          playing
        />
      </ReactPlayerWrapper>
    </div>
  );
}
