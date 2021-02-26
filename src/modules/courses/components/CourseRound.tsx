// @ts-nocheck
import React from "react";
import { useDispatch } from "react-redux";
import DayJS from "react-dayjs";
import {
  Typography,
  Box,
  Grid,
  LinearProgress,
  Button,
} from "@material-ui/core";
import { ArrowForwardIos as ArrowForwardIcon } from "@material-ui/icons";
import { isLogin } from "utils/isLogin";

import * as registrationsActions from "modules/registrations/actions";

export default function CourseRound({
  id,
  name,
  registrationStart,
  registrationEnd,
  registrationCondition,
  courseStart,
  courseEnd,
  maxStudents,
  numStudents,
  myCourses,
}: any) {
  const dispatch = useDispatch();

  if (myCourses === "") {
    myCourses = [];
  }

  const registerCourse = () => {
    const registration_action = registrationsActions.registerCourse(id);
    dispatch(registration_action);
  };

  function renderRegisterButton() {
    if (!isLogin()) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            โปรดเข้าสู่ระบบเพื่อดำเนินการต่อ
          </Typography>
        </Grid>
      );
    } else if (
      isLogin() &&
      myCourses.filter((myCourse) => myCourse.courseId === parseInt(id))
        .length !== 0
    ) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            คุณลงทะเบียนรอบนี้แล้ว เริ่มเรียนได้เลย
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="secondary"
          endIcon={<ArrowForwardIcon />}
          onClick={registerCourse}
        >
          ลงทะเบียนเรียน
        </Button>
      );
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={7}>
        <Typography
          style={{
            fontSize: "1.7rem",
            lineHeight: "1.2",
            fontWeight: 600,
          }}
          gutterBottom
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
        <Box my={3}>{renderRegisterButton()}</Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs={6}>
            <Typography variant="h6" style={{ lineHeight: "1.2" }} gutterBottom>
              เปิดให้ลงทะเบียน
            </Typography>
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
            <Typography variant="h6" style={{ lineHeight: "1.2" }} gutterBottom>
              เงื่อนไขการลงทะเบียน
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              {registrationCondition}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs={6}>
            <Typography variant="h6" style={{ lineHeight: "1.2" }} gutterBottom>
              เข้าเรียนได้
            </Typography>
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
            <Typography variant="h6" style={{ lineHeight: "1.2" }} gutterBottom>
              จำนวนผู้เรียนสูงสุด
            </Typography>
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
