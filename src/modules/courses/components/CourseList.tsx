// @ts-nocheck
import React, { useEffect } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  useMediaQuery,
  Typography,
  Box,
  Container,
  Grid,
} from "@material-ui/core";
import { MenuBook as CourseIcon } from "@material-ui/icons";

import * as coursesActions from "../actions";
import * as categoriesActions from "modules/categories/actions";
import CourseItem from "./CourseItem";
import CategoryFilter from "modules/categories/components/CategoryFilter";
import Header from "modules/ui/components/Header";
import Loading from "modules/ui/components/Loading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
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

export default function CourseList() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { search } = useLocation();
  const { courseCategoryId } = queryString.parse(search);

  const dispatch = useDispatch();
  const { isLoading, items: courses } = useSelector((state) => state.courses);
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const courses_action = coursesActions.loadCourses(courseCategoryId);
    dispatch(courses_action);
  }, [dispatch, courseCategoryId]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  function renderFilteredResult() {
    if (isLoading) {
      return <Loading height={400} />;
    } else if (courses.length === 0) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 411 }}
        >
          <Typography component="h2" variant="body1" color="textSecondary">
            ไม่พบผลลัพธ์การค้นหา
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={1}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={4} md={3}>
              <CourseItem {...course} categories={categories} />
            </Grid>
          ))}
        </Grid>
      );
    }
  }

  return (
    <>
      <Header
        title="รายวิชา"
        icon={<CourseIcon fontSize="large" style={{ marginRight: "24px" }} />}
      />
      <Container maxWidth="lg">
        <div className={classes.content}>
          <Box mb={2}>
            <Grid
              container
              direction={matches ? "row" : "column"}
              justify={matches ? "space-between" : "center"}
              alignItems={matches ? "flex-end" : "center"}
            >
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{
                    fontSize: "1.7rem",
                    marginBottom: 0,
                    fontWeight: 600,
                  }}
                >
                  รายวิชาทั้งหมด
                </Typography>
              </Grid>
              {matches && (
                <Grid item>
                  <CategoryFilter categories={categories} />
                </Grid>
              )}
            </Grid>
            {!matches && (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CategoryFilter categories={categories} />
              </Grid>
            )}
          </Box>
          {renderFilteredResult()}
        </div>
      </Container>
    </>
  );
}
