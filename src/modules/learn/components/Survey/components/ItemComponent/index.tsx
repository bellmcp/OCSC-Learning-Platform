import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import amber from "@material-ui/core/colors/amber";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
        {options ? (
          <FormControl component="fieldset">
            <RadioGroup aria-label={question} name={question}>
              <Grid
                container
                spacing={4}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="stretch"
                wrap="nowrap"
                className={classes.options}
              >
                {options.map((option) => (
                  <Grid item>
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
        ) : (
          <Box mt={3} mb={2}>
            <div>
              <TextField
                id="outlined-basic"
                placeholder="แสดงความคิดเห็น"
                variant="outlined"
                color="secondary"
                fullWidth
                multiline
              />
            </div>
          </Box>
        )}
      </form>
    </React.Fragment>
  );
}
