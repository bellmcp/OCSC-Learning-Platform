//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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

import * as learnActions from "../actions";

export default function Timer({
  contentId,
  activeContentView,
  currentContentView,
  courseRegistrationId,
  currentSession,
}: any) {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const contentLength = activeContentView[0]?.minutes;
  const contentViewId = currentContentView?.id;
  var initialContentMinutes = currentContentView?.contentSeconds / 60;
  if (
    initialContentMinutes == null ||
    initialContentMinutes === undefined ||
    isNaN(initialContentMinutes)
  ) {
    initialContentMinutes = 0;
  }

  // CLOCK
  useEffect(() => {
    if (contentId !== undefined) {
      const round = setInterval(() => {
        setTimer((prevTimer) => (prevTimer >= 59 ? 0 : prevTimer + 1));
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
          prevProgress >= contentLength ? contentLength : prevProgress + 1
        );
        console.log("Dispatch content seconds update +60");
      }, 60000);
      return () => {
        clearTimeout(sequence);
      };
    }
  }, [contentId]);

  console.log(progress);

  useEffect(() => {
    setTimer(0);
    setProgress(initialContentMinutes);
  }, [contentId]);

  // useEffect(() => {
  //   if (progress >= initialContentMinutes) {
  //     console.log("Dispatch content seconds update +60");
  //   }
  // }, [timer]);

  const updateContentViewSeconds = (contentSeconds) => {
    const update_content_view_action = learnActions.updateContentView(
      courseRegistrationId,
      contentViewId,
      currentSession.id,
      currentSession.key,
      contentSeconds
    );
    dispatch(update_content_view_action);
  };

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
        {progress <= contentLength ? (
          <CircularProgressWithLabel
            value={timer}
            style={{
              backgroundColor: `${amber[500]}`,
              borderRadius: "50%",
            }}
          />
        ) : (
          <CircularProgress
            value={100}
            variant="determinate"
            style={{
              backgroundColor: `${amber[500]}`,
              borderRadius: "50%",
            }}
          ></CircularProgress>
        )}
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{ fontSize: "1rem" }}>
          <Hidden only={["xs"]}>
            <b>เวลาเรียนสะสม</b>
          </Hidden>{" "}
          {progress <= contentLength ? (
            <>
              {progress}
              {"/"}
              {contentLength ? contentLength : "0"} นาที
            </>
          ) : (
            <>{`${contentLength ? contentLength : "0"}/${
              contentLength ? contentLength : "0"
            } นาที`}</>
          )}
        </Typography>
      </Grid>
      <Grid item style={{ width: "100px" }}>
        {progress <= contentLength ? (
          <LinearProgressWithLabel
            value={(progress / contentLength) * 100}
            color="secondary"
          />
        ) : (
          <LinearProgress value={100} color="secondary"></LinearProgress>
        )}
      </Grid>
    </Grid>
  );
}
