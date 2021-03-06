// @ts-nocheck
import React, { useEffect, useState } from "react";
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
  Divider,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

import * as coursesActions from "modules/courses/actions";
import * as curriculumActions from "modules/curriculums/actions";
import * as categoriesActions from "modules/categories/actions";
import CourseItem from "modules/courses/components/CourseItem";
import CurriculumItem from "modules/curriculums/components/CurriculumItem";
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

export default function SearchResult() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { search } = useLocation();
  var { query } = queryString.parse(search);

  if (query === undefined) {
    query = "";
  }

  const dispatch = useDispatch();
  const { isLoading: isCoursesLoading, items: courses } = useSelector(
    (state) => state.courses
  );
  const { isLoading: isCurriculumsLoading, items: curriculums } = useSelector(
    (state) => state.curriculums
  );
  const { items: categories } = useSelector((state) => state.categories);

  const [filteredCourseResults, setFilteredCourseResults] = useState([]);
  const [filteredCurriculumResults, setFilteredCurriculumResults] = useState(
    []
  );

  useEffect(() => {
    setFilteredCourseResults(
      courses.filter((course) => {
        return course.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, [courses, query]);

  useEffect(() => {
    setFilteredCurriculumResults(
      curriculums.filter((curriculum) => {
        return curriculum.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, [curriculums, query]);

  useEffect(() => {
    const courses_action = coursesActions.loadCourses();
    dispatch(courses_action);
  }, [dispatch]);

  useEffect(() => {
    const curriculums_action = curriculumActions.loadCurriculums("");
    dispatch(curriculums_action);
  }, [dispatch]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  function renderFilteredCoursesResult() {
    if (isCoursesLoading) {
      return <Loading height={400} />;
    } else if (filteredCourseResults.length === 0) {
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
          {filteredCourseResults.map((course) => (
            <Grid item key={course.id} xs={12} sm={4} md={3}>
              <CourseItem {...course} categories={categories} />
            </Grid>
          ))}
        </Grid>
      );
    }
  }

  function renderFilteredCurriculumsResult() {
    if (isCurriculumsLoading) {
      return <Loading height={400} />;
    } else if (filteredCurriculumResults.length === 0) {
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
          {filteredCurriculumResults.map((curriculum) => (
            <Grid item key={curriculum.id} xs={12} sm={4} md={3}>
              <CurriculumItem {...curriculum} />
            </Grid>
          ))}
        </Grid>
      );
    }
  }

  return (
    <>
      <Header
        title="ผลการค้นหา"
        icon={<SearchIcon fontSize="large" style={{ marginRight: "24px" }} />}
      />
      <Container maxWidth="lg">
        <main className={classes.content}>
          <Box mt={3} mb={2}>
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
                  align="center"
                  style={{
                    fontSize: "1.7rem",
                    marginBottom: matches ? 0 : 16,
                    lineHeight: 1,
                    fontWeight: 600,
                  }}
                >
                  {query
                    ? `รายวิชาที่เกี่ยวข้องกับ '${query}'`
                    : "รายวิชาทั้งหมด"}
                </Typography>
              </Grid>
              {matches && (
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    ผลการค้นหา {filteredCourseResults.length} รายการ
                  </Typography>
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
                <Typography variant="body2" color="textSecondary">
                  ผลการค้นหา {filteredCourseResults.length} รายการ
                </Typography>
              </Grid>
            )}
          </Box>
          {renderFilteredCoursesResult()}
          <Box my={5}>
            <Divider />
          </Box>
          <Box mt={3} mb={2}>
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
                  align="center"
                  style={{
                    fontSize: "1.7rem",
                    marginBottom: matches ? 0 : 16,
                    lineHeight: 1,
                    fontWeight: 600,
                  }}
                >
                  {query
                    ? `หลักสูตรที่เกี่ยวข้องกับ '${query}'`
                    : "หลักสูตรทั้งหมด"}
                </Typography>
              </Grid>
              {matches && (
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    ผลการค้นหา {filteredCurriculumResults.length} รายการ
                  </Typography>
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
                <Typography variant="body2" color="textSecondary">
                  ผลการค้นหา {filteredCurriculumResults.length} รายการ
                </Typography>
              </Grid>
            )}
          </Box>
          {renderFilteredCurriculumsResult()}
        </main>
      </Container>
    </>
  );
}
