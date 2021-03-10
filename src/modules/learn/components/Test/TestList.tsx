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
import TestItem from "./TestItem";

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
}: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const testId = activeContentView.testId1;

  const { isLoading: isTestLoading, test, testItems } = useSelector(
    (state) => state.learn
  );
  console.log(testItems);

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
    alert("testAnswer: " + testAnswer);
  };

  return (
    <>
      {isTestLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 380 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <Typography
            variant="h6"
            color="textPrimary"
            gutterBottom
            style={{ fontWeight: 600, marginBottom: 16 }}
          >
            {test?.name}
          </Typography>
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
            <b>คะแนนสูงสุดที่ทำได้</b> 0 คะแนน
            <br />
            <b>ทำแบบทดสอบแล้ว</b> 0 ครั้ง
          </Typography>
          <Box my={3}>
            <Button
              color="secondary"
              variant="contained"
              disabled={testStart}
              startIcon={<TimerIcon />}
              onClick={() => {
                setTestStart(true);
              }}
              fullWidth
            >
              เริ่มทำแบบทดสอบ
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
      )}
    </>
  );
}
