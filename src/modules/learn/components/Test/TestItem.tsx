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

export default function TestItem({ id, question, options }) {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar className={classes.amber}>{id}</Avatar>
        </Grid>
        <Grid item>
          <Typography
            component="h1"
            variant="h6"
            align="center"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            {question}
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <form>
        <FormControl component="fieldset">
          <RadioGroup aria-label={question} name={question}>
            <Grid className={classes.options} container spacing={0}>
              {options.map((option) => (
                <Grid item xs={12}>
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={
                      <Typography style={{ fontSize: "0.9rem" }}>
                        {option}
                      </Typography>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </form>
    </>
  );
}