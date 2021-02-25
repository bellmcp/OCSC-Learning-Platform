// @ts-nocheck
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import { useHistory } from "react-router-dom";
import {
  useMediaQuery,
  Typography,
  Container,
  Grid,
  Box,
  Divider,
  CircularProgress,
  Button,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { PlayArrow as LearnIcon } from "@material-ui/icons";

import * as registrationsActions from "../actions";
import Header from "modules/ui/components/Header";
import Login from "modules/login/components/Login";
import MyCurriculumItem from "./MyCurriculumItem";
import MyCourseItem from "./MyCourseItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
    },
    root: {
      display: "flex",
    },
    details: {
      height: "100px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(0),
    },
    content: {
      width: "100%",
      marginBottom: 50,
    },
    cover: {
      width: "25%",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    cardImage: {
      width: "150px",
      borderRadius: "4 0 0 0",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

const TITLE = "เข้าเรียน";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function RegistrationList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const path = "/learning-platform";
  const token = getCookie("token");
  console.log(parseJwt(token).unique_name);

  const { items: users } = useSelector((state: any) => state.user);
  const {
    isLoading: isRegistrationsLoading,
    myCourses,
    myCurriculums,
  } = useSelector((state) => state.registrations);

  useEffect(() => {
    const course_registrations_action = registrationsActions.loadCourseRegistrations();
    dispatch(course_registrations_action);
  }, [dispatch]);

  useEffect(() => {
    const curriculum_registrations_action = registrationsActions.loadCurriculumRegistrations();
    dispatch(curriculum_registrations_action);
  }, [dispatch]);

  const linkToCourses = () => {
    history.push(`${path}/courses`);
  };

  const linkToCurriculums = () => {
    history.push(`${path}/curriculums`);
  };

  function renderRegisteredCurriculumsList() {
    if (false) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 380 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      );
    } else if (myCurriculums.length === 0) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: 160 }}
        >
          <Typography component="h2" variant="body1" color="textSecondary">
            คุณยังไม่ได้ลงทะเบียนหลักสูตร
          </Typography>
          <Box mt={2} mb={4}>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: 200 }}
              onClick={linkToCurriculums}
            >
              ดูหลักสูตรทั้งหมด
            </Button>
          </Box>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="column" spacing={2}>
          {myCurriculums.map((myCurriculum) => (
            <Grid item key={myCurriculum.id}>
              <MyCurriculumItem {...myCurriculum} myCourses={myCourses} />
            </Grid>
          ))}
        </Grid>
      );
    }
  }

  function renderRegisteredCoursesList() {
    if (isRegistrationsLoading) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 380 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      );
    } else if (
      myCourses.filter((myCourse) => myCourse.curriculumRegistrationId === null)
        .length === 0
    ) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: 160 }}
        >
          <Typography component="h2" variant="body1" color="textSecondary">
            คุณยังไม่ได้ลงทะเบียนรายวิชา
          </Typography>
          <Box mt={2} mb={4}>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: 200 }}
              onClick={linkToCourses}
            >
              ดูรายวิชาทั้งหมด
            </Button>
          </Box>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="column" spacing={2}>
          {myCourses
            .filter((myCourse) => myCourse.curriculumRegistrationId === null)
            .map((myCourse) => (
              <Grid item key={myCourse.id}>
                <MyCourseItem {...myCourse} />
              </Grid>
            ))}
        </Grid>
      );
    }
  }

  return (
    <>
      {users.length !== 0 ? (
        <>
          <Header
            title={TITLE}
            icon={
              <LearnIcon fontSize="large" style={{ marginRight: "24px" }} />
            }
            imageUrl={HERO_IMAGE_URL}
          />
          <Container>
            <div className={classes.main}>
              <main className={classes.content}>
                <Box my={4}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.7rem", fontWeight: 600 }}
                    align={matches ? "left" : "center"}
                  >
                    หลักสูตรของฉัน
                  </Typography>
                </Box>
                {renderRegisteredCurriculumsList()}
                <Box mt={4} mb={3}>
                  <Divider />
                </Box>
                <Box my={3}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.7rem", fontWeight: 600 }}
                    align={matches ? "left" : "center"}
                  >
                    รายวิชาของฉัน
                  </Typography>
                </Box>
                {renderRegisteredCoursesList()}
              </main>
            </div>
          </Container>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
