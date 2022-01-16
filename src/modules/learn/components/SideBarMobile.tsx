//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
  List,
  ListSubheader,
  Divider,
  Grid,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  KeyboardArrowDown as CloseIcon,
  ExitToApp as ArrowBackIcon,
} from '@material-ui/icons';

import * as uiActions from 'modules/ui/actions';
import CourseContentList from './ContentList';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SideBarMobile({
  mobileDialogOpen,
  handleMobileDialogClose,
  course,
  courseContents,
  contentViews,
  courseRegistrationDetails,
  contentListProgress,
  setContentListProgress,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const registrationId = courseRegistrationDetails[0]?.id;
  const satisfactionScore = courseRegistrationDetails[0]?.satisfactionScore;

  useEffect(() => {
    setValue(satisfactionScore);
  }, [satisfactionScore]);

  const updateSatisfactionScore = (newValue) => {
    const satisfaction_score_action =
      registrationsActions.updateCourseSatisfactionScore(
        registrationId,
        newValue
      );
    dispatch(satisfaction_score_action);
    setValue(newValue);
  };

  const openConfirmDialog = () => {
    const learn_exit_dialog_action = uiActions.setLearnExitDialog(true);
    dispatch(learn_exit_dialog_action);
  };

  return (
    <Dialog
      fullScreen
      open={mobileDialogOpen}
      onClose={handleMobileDialogClose}
      TransitionComponent={Transition}
    >
      <AppBar
        className={classes.appBar}
        color="secondary"
        style={{ position: 'fixed' }}
      >
        <Toolbar>
          <Button
            autoFocus
            color="inherit"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={openConfirmDialog}
          >
            ออกจากห้องเรียน
          </Button>
          <div className={classes.grow} />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMobileDialogClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            style={{
              zIndex: 2,
              backgroundColor: 'white',
              paddingTop: 54,
            }}
          >
            <Box mt={4} mb={3}>
              <Typography
                color="textPrimary"
                align="center"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  lineHeight: '1.2',
                }}
                gutterBottom
              >
                {course?.name ? course?.name : 'รายวิชา'}
              </Typography>
              <Typography variant="body1" color="textPrimary" align="center">
                {course?.code ? course?.code : 'รหัสวิชา'}
              </Typography>
            </Box>
            <Divider />
          </ListSubheader>
        }
        dense
      >
        <CourseContentList
          courseContents={courseContents}
          contentViews={contentViews}
          handleMobileDialogClose={handleMobileDialogClose}
          contentListProgress={contentListProgress}
          setContentListProgress={setContentListProgress}
        />
        <Divider variant="middle" />
        <Box my={4}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
          >
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
    </Dialog>
  );
}
