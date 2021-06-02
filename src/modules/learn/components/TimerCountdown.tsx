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
import { useTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

import * as uiActions from "modules/ui/actions";
import * as learnActions from "../actions";

export default function TimerCountdown({
  currentContentView,
  courseRegistrationDetails,
  userTestAnswers,
}: any) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [contentViewId, setContentViewId] = useState(0);
  const [courseRegistrationId, setCourseRegistrationId] = useState(0);
  const [FinalUserTestAnswers, setFinalUserTestAnswers] = useState(null);

  const { test, testItems } = useSelector((state) => state.learn);
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

  // FILLED INCOMPLETED TEST ANSWER WITH ZEROS
  useEffect(() => {
    if (userTestAnswers === "0") {
      var filledWithZeroAnswers = new Array(testItems.length + 1).join("0");
      setFinalUserTestAnswers(filledWithZeroAnswers);
    } else {
      setFinalUserTestAnswers(userTestAnswers);
    }
  }, [userTestAnswers, testItems.length]);

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
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setMinutes(test?.minutes);
  }, [test]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          dispatch(
            uiActions.setFlashMessage(
              "กำลังบันทึกคำตอบ โปรดรอสักครู่...",
              "info"
            )
          );
          // AUTO SUBMIT TEST WHEN TIME OUT
          const update_test_action = learnActions.updateTest(
            courseRegistrationId,
            contentViewId,
            FinalUserTestAnswers
          );
          dispatch(update_test_action);
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
          value={timer > -initialTestMinutes ? timer : -initialTestMinutes}
          style={{
            color: grey[300],
            backgroundColor: theme.palette.primary.main,
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
