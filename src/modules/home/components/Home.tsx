import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Link,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import CategoryFilter from "modules/courses/components/CategoryFilter";
import "pure-react-carousel/dist/react-carousel.es.css";
import { CourseModuleProps } from "../types";
import CourseList from "./CourseList";
import PressList from "modules/press/components/PressList";
import Header from "modules/ui/components/Header";

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

const TITLE = "OCSC Learning Platform";
const SUBTITLE =
  "เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function Home({ curriculum }: CourseModuleProps) {
  const classes = useStyles();
  const { data: user } = useSelector((state: any) => state.user);

  return (
    <>
      <Header
        title={user.firstName ? `สวัสดี ${user.firstName}` : TITLE}
        subtitle={SUBTITLE}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <PressList />

            {/* <Grid
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
            <MyCourseItem isHome /> */}

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
                <CategoryFilter />
              </Grid>
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
                รายวิชา
              </Typography>
              <Link component={RouterLink} to="/courses" underline="hover">
                ดูทั้งหมด {">"}
              </Link>
            </Grid>

            <CourseList />

            {/* 
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
              
              </React.Fragment>
            ))} */}
            {/* 
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
            
              </React.Fragment>
            ))} */}
          </main>
        </div>
      </Container>
    </>
  );
}
