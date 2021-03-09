//@ts-nocheck
import React from "react";
import {
  Avatar,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    amber: {
      color: theme.palette.getContrastText(amber[500]),
      backgroundColor: amber[500],
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    options: {
      padding: theme.spacing(1.5),
    },
  })
);

export default function EvaluationItem({
  id,
  question,
  choice1,
  choice2,
  choice3,
  choice4,
  choice5,
  register,
  errors,
}) {
  const classes = useStyles();
  const choices = [
    { id: 1, option: choice1 },
    { id: 2, option: choice2 },
    { id: 3, option: choice3 },
    { id: 4, option: choice4 },
    { id: 5, option: choice5 },
  ];

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar className={classes.amber}>{id}</Avatar>
        </Grid>
        <Grid item>
          <Typography
            component="h1"
            variant="body1"
            color="textPrimary"
            style={{ fontWeight: 600 }}
          >
            {question}
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />

      <FormControl component="fieldset">
        <RadioGroup aria-label={question} name={question}>
          <Grid className={classes.options} container spacing={0}>
            {choices.map((choice) => (
              <Grid item xs={12}>
                <FormControlLabel
                  name={`evaluationAnswer${id}`}
                  id={`evaluationAnswer${id}`}
                  value={choice.id.toString()}
                  inputRef={register()}
                  control={<Radio />}
                  label={choice.option}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </>
  );
}
