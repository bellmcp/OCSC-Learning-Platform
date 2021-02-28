// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ListSubheader,
  List,
  Typography,
  Divider,
  Box,
  Grid,
  Button,
  Toolbar,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { ArrowBackIos as ArrowBackIcon } from "@material-ui/icons";

import * as registrationsActions from "modules/registrations/actions";
import CourseContentList from "./ContentList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function SideBar({
  course,
  courseContents,
  courseRegistrationDetails,
}: any) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const path = "/learning-platform";
  const [value, setValue] = useState(0);
  const registrationId = courseRegistrationDetails[0]?.id;
  const satisfactionScore = courseRegistrationDetails[0]?.satisfactionScore;

  useEffect(() => {
    setValue(satisfactionScore);
  }, [satisfactionScore]);

  const updateSatisfactionScore = (newValue) => {
    const satisfaction_score_action = registrationsActions.updateCourseSatisfactionScore(
      registrationId,
      newValue
    );
    dispatch(satisfaction_score_action);
    setValue(newValue);
  };

  const linkToLearn = () => {
    history.push(`${path}/learn`);
  };

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" style={{ zIndex: 2 }}>
          <Toolbar />
          <Box mt={1} mb={3}>
            <Button
              variant="text"
              color="default"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={linkToLearn}
            >
              ออกจากห้องเรียน
            </Button>
            <Box mt={1} mx={2}>
              <Typography
                color="textPrimary"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  lineHeight: "1.2",
                }}
                gutterBottom
              >
                {course?.name ? course?.name : "รายวิชา"}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {course?.code ? course?.code : "รหัสวิชา"}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </ListSubheader>
      }
      className={classes.root}
      dense
    >
      <CourseContentList courseContents={courseContents} />
      <Divider variant="middle" />
      <Box my={4}>
        <Grid container justify="center" direction="column" alignItems="center">
          <Grid item>
            <Typography
              component="p"
              variant="body2"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              โปรดให้คะแนนรายวิชา
            </Typography>
          </Grid>
          <Grid item>
            <Rating
              name="size-large"
              value={value}
              size="large"
              onChange={(event, newValue) => {
                updateSatisfactionScore(newValue);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </List>
  );
}
