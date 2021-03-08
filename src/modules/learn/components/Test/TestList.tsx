//@ts-nocheck
import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export default function TestList() {
  const classes = useStyles();

  return (
    <>
      {items.map((item, index) => (
        <Paper className={classes.paper} elevation={1}>
          <TestItem {...item} />
        </Paper>
      ))}
    </>
  );
}
