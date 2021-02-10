// @ts-nocheck
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useMediaQuery,
  Typography,
  Container,
  Grid,
  Box,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { PlayArrow as LearnIcon } from "@material-ui/icons";

import * as registrationsActions from "modules/registrations/actions";
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { items: users } = useSelector((state: any) => state.user);
  const {
    isLoading: isRegistrationsLoading,
    myCourses: myCoursesRegistrations,
    myCurriculums: myCurriculumsRegistrations,
  } = useSelector((state) => state.registrations);
  const { isLoading: isMyCoursesLoading, items: myCurriculums } = useSelector(
    (state) => state.curriculums
  );
  const { isLoading: isMyCurriculumsLoading, items: myCourses } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    const course_registrations_action = registrationsActions.loadCourseRegistrations();
    dispatch(course_registrations_action);
  }, [dispatch]);

  useEffect(() => {
    const curriculum_registrations_action = registrationsActions.loadCurriculumRegistrations();
    dispatch(curriculum_registrations_action);
  }, [dispatch]);

  const individualCourses = myCoursesRegistrations.filter(
    (myCoursesRegistration) =>
      myCoursesRegistration.curriculumRegistrationId === null
  );
  const individualCoursesIds = individualCourses.map(
    (individualCourse) => individualCourse.courseId
  );
  const individualCoursesList = myCourses.filter((myCourse) =>
    individualCoursesIds.includes(myCourse.id)
  );
  const childCoursesList = myCourses.filter(
    (myCourse) => !individualCoursesIds.includes(myCourse.id)
  );

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

                {isRegistrationsLoading || isMyCurriculumsLoading ? (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ height: 380 }}
                  >
                    <CircularProgress color="secondary" />
                  </Grid>
                ) : (
                  <Grid container direction="column" spacing={2}>
                    {myCurriculums.map((myCurriculum, id) => (
                      <Grid item key={myCurriculum.id}>
                        <MyCurriculumItem
                          {...myCurriculum}
                          keyId={id}
                          registrations={myCurriculumsRegistrations}
                          childCourses={childCoursesList}
                          myCoursesRegistrations={myCoursesRegistrations}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}

                <Box mt={5} mb={4}>
                  <Divider />
                </Box>

                <Box mb={3}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.7rem", fontWeight: 600 }}
                    align={matches ? "left" : "center"}
                  >
                    รายวิชาของฉัน
                  </Typography>
                </Box>
                {isRegistrationsLoading || isMyCoursesLoading ? (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ height: 380 }}
                  >
                    <CircularProgress color="secondary" />
                  </Grid>
                ) : (
                  <Grid container direction="column" spacing={2}>
                    {individualCoursesList.map((myCourse, id) => (
                      <Grid item key={myCourse.id}>
                        <MyCourseItem
                          {...myCourse}
                          keyId={id}
                          registrations={myCoursesRegistrations}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
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
