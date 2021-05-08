// @ts-nocheck
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import isBetween from "utils/isBetween";

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
  courseId,
}: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const path = "/learning-platform";

  if (myCourses === "") {
    myCourses = [];
  }

  const linkToLogin = () => {
    history.push(`${path}/login`);
  };

  const linkToLearn = () => {
    history.push(`${path}/learn`);
  };

  const registerCourse = () => {
    const registration_action = registrationsActions.registerCourse(id);
    dispatch(registration_action);
  };

  function renderRegisterButton() {
    if (!isLogin()) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            โปรดเข้าสู่ระบบเพื่อลงทะเบียนรายวิชา
          </Typography>
          <Box my={1}>
            <Button color="secondary" variant="contained" onClick={linkToLogin}>
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Grid>
      );
    } else if (
      isLogin() &&
      myCourses.filter(
        (myCourse) =>
          myCourse.courseId === parseInt(courseId) &&
          myCourse.courseRoundId === parseInt(id)
      ).length !== 0
    ) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            คุณลงทะเบียนรอบนี้แล้ว เข้าเรียนได้เลย
          </Typography>
          <Box my={2}>
            <Button
              color="secondary"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={linkToLearn}
            >
              เข้าเรียน
            </Button>
          </Box>
        </Grid>
      );
    } else if (numStudents >= maxStudents) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            จำนวนผู้เรียนเต็มแล้ว
          </Typography>
        </Grid>
      );
    } else if (!isBetween(registrationStart, registrationEnd)) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            ยังไม่เปิดให้ลงทะเบียน
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
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
              <Typography variant="body2" color="textSecondary" align="right">
                {numStudents} / {maxStudents} คน
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(numStudents / maxStudents) * 100}
                color="primary"
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
              <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                {registrationStart}
              </DayJS>{" "}
              ถึง{" "}
              <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                {registrationEnd}
              </DayJS>
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
              {registrationCondition ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: registrationCondition,
                  }}
                ></div>
              ) : (
                "ไม่มีเงื่อนไข"
              )}
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
              <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                {courseStart}
              </DayJS>{" "}
              ถึง{" "}
              <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                {courseEnd}
              </DayJS>
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
