import React from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import Iframe from "react-iframe";
import { Grid, Box, Button } from "@material-ui/core";
import { OpenInNew as NewTab } from "@material-ui/icons";
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

  const linkToTargetUrl = () => {
    window.open(`${url}`, "_blank");
  };

  return (
    <>
      {renderUnsupportedAlert()}
      <div className={classes.iframeWrapper}>
        <IframeWrapper>
          <Iframe
            url={url}
            width="100%"
            height="100%"
            allowFullScreen
            frameBorder={0}
            scrolling="auto"
            className={classes.iframe}
          />
        </IframeWrapper>
      </div>
      <Box mt={2} mb={1}>
        <Grid
          container
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
        >
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<NewTab />}
              onClick={linkToTargetUrl}
            >
              เปิดในแท็บใหม่
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
