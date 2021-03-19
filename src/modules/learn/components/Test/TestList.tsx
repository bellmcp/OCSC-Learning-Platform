//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
  Divider,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send as SendIcon, Timer as TimerIcon } from "@material-ui/icons";

import * as learnActions from "modules/learn/actions";
import * as uiActions from "modules/ui/actions";
import TestItem from "./TestItem";

import HeroImage from "assets/images/hero-evaluation.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
  },
}));

export default function TestList({
  activeContentView,
  testStart,
  setTestStart,
  currentContentView,
  courseRegistrationDetails,
}: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const testId = activeContentView.testId1;
  const isCompleted = currentContentView?.isCompleted;

  const [contentViewId, setContentViewId] = useState(0);
  const [courseRegistrationId, setCourseRegistrationId] = useState(0);

  const { isLoading: isTestLoading, test, testItems } = useSelector(
    (state) => state.learn
  );

  useEffect(() => {
    setContentViewId(currentContentView?.id);
  }, [currentContentView]);

  useEffect(() => {
    setCourseRegistrationId(courseRegistrationDetails[0]?.id);
  }, [courseRegistrationDetails]);

  useEffect(() => {
    const load_test_action = learnActions.loadTest(testId);
    dispatch(load_test_action);
  }, [dispatch, testId]);

  useEffect(() => {
    const load_test_items_action = learnActions.loadTestItems(testId);
    dispatch(load_test_items_action);
  }, [dispatch, testId]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    const values = Object.values(data);
    const testAnswer = values.map((id) => `${id}`).join("");
    const update_test_action = learnActions.updateTest(
      courseRegistrationId,
      contentViewId,
      testAnswer
    );
    dispatch(update_test_action);
  };

  const handleTimerStart = () => {
    setTestStart(true);
    dispatch(uiActions.setFlashMessage("เริ่มจับเวลาทำแบบทดสอบแล้ว", "info"));
  };

  function renderTestList() {
    if (isTestLoading) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 380 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      );
    } else if (isCompleted) {
      return (
        <Box my={10}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              style={{
                width: "50%",
                minWidth: 220,
                maxWidth: 350,
                marginBottom: 24,
              }}
            >
              <img
                src={HeroImage}
                alt="บันทึกข้อมูลแล้ว"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Typography
              variant="h6"
              color="textPrimary"
              gutterBottom
              style={{ fontSize: "1.7rem", fontWeight: 600 }}
            >
              คุณผ่านเกณฑ์แล้ว
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              <b>ทำแบบทดสอบแล้ว</b> {currentContentView?.testTries} จาก{" "}
              {test?.maxTries} ครั้ง
              <br />
              <b>คะแนนสูงสุดที่ทำได้</b> {currentContentView?.testScore} เต็ม{" "}
              {testItems.length} คะแนน
            </Typography>
          </Grid>
        </Box>
      );
    } else {
      return (
        <>
          <Typography variant="body1" color="textSecondary">
            <b>คำชี้แจง</b> {test?.instruction}
            <br />
            <b>เกณฑ์ผ่าน</b> {test?.minScore} คะแนน
            <br />
            <b>เวลาที่ใช้ทำแบบทดสอบ</b> {test?.minutes} นาที
            <br />
            <b>ทำแบบทดสอบได้ไม่เกิน</b> {test?.maxTries} ครั้ง
          </Typography>
          <Box my={3}>
            <Divider />
          </Box>
          <Typography variant="body1" color="textPrimary">
            <b>ทำแบบทดสอบแล้ว</b>{" "}
            {currentContentView?.testTries ? currentContentView?.testTries : 0}{" "}
            จาก {test?.maxTries} ครั้ง
            <br />
            <b>คะแนนสูงสุดที่ทำได้</b>{" "}
            {currentContentView?.testScore ? currentContentView?.testScore : 0}{" "}
            เต็ม {testItems.length} คะแนน
          </Typography>
          <Box my={3}>
            <Typography
              variant="body2"
              color="error"
              align="center"
              style={{ fontWeight: 600 }}
            >
              โปรดส่งแบบทดสอบก่อนออกจากห้องสอบ
              <br />
              คำตอบของคุณจะถูกบันทึกโดยอัตโนมัติเมื่อหมดเวลา
            </Typography>
          </Box>
          <Box my={3}>
            <Button
              color="secondary"
              variant="contained"
              disabled={testStart}
              startIcon={<TimerIcon />}
              onClick={handleTimerStart}
              fullWidth
            >
              เริ่มจับเวลา และ ทำแบบทดสอบ
            </Button>
          </Box>
          <Collapse in={testStart}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              {testItems.map((testItem) => (
                <Paper
                  key={testItem.id}
                  className={classes.paper}
                  elevation={1}
                >
                  <TestItem {...testItem} register={register} errors={errors} />
                </Paper>
              ))}
              <Box my={6}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  startIcon={<SendIcon />}
                  fullWidth
                >
                  ส่งแบบทดสอบ
                </Button>
              </Box>
            </form>
          </Collapse>
        </>
      );
    }
  }

  return (
    <>
      <Typography
        variant="h6"
        color="textPrimary"
        gutterBottom
        style={{ fontWeight: 600, marginBottom: 16 }}
      >
        {test?.name}
      </Typography>
      {renderTestList()}
    </>
  );
}
