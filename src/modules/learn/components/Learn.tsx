// @ts-nocheck
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  useMediaQuery,
  Divider,
  Drawer,
  Toolbar,
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { Bookmarks as ArrowUpIcon } from "@material-ui/icons";

import * as learnActions from "../actions";
import * as coursesActions from "modules/courses/actions";
import * as registrationsActions from "modules/registrations/actions";
import SideBar from "./SideBar";
import SideBarMobile from "./SideBarMobile";
import ContentView from "./ContentView";
import Timer from "./Timer";

const DRAWER_WIDTH = 300;
const FOOTER_HEIGHT = 60;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    drawer: {
      display: "unset",
      width: DRAWER_WIDTH,
      flexShrink: 0,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1),
      position: "relative",
      marginBottom: FOOTER_HEIGHT,
    },
    bottom: {
      position: "sticky",
      bottom: 0,
      width: "100%",
    },
    timerWrapper: {
      position: "fixed",
      height: FOOTER_HEIGHT,
      bottom: 0,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      backgroundColor: theme.palette.background.paper,
      marginLeft: DRAWER_WIDTH,
      zIndex: 1201,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginLeft: "0",
      },
    },
    fab: {
      display: "none",
      position: "fixed",
      bottom: FOOTER_HEIGHT + theme.spacing(3),
      right: theme.spacing(3),
      // left: "calc(50% - 24px)",
      zIndex: 1202,
      [theme.breakpoints.down("xs")]: {
        display: "inherit",
      },
    },
  })
);

export default function Learn() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const path = "/learning-platform";
  const matches = useMediaQuery(theme.breakpoints.up("xs"));
  const { id: courseId }: any = useParams();
  const { search } = useLocation();
  const { contentId } = queryString.parse(search);
  const dispatch = useDispatch();

  const [course] = useSelector((state) => state.courses.items);
  var { contents: courseContents } = useSelector((state) => state.courses);
  const { myCourses } = useSelector((state) => state.registrations);
  const { contentViews } = useSelector((state) => state.learn);
  if (courseContents.length === 0) {
    courseContents = [];
  }
  const { sessions: currentSession } = useSelector((state) => state.learn);

  const courseRegistrationDetails = myCourses.filter(
    (myCourse) => myCourse.courseId === parseInt(courseId)
  );
  const courseRegistrationId = courseRegistrationDetails[0]?.id;
  const activeContentView = courseContents.filter(
    (courseContent) => courseContent.id === parseInt(contentId)
  );
  const currentContentView = contentViews.filter(
    (contentView) => contentView.courseContentId === parseInt(contentId)
  );

  useEffect(() => {
    const courses_action = coursesActions.loadCourse(courseId);
    dispatch(courses_action);
  }, [dispatch, courseId]);

  useEffect(() => {
    const course_content_action = coursesActions.loadCourseContents(courseId);
    dispatch(course_content_action);
  }, [dispatch, courseId]);

  useEffect(() => {
    const course_registrations_action = registrationsActions.loadCourseRegistrations();
    dispatch(course_registrations_action);
  }, [dispatch]);

  useEffect(() => {
    const content_view_action = learnActions.loadContentViews(
      courseRegistrationId
    );
    dispatch(content_view_action);
  }, [dispatch, courseRegistrationId]);

  useEffect(() => {
    const create_session_action = learnActions.createSession();
    if (contentId !== undefined) {
      dispatch(create_session_action);
    }
  }, [dispatch, contentId]);

  const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
  const handleMobileDialogOpen = () => {
    setMobileDialogOpen(true);
  };
  const handleMobileDialogClose = () => {
    setMobileDialogOpen(false);
  };

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };
  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const linkToLearn = () => {
    handleConfirmDialogClose();
    history.push(`${path}/learn`);
  };

  return (
    <div className={classes.root}>
      <Toolbar />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Divider />
        <SideBar
          course={course}
          courseContents={courseContents}
          contentViews={contentViews}
          courseRegistrationDetails={courseRegistrationDetails}
          handleConfirmDialogOpen={handleConfirmDialogOpen}
        />
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <ContentView
          contentId={contentId}
          activeContentView={activeContentView[0]}
          currentContentView={currentContentView[0]}
          courseRegistrationDetails={courseRegistrationDetails}
          currentSession={currentSession}
        />
      </main>
      {/* MOBILE NAVIGATION */}
      <Fab
        color="primary"
        aria-label="สารบัญ"
        className={classes.fab}
        onClick={handleMobileDialogOpen}
      >
        <ArrowUpIcon />
      </Fab>
      <SideBarMobile
        mobileDialogOpen={mobileDialogOpen}
        handleMobileDialogClose={handleMobileDialogClose}
        course={course}
        courseContents={courseContents}
        contentViews={contentViews}
        courseRegistrationDetails={courseRegistrationDetails}
        handleConfirmDialogOpen={handleConfirmDialogOpen}
      />
      {/* CONFIRM DIALOG */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"คุณต้องการออกจากห้องเรียนใช่ไหม?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            เวลาเรียนสะสมของคุณจะถูกบันทึก
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            ยกเลิก
          </Button>
          <Button
            color="secondary"
            autoFocus
            variant="contained"
            disableElevation
            onClick={linkToLearn}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
      {/* TIMER */}
      {contentId !== undefined ? (
        <div className={classes.timerWrapper}>
          <Box mx={2} mt={1}>
            <Timer
              contentId={contentId}
              activeContentView={activeContentView}
              currentContentView={currentContentView[0]}
              courseRegistrationDetails={courseRegistrationDetails}
            />
          </Box>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
