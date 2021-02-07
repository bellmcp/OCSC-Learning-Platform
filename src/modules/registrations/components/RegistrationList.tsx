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
import MyCourseItem from "modules/home/components/MyCourseItem";
import RegistrationItem from "./RegistrationItem";

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
    items: registrations,
  } = useSelector((state) => state.registrations);
  const {
    isLoading: isRegisteredCoursesLoading,
    items: registeredCourses,
  } = useSelector((state) => state.courses);

  useEffect(() => {
    const course_registrations_action = registrationsActions.loadCourseRegistrations();
    dispatch(course_registrations_action);
  }, [dispatch]);

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
                <Box mt={4} mb={3}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.7rem", fontWeight: 600 }}
                    align={matches ? "left" : "center"}
                  >
                    หลักสูตรของฉัน
                  </Typography>
                </Box>

                {isRegistrationsLoading || isRegisteredCoursesLoading ? (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{ height: 380 }}
                  >
                    <CircularProgress color="secondary" />
                  </Grid>
                ) : (
                  <MyCourseItem />
                )}

                <Divider />

                <Box mt={4} mb={3}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.7rem", fontWeight: 600 }}
                    align={matches ? "left" : "center"}
                  >
                    รายวิชาของฉัน
                  </Typography>
                </Box>
                {isRegistrationsLoading || isRegisteredCoursesLoading ? (
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
                    {registeredCourses.map((registeredCourse, id) => (
                      <Grid item key={registeredCourse.id}>
                        <RegistrationItem
                          {...registeredCourse}
                          keyId={id}
                          registrations={registrations}
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
        <Login title="คุณยังไม่ได้เข้าสู่ระบบ" />
      )}
    </>
  );
}
