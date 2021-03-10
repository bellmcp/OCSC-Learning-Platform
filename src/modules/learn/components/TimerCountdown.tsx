//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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

export default function TimerCountdown({}: any) {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);

  // CLOCK
  useEffect(() => {
    const round = setInterval(() => {
      setTimer((prevTimer) => (prevTimer >= 59 ? 0 : prevTimer - 1));
    }, 1000);
    return () => {
      clearInterval(round);
    };
  }, []);

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
      </Box>
    );
  }

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <CircularProgressWithLabel
          value={timer}
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
          2 นาที 59 วินาที
        </Typography>
      </Grid>
      <Grid item style={{ width: "100px" }}>
        สิ้นสุด 16:25 น.
      </Grid>
    </Grid>
  );
}
