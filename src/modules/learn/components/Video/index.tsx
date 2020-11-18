import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import Player from "../Player";

export default function Video() {
  const [source, setSource] = React.useState<string | null>(
    "https://ocsc-learning-platform.herokuapp.com/video.mp4"
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
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={2}>
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
              วิดีโอ: พระพุทธศาสนา
            </Typography>
            <ToggleButtonGroup
              value={source}
              exclusive
              onChange={handleSource}
              aria-label="สลับลิงก์"
              size="small"
            >
              <ToggleButton
                value="https://ocsc-learning-platform.herokuapp.com/video.mp4"
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
                value="https://www.youtube.com/watch?v=DJX9fCdgMsg"
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
        <Box my={4}>
          <Player url={source} />
        </Box>
      </Container>
    </React.Fragment>
  );
}
