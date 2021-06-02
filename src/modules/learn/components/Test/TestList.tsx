//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Prompt } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send as SendIcon, Timer as TimerIcon } from "@material-ui/icons";

import * as uiActions from "modules/ui/actions";
import * as learnActions from "modules/learn/actions";
import TestItem from "./TestItem";
import Loading from "modules/ui/components/Loading";

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
  userTestAnswers,
  setUserTestAnswers,
  contentId,
}: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, getValues } = useForm();
  // const isFormError = Object.keys(errors).length !== 0;

  const testId = activeContentView.testId1;
  const isCompleted = currentContentView?.isCompleted;

  const [contentViewId, setContentViewId] = useState(0);
  const [courseRegistrationId, setCourseRegistrationId] = useState(0);
  const [testMaxTries, setTestMaxTries] = useState(0);
  const [initialTestTries, setInitialTestTries] = useState(0);
  const [initialTestScore, setInitialTestScore] = useState(0);

  const {
    isLoading: isTestLoading,
    test,
    testItems,
  } = useSelector((state) => state.learn);

  useEffect(() => {
    setInitialTestTries(currentContentView?.testTries);
  }, [currentContentView, contentId]);

  useEffect(() => {
    setTestMaxTries(test?.maxTries);
  }, [currentContentView, contentId, test]);

  useEffect(() => {
    setInitialTestScore(currentContentView?.testScore);
  }, [currentContentView, contentId]);

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

  const handleTimerStart = () => {
    if (initialTestTries + 1 <= testMaxTries) {
      setTestStart(true);
      setInitialTestTries(initialTestTries + 1);
      const update_test_tries_action = learnActions.updateTestTries(
        courseRegistrationId,
        contentViewId
      );
      dispatch(update_test_tries_action);
    } else {
      dispatch(
        uiActions.setFlashMessage(
          "คุณทำแบบทดสอบครบจำนวนครั้งที่กำหนดแล้ว โปรดตรวจสอบอีกครั้ง",
          "error"
        )
      );
    }
  };

  const handleFormChange = () => {
    const formValues = Object.values(getValues());
    const answerValues = formValues.map((answer) => (answer ? answer : "0"));
    const testAnswers = answerValues
      .map((testAnswer) => `${testAnswer}`)
      .join("");
    setUserTestAnswers(testAnswers);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const update_test_action = learnActions.updateTest(
      courseRegistrationId,
      contentViewId,
      userTestAnswers
    );
    dispatch(update_test_action);
  };

  function renderTestList() {
    if (isTestLoading) {
      return <Loading height={380} />;
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
                minWidth: 200,
                maxWidth: 300,
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
              style={{ fontWeight: 600 }}
            >
              คุณผ่านเกณฑ์แล้ว
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              <b>ทำแบบทดสอบ</b> {initialTestTries} จาก {testMaxTries} ครั้ง
              <br />
              <b>คะแนนสูงสุดที่ทำได้</b> {initialTestScore} เต็ม{" "}
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
            <b>ทำแบบทดสอบได้ไม่เกิน</b> {testMaxTries} ครั้ง
          </Typography>
          <Box my={3}>
            <Divider />
          </Box>
          <Typography variant="body1" color="textPrimary">
            <b>ทำแบบทดสอบแล้ว</b> {initialTestTries ? initialTestTries : 0} จาก{" "}
            {testMaxTries} ครั้ง
            <br />
            <b>คะแนนสูงสุดที่ทำได้</b> {initialTestScore ? initialTestScore : 0}{" "}
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
              onSubmit={handleSubmit}
              onChange={handleFormChange}
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
                  onClick={handleFormSubmit}
                  disabled={userTestAnswers.includes("0")}
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
      <Prompt
        when={testStart}
        message="คุณแน่ใจใช่ไหมว่าต้องการออกจากห้องสอบ หากคุณเริ่มจับเวลาแล้ว จำนวนครั้งที่ทำแบบทดสอบจะถูกนับ"
      />
      <Typography
        variant="h6"
        color="textPrimary"
        gutterBottom
        style={{ fontWeight: 600, marginBottom: 16, lineHeight: "1.3" }}
      >
        {test?.name}
      </Typography>
      {renderTestList()}
    </>
  );
}
