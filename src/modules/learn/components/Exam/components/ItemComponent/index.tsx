import Avatar from "@material-ui/core/Avatar";
import amber from "@material-ui/core/colors/amber";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ItemProps } from "./types";

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

export default function ItemComponent({
  id,
  question,
  options,
  answer,
}: ItemProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
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
            {question}?
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
    </React.Fragment>
  );
}
