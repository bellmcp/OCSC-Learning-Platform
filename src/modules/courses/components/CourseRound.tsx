// @ts-nocheck
import React from "react";
import DayJS from "react-dayjs";
import {
  Typography,
  Box,
  Grid,
  LinearProgress,
  Button,
} from "@material-ui/core";
import { ArrowForwardIos as ArrowForwardIcon } from "@material-ui/icons";

export default function CourseRound({
  name,
  registrationStart,
  registrationEnd,
  registrationCondition,
  courseStart,
  courseEnd,
  maxStudents,
  numStudents,
}: any) {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={7}>
        <Typography
          style={{
            fontSize: "1.7rem",
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
        <Box mb={3}>
          <Box display="flex" alignItems="center">
            <Box width="100%">
              <Typography variant="body2" color="primary" align="right">
                {numStudents} / {maxStudents} คน
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(numStudents / maxStudents) * 100}
                color="secondary"
              />
            </Box>
            <Box></Box>
          </Box>
        </Box>
        <Box my={3}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => alert("Register")}
          >
            ลงทะเบียนเรียน
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs={6}>
            <Typography variant="h6">เปิดให้ลงทะเบียน</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              <DayJS format="DD/MM/YYYY">{registrationStart}</DayJS> ถึง{" "}
              <DayJS format="DD/MM/YYYY">{registrationEnd}</DayJS>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs={6}>
            <Typography variant="h6">เงื่อนไขการลงทะเบียน</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              {registrationCondition}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs={6}>
            <Typography variant="h6">เข้าเรียนได้</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              <DayJS format="DD/MM/YYYY">{courseStart}</DayJS> ถึง{" "}
              <DayJS format="DD/MM/YYYY">{courseEnd}</DayJS>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs={6}>
            <Typography variant="h6">จำนวนผู้เรียนสูงสุด</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              {maxStudents} คน
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
