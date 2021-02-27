// @ts-nocheck
import React, { useEffect } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  useMediaQuery,
  Divider,
  Drawer,
  Toolbar,
  Box,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

import * as coursesActions from "modules/courses/actions";
import * as registrationsActions from "modules/registrations/actions";
import SideBar from "./SideBar";
import ContentView from "./ContentView";
import Timer from "./Timer";
import SideBarMobile from "./SideBarMobile";

const drawerWidth = 300;
const footerHeight = 60;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      display: "unset",
      width: drawerWidth,
      flexShrink: 0,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1),
      position: "relative",
      marginBottom: footerHeight,
    },
    bottom: {
      position: "sticky",
      bottom: 0,
      width: "100%",
    },
    timerContainer: {
      position: "fixed",
      height: footerHeight,
      bottom: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      backgroundColor: theme.palette.background.paper,
      marginLeft: drawerWidth,
      zIndex: 1201,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginLeft: "0",
      },
    },
    mobileSidebarContainer: {
      position: "fixed",
      display: "none",
      height: "25vh",
      width: "100%",
      bottom: 0,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      backgroundColor: theme.palette.background.paper,
      marginLeft: "0",
      marginBottom: footerHeight,
      zIndex: 1201,
      overflow: "auto",
      boxShadow: "0 -5px 5px -5px rgba(0, 0, 0, 0.342)",
      [theme.breakpoints.down("xs")]: {
        display: "unset",
      },
    },
  })
);

export default function Learn() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xs"));
  const { id: courseId }: any = useParams();
  const { search } = useLocation();
  const { contentId } = queryString.parse(search);

  const dispatch = useDispatch();
  const [course] = useSelector((state) => state.courses.items);
  var { contents: courseContents } = useSelector((state) => state.courses);
  const { myCourses } = useSelector((state) => state.registrations);
  const courseRegistrationDetails = myCourses.filter(
    (myCourse) => myCourse.courseId === parseInt(courseId)
  );
  if (courseContents.length === 0) {
    courseContents = [];
  }
  const activeContentView = courseContents.filter(
    (courseContent) => courseContent.id === parseInt(contentId)
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
          courseRegistrationDetails={courseRegistrationDetails}
        />
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <ContentView
          contentId={contentId}
          activeContentView={activeContentView[0]}
        />
      </main>
      {/* <div className={classes.mobileSidebarContainer}>
        <SideBarMobile id={id} />
      </div> */}
      <div className={classes.timerContainer}>
        <Box mx={2} mt={1}>
          <Timer />
        </Box>
      </div>
    </div>
  );
}