// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Link,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import CategoryFilter from "modules/categories/components/CategoryFilter";
import "pure-react-carousel/dist/react-carousel.es.css";

import * as pressesActions from "modules/press/actions";
import * as coursesActions from "modules/courses/actions";
import * as categoriesActions from "modules/categories/actions";
import CourseCarousel from "modules/courses/components/CourseCarousel";
import PressCarousel from "modules/press/components/PressCarousel";
import Header from "modules/ui/components/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
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

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { items: users } = useSelector((state) => state.user);
  const { isLoading: isPressesLoading, items: presses } = useSelector(
    (state) => state.press
  );
  const { isLoading: isCoursesLoading, items: courses } = useSelector(
    (state) => state.courses
  );
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const presses_action = pressesActions.loadPresses();
    dispatch(presses_action);
  }, [dispatch]);

  useEffect(() => {
    const courses_action = coursesActions.loadCourses(search);
    dispatch(courses_action);
  }, [dispatch, search]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  return (
    <>
      <Header
        title={users.firstName ? `สวัสดี ${users.firstName}` : TITLE}
        subtitle={SUBTITLE}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container maxWidth="lg" className={classes.content}>
        <PressCarousel presses={presses} isLoading={isPressesLoading} />
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
          <Grid container direction="row" justify="center" alignItems="center">
            <CategoryFilter categories={categories} />
          </Grid>
        </Box>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h6" style={{ fontSize: "1.7rem" }}>
            รายวิชา
          </Typography>
          <Link component={RouterLink} to="/courses" underline="hover">
            ดูทั้งหมด {">"}
          </Link>
        </Grid>

        <CourseCarousel
          courses={courses}
          categories={categories}
          isLoading={isCoursesLoading}
        />

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
      </Container>
    </>
  );
}
