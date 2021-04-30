import React from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import Iframe from "react-iframe";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import MobileAlert from "./MobileAlert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iframeWrapper: {
      position: "relative",
      paddingTop: "100%",
    },
    iframe: {
      position: "absolute",
      top: "0 !important",
      left: "0 !important",
    },
  })
);

const IframeWrapper = styled.div`
  iframe {
    outline: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default function IframeViewer({ url }: any) {
  const classes = useStyles();

  function renderUnsupportedAlert() {
    if (isMobile) {
      return <MobileAlert />;
    }
  }

  return (
    <>
      {renderUnsupportedAlert()}
      <div className={classes.iframeWrapper}>
        <IframeWrapper>
          <Iframe
            url={url}
            width="100%"
            height="600px"
            allowFullScreen
            frameBorder={0}
            scrolling="auto"
            className={classes.iframe}
          />
        </IframeWrapper>
      </div>
    </>
  );
}
