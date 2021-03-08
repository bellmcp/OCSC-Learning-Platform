//@ts-nocheck
import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import EvaluationItem from "./EvaluationItem";

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
    question: "ตัวอย่างแบบประเมิน",
    options: [
      "ตัวเลือก 1",
      "ตัวเลือก 2",
      "ตัวเลือก 3",
      "ตัวเลือก 4",
      "ตัวเลือก 5",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "ข้อเสนอแนะเพิ่มเติม",
  },
];

export default function EvaluationList() {
  const classes = useStyles();

  return (
    <>
      {items.map((item, index) => (
        <Paper className={classes.paper} elevation={1}>
          <EvaluationItem {...item} />
        </Paper>
      ))}
    </>
  );
}
