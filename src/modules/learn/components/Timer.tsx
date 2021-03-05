import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
  Hidden,
  Box,
} from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

export default function Timer({ contentId, activeContentView }: any) {
  const [timer, setTimer] = useState(1);
  const [progress, setProgress] = useState(0);
  const contentLength = activeContentView[0]?.minutes;

  // CLOCK
  useEffect(() => {
    if (contentId !== undefined) {
      const round = setInterval(() => {
        setTimer((prevTimer) => (prevTimer >= 60 ? 0 : prevTimer + 1));
      }, 1000);
      return () => {
        clearInterval(round);
      };
    }
  }, [contentId]);

  // MINUTE PROGRESS
  useEffect(() => {
    if (contentId !== undefined) {
      const sequence = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= contentLength ? 0 : prevProgress + 1
        );
      }, 60000);
      return () => {
        clearTimeout(sequence);
      };
    }
  }, [contentLength, contentId]);

  useEffect(() => {
    setTimer(0);
    setProgress(0);
  }, [activeContentView]);

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  useEffect(() => {
    console.log(timer);
  }, [timer]);

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="static"
          {...props}
          value={props.value * (100 / 60)}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textPrimary"
          >{`${Math.round(props.value)} วิ`}</Typography>
        </Box>
      </Box>
    );
  }

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textPrimary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <CircularProgressWithLabel
          value={timer}
          style={{
            backgroundColor: `${amber[500]}`,
            borderRadius: "50%",
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{ fontSize: "1rem" }}>
          <Hidden only={["xs"]}>
            <b>เวลาเรียนสะสม</b>
          </Hidden>{" "}
          {progress}
          {"/"}
          {contentLength ? contentLength : "0"} นาที
        </Typography>
      </Grid>
      <Grid item style={{ width: "100px" }}>
        <LinearProgressWithLabel
          value={(progress / contentLength) * 100}
          color="secondary"
        />
      </Grid>
    </Grid>
  );
}
