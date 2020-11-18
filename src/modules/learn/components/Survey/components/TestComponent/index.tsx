import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ItemComponent from "../ItemComponent";

import { TestProps } from "./types";

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

export default function TestComponent({ items }: TestProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {items.map((item, index) => (
        <Paper className={classes.paper} elevation={1}>
          <ItemComponent
            key={index}
            id={item.id}
            question={item.question}
            options={item.options}
            answer={item.answer}
          />
        </Paper>
      ))}
    </React.Fragment>
  );
}
