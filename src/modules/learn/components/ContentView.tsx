//@ts-nocheck
import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { Box, Container, Divider, Grid, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import contentType from "utils/contentType";

import VideoPlayer from "./VideoPlayer";

export default function ContentView({ activeContentView }) {
  const [activeSource, setActiveSource] = useState("");

  useEffect(() => {
    setActiveSource(activeContentView?.content1);
  }, [activeContentView]);

  const handleSource = (
    event: React.MouseEvent<HTMLElement>,
    newSource: string | null
  ) => {
    if (newSource !== null) {
      setActiveSource(newSource);
    }
  };

  console.log(activeContentView);

  function renderContentView() {
    switch (contentType(activeSource)) {
      case "video":
        return <VideoPlayer url={activeSource} />;
      case "pdf":
        return <h1>Render pdf</h1>;
      case "iframe":
        return (
          <Iframe
            url={activeSource}
            width="100%"
            height="800px"
            allowFullScreen
            frameBorder={0}
            scrolling="auto"
          />
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
      <Container maxWidth="lg">
        <Box mt={4} mb={3}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color="initial"
              style={{ fontSize: "1.6rem", fontWeight: 600 }}
            >
              {activeContentView?.name}
            </Typography>
            {activeContentView?.type === "c" && (
              <ToggleButtonGroup
                value={activeSource}
                exclusive
                onChange={handleSource}
                aria-label="สลับลิงก์"
                size="small"
              >
                <ToggleButton
                  value={activeContentView?.content1}
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
                  value={activeContentView?.content2}
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
            )}
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>{renderContentView()}</Box>
      </Container>
    </>
  );
}
