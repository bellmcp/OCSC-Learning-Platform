// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardArrowDownRounded as ArrowDownIcon } from "@material-ui/icons";
import CourseItem from "./CourseItem";
import CategoryFilter from "modules/categories/components/CategoryFilter";
import { MenuBook as CourseIcon } from "@material-ui/icons";

import * as coursesActions from "../actions";
import * as categoriesActions from "modules/categories/actions";
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  })
);

const TITLE = "รายวิชา";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function CourseList() {
  const classes = useStyles();
  const { search } = useLocation();

  const dispatch = useDispatch();
  const { isLoading, items: courses } = useSelector((state) => state.courses);
  const { items: categories } = useSelector((state) => state.categories);

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
        title={TITLE}
        icon={<CourseIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mb={2}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "1.7rem" }}
                >
                  รายวิชาทั้งหมด
                </Typography>
                <CategoryFilter categories={categories} />
              </Grid>
            </Box>
            {isLoading ? (
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: 407 }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <Grid container spacing={1}>
                {courses.map((course) => (
                  <Grid item key={course.id} xs={12} sm={4} md={3}>
                    <CourseItem {...course} categories={categories} />
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Box mt={6} mb={4}>
                <Button
                  disabled
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ArrowDownIcon />}
                  style={{ borderRadius: 25 }}
                >
                  ดูเพิ่มเติม
                </Button>
              </Box>
            </Grid>
          </main>
        </div>
      </Container>
    </>
  );
}
