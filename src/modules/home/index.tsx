import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "pure-react-carousel/dist/react-carousel.es.css";
import React from "react";
import Footer from "../root/components/Footer";
import Header from "../root/components/Header";
import NavigationBar from "../root/components/NavigationBar";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import CourseCarousel from "./components/CourseCarousel";

import { CourseModuleProps } from "./types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { NavLink as Link } from "react-router-dom";

import MyCourseItem from "./components/MyCourseItem";
import CourseFilter from "../courses/components/CourseFilter";

const heroImage = require("../../assets/images/root/hero-min.jpg");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  })
);

export default function Home({
  announcements,
  courses,
  curriculum,
}: CourseModuleProps) {
  const classes = useStyles();
  const title = "OCSC Learning Platform";
  const subtitle =
    "เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={0} />
      <Header title={title} subtitle={subtitle} imageUrl={heroImage} />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <AnnouncementCarousel announcements={announcements} />

            <Box my={3}>
              <Divider />
            </Box>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography
                gutterBottom
                variant="h6"
                style={{ fontSize: "1.7rem" }}
              >
                วิชาที่เรียนล่าสุด
              </Typography>
              <Link
                to="/learn"
                style={{ color: "inherit", fontSize: "0.9rem" }}
              >
                ดูทั้งหมด {">"}
              </Link>
            </Grid>
            <MyCourseItem isHome />

            {courses.map((item, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <React.Fragment>
                    <Box mt={3} mb={2}>
                      <Divider />
                    </Box>
                    <Box mb={2}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <CourseFilter />
                      </Grid>
                    </Box>
                  </React.Fragment>
                ) : null}

                {index === 0 ? null : (
                  <Box my={3}>
                    <Divider />
                  </Box>
                )}

                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.7rem" }}
                  >
                    {item.name}
                  </Typography>
                  <Link
                    to="/courses"
                    style={{ color: "inherit", fontSize: "0.9rem" }}
                  >
                    ดูทั้งหมด {">"}
                  </Link>
                </Grid>
                <CourseCarousel courses={item.courses} />
              </React.Fragment>
            ))}

            {curriculum.map((item, index) => (
              <React.Fragment key={index}>
                <Box my={3}>
                  <Divider />
                </Box>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "1.7rem" }}
                  >
                    {item.name}
                  </Typography>
                  <Link
                    to="/curriculum"
                    style={{ color: "inherit", fontSize: "0.9rem" }}
                  >
                    ดูทั้งหมด {">"}
                  </Link>
                </Grid>
                <CourseCarousel courses={item.curricula} isCurriculum />
              </React.Fragment>
            ))}
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
