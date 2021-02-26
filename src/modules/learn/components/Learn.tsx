// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useMediaQuery,
  Divider,
  Drawer,
  Grid,
  Typography,
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
  Hidden,
  Toolbar,
  Box,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";

import * as coursesActions from "modules/courses/actions";
import * as registrationsActions from "modules/registrations/actions";
import SideBar from "./SideBar";
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

interface LectureProps {
  content: any;
  id: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="static"
        {...props}
        value={props.value * 1.66666666667}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textPrimary"
        >{`${Math.round(props.value)} วิ`}</Typography>
      </Box>
    </Box>
  );
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textPrimary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Lecture({ content, id }: LectureProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xs"));
  const { id: courseId }: any = useParams();

  const dispatch = useDispatch();
  const [course] = useSelector((state) => state.courses.items);
  const { contents: courseContents } = useSelector((state) => state.courses);
  const { isLoading: isRegistrationsLoading, myCourses } = useSelector(
    (state) => state.registrations
  );
  const courseRegistrationDetails = myCourses.filter(
    (myCourse) => myCourse.courseId === parseInt(courseId)
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

  // const [timer, setTimer] = React.useState(1);
  // const [progress, setProgress] = React.useState(0);

  // React.useEffect(() => {
  //   const round = setInterval(() => {
  //     setTimer((prevTimer) => (prevTimer >= 60 ? 0 : prevTimer + 1));
  //   }, 1000);
  //   return () => {
  //     clearInterval(round);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   const sequence = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 15 ? 0 : prevProgress + 1
  //     );
  //   }, 60000);
  //   return () => {
  //     clearTimeout(sequence);
  //   };
  // }, []);

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
        {/* {content} */}
      </main>
      {/* <div className={classes.mobileSidebarContainer}>
        <SideBarMobile id={id} />
      </div> */}
      {/* <div className={classes.timerContainer}>
        <Box mx={2} mt={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <CircularProgressWithLabel
                value={timer}
                style={{
                  backgroundColor: `${amber[500]}`,
                  borderRadius: "50%",
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" style={{ fontSize: "1rem" }}>
                <Hidden only={["xs"]}>
                  <b>เวลาเรียนสะสม:</b>
                </Hidden>{" "}
                {progress}/15 นาที
              </Typography>
            </Grid>
            <Grid item style={{ width: "100px" }}>
              <LinearProgressWithLabel
                value={(progress / 15) * 100}
                color="secondary"
              />
            </Grid>
          </Grid>
        </Box>
      </div> */}
    </div>
  );
}
