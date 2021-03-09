//@ts-nocheck
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const items = [
  {
    id: 1,
    question: "ตัวอย่างข้อสอบ 1",
    options: ["ตัวเลือก 1", "ตัวเลือก 2", "ตัวเลือก 3", "ตัวเลือก 4"],
    answer: 1,
  },
];

export default function TestList({ activeContentView }: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  return (
    <>
      <Typography variant="body1" color="textSecondary">
        <b>แบบทดสอบ</b> {test?.name}
        <br />
        <b>คำชี้แจง</b> {test?.instruction}
        <br />
        <b>เกณฑ์ผ่าน</b> {test?.minScore} คะแนน
        <br />
        <b>ทำแบบทดสอบได้ไม่เกิน</b> {test?.maxTries} ครั้ง
        <br />
      </Typography>
      {testItems.map((testItem) => (
        <Paper key={testItem.id} className={classes.paper} elevation={1}>
          <TestItem {...testItem} />
        </Paper>
      ))}
    </>
  );
}
