import React, { useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

export default function ContentView() {
  const [source, setSource] = useState<string | null>(
    "https://learn.ocsc.info/test/content.mp4"
  );

  const handleSource = (
    event: React.MouseEvent<HTMLElement>,
    newSource: string | null
  ) => {
    if (newSource !== null) {
      setSource(newSource);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box mt={6} mb={3}>
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
              เนื้อหา
            </Typography>
            <ToggleButtonGroup
              value={source}
              exclusive
              onChange={handleSource}
              aria-label="สลับลิงก์"
              size="small"
            >
              <ToggleButton
                value="https://learn.ocsc.info/test/content.mp4"
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
                value="https://www.youtube.com/watch?v=zw4sHOIx8t0"
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
        </Box>
        <Divider />
        <Box my={4}>เนื้อหา</Box>
      </Container>
    </>
  );
}
