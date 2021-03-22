//@ts-nocheck
import React, { useState, useEffect } from "react";
import DayJS from "react-dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  CircularProgress,
  CircularProgressProps,
  Hidden,
  Box,
} from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

import * as learnActions from "../actions";

export default function TimerCountdown({
  currentContentView,
  courseRegistrationDetails,
  userTestAnswers,
}: any) {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [contentViewId, setContentViewId] = useState(0);
  const [courseRegistrationId, setCourseRegistrationId] = useState(0);
  const [FinalUserTestAnswers, setFinalUserTestAnswers] = useState("0");

  const { test } = useSelector((state) => state.learn);
  const [initialTestMinutes, setInitialTestMinutes] = useState(
    test?.minutes * 60
  );

  useEffect(() => {
    setInitialTestMinutes(test?.minutes * 60);
  }, [test]);

  useEffect(() => {
    setContentViewId(currentContentView?.id);
  }, [currentContentView]);

  useEffect(() => {
    setCourseRegistrationId(courseRegistrationDetails[0]?.id);
  }, [courseRegistrationDetails]);

  useEffect(() => {
    setFinalUserTestAnswers(userTestAnswers);
  }, [userTestAnswers]);

  // CLOCK
  useEffect(() => {
    const round = setInterval(() => {
      setTimer((prevTimer) =>
        prevTimer >= initialTestMinutes ? 0 : prevTimer - 1
      );
    }, 1000);
    return () => {
      clearInterval(round);
    };
  }, [initialTestMinutes]);

  //COUNTDOWN TIMER
  const initialMinute = 3;
  const initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds]);

  //ENDTIME
  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    setCurrentTime(new Date().toISOString());
  }, []);

  //AUTO SUBMIT WHEN TIME OUT
  // if (minutes === 0 && seconds === 0) {
  //   var forceSubmitTest = (function () {
  //     var executed = false;
  //     return function () {
  //       if (!executed) {
  //         executed = true;
  //         console.log("Test time is out");
  //         console.log(courseRegistrationId);
  //         console.log(contentViewId);
  //         console.log(FinalUserTestAnswers);
  //         console.log("End");
  //       }
  //     };
  //   })();
  //   forceSubmitTest();
  // }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const update_test_action = learnActions.updateTest(
        courseRegistrationId,
        contentViewId,
        FinalUserTestAnswers
      );
      dispatch(update_test_action);
    }, initialTestMinutes * 1000);
    return () => clearTimeout(timeout);
  }, [
    dispatch,
    FinalUserTestAnswers,
    contentViewId,
    courseRegistrationId,
    initialTestMinutes,
  ]);

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="static"
          {...props}
          value={props.value * (100 / initialTestMinutes)}
        />
      </Box>
    );
  }

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <CircularProgressWithLabel
          value={timer > -initialTestMinutes ? timer : 0}
          style={{
            color: "white",
            backgroundColor: `${amber[500]}`,
            borderRadius: "50%",
          }}
          thickness={22}
        />
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{ fontSize: "1rem" }}>
          <Hidden only={["xs"]}>
            <b>คงเหลือ </b>
          </Hidden>
          {minutes === 0 && seconds === 0
            ? "หมดเวลา"
            : `${minutes} นาที ${seconds} วินาที`}
        </Typography>
      </Grid>
      <Grid item style={{ width: "100px" }}>
        <b>สิ้นสุด </b>
        <DayJS format="HH:mm" add={{ seconds: initialTestMinutes }}>
          {currentTime}
        </DayJS>{" "}
        น.
      </Grid>
    </Grid>
  );
}
