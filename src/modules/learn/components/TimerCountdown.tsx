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

export default function TimerCountdown({ activeContentView }: any) {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const { test } = useSelector((state) => state.learn);
  const [initialTestMinutes, setInitialTestMinutes] = useState(
    test?.minutes * 60
  );

  useEffect(() => {
    setInitialTestMinutes(test?.minutes * 60);
  }, [test]);

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
  setTimeout(() => {
    console.log("Test time is out");
  }, initialTestMinutes * 1000);

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
