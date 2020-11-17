import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
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
    setSource(newSource);
  };

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={2}>
          <Typography
            variant="h6"
            color="initial"
            gutterBottom
            style={{ fontSize: "1.4rem", fontWeight: 600 }}
          >
            วิดีโอ: พระพุทธศาสนา
          </Typography>
        </Box>
        <Box my={4}>
          <Player url={source} />
        </Box>
        <Box my={4}>
          <ToggleButtonGroup
            value={source}
            exclusive
            onChange={handleSource}
            aria-label="สลับลิงก์"
          >
            <ToggleButton
              value="https://ocsc-learning-platform.herokuapp.com/video.mp4"
              aria-label="ลิงก์หลัก"
            >
              ลิงก์หลัก
            </ToggleButton>
            <ToggleButton
              value="https://www.youtube.com/watch?v=DJX9fCdgMsg"
              aria-label="ลิงก์สำรอง"
            >
              ลิงก์สำรอง
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Container>
    </React.Fragment>
  );
}
