//@ts-nocheck
import React, { useState, useEffect } from "react";
import DayJS from "react-dayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  isFirefox,
  isMobile,
  browserName,
  osName,
  fullBrowserVersion,
} from "react-device-detect";
import Iframe from "react-iframe";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useTheme } from "@material-ui/core/styles";
import { getContentType } from "utils/contentType";
import { generateContentSourceUrl } from "utils/soureceUrl";

import VideoPlayer from "./VideoPlayer";
import PdfViewer from "./PdfViewer";
import FlashAlert from "./FlashAlert";
import MobileAlert from "./MobileAlert";
import TestList from "./TestList";

import * as learnActions from "../actions";
import HeroImage from "assets/images/hero-learn.svg";

export default function ContentView({ contentId, activeContentView }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [activeSource, setActiveSource] = useState("");
  var { isLoading: isSessionLoading, sessions: mySession } = useSelector(
    (state) => state.learn
  );

  useEffect(() => {
    setActiveSource(
      generateContentSourceUrl(!matches, activeContentView?.content1)
    );
  }, [matches, activeContentView]);

  useEffect(() => {
    const create_session_action = learnActions.createSession();
    if (contentId !== undefined) {
      dispatch(create_session_action);
    }
  }, [dispatch, contentId]);

  const handleSource = (
    event: React.MouseEvent<HTMLElement>,
    newSource: string | null
  ) => {
    if (newSource !== null) {
      setActiveSource(newSource);
    }
  };

  function renderUnsupportedAlert() {
    if (isMobile) {
      return <MobileAlert />;
    } else {
      if (!isFirefox) return <FlashAlert />;
    }
  }

  function renderContentView() {
    switch (getContentType(activeSource)) {
      case "video":
        return <VideoPlayer url={activeSource} />;
      case "pdf":
        return <PdfViewer url={activeSource} />;
      case "iframe":
        return (
          <>
            {renderUnsupportedAlert()}
            <Iframe
              url={activeSource}
              width="100%"
              height="600px"
              allowFullScreen
              frameBorder={0}
              scrolling="auto"
            />
          </>
        );
      default:
        return (
          <Grid container justify="center" alignItems="center">
            <Box my={4}>
              <Typography variant="body1" color="textSecondary">
                ไม่สามารถแสดงเนื้อหาประเภทนี้ได้
              </Typography>
            </Box>
          </Grid>
        );
    }
  }

  return (
    <>
      {contentId === undefined ? (
        <Box my={10}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
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
                alt="ยินดีต้อนรับ"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Typography
              variant="h6"
              color="textPrimary"
              gutterBottom
              style={{ fontSize: "1.7rem", fontWeight: 600 }}
            >
              ยินดีต้อนรับ
            </Typography>
            <Typography variant="body1" color="textSecondary">
              โปรดเลือกเนื้อหาที่ต้องการเรียนจากสารบัญ
            </Typography>
          </Grid>
        </Box>
      ) : (
        <Container maxWidth="md">
          <Box mt={4} mb={3}>
            <Grid
              container
              spacing={1}
              direction={matches ? "row" : "column"}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="h6"
                  color="initial"
                  style={{ fontSize: "1.6rem", fontWeight: 600 }}
                >
                  {activeContentView?.name}
                </Typography>
              </Grid>
              {activeContentView?.type === "c" && (
                <Grid item>
                  <ToggleButtonGroup
                    value={activeSource}
                    exclusive
                    onChange={handleSource}
                    aria-label="สลับลิงก์"
                    size="small"
                  >
                    <ToggleButton
                      value={generateContentSourceUrl(
                        !matches,
                        activeContentView?.content1
                      )}
                      aria-label="ลิงก์หลัก"
                    >
                      <Typography
                        variant="body2"
                        color="primary"
                        style={{ fontWeight: 500, padding: "0 6px" }}
                      >
                        ลิงก์หลัก
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      value={generateContentSourceUrl(
                        !matches,
                        activeContentView?.content2
                      )}
                      aria-label="ลิงก์สำรอง"
                    >
                      <Typography
                        variant="body2"
                        color="primary"
                        style={{ fontWeight: 500, padding: "0 6px" }}
                      >
                        ลิงก์สำรอง
                      </Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
          <Box my={4}>
            {activeContentView?.type === "c" && <>{renderContentView()}</>}
            {activeContentView?.type === "t" && <TestList />}
            <Box my={4}>
              <Typography variant="body2" color="textSecondary">
                FOR DEVELOPMENT
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Current content url: {activeSource}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You are currently viewing this content via {browserName}{" "}
                {fullBrowserVersion} on {osName}
              </Typography>
              <Typography variant="body2" color="error">
                Current session id: {mySession.id} and key: {mySession.key},
                created at{" "}
                <DayJS format="DD/MM/YYYY HH:mm">{mySession.createDate}</DayJS>
              </Typography>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
