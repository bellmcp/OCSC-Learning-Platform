// @ts-nocheck
import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import {
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
} from '@material-ui/core';
import { ArrowForwardIos as ArrowForwardIcon } from '@material-ui/icons';
import CategoryFilter from 'modules/categories/components/CategoryFilter';
import 'pure-react-carousel/dist/react-carousel.es.css';

import * as pressesActions from 'modules/press/actions';
import * as coursesActions from 'modules/courses/actions';
import * as categoriesActions from 'modules/categories/actions';
import * as curriculumsActions from 'modules/curriculums/actions';
import Header from 'modules/ui/components/Header';
import PressCarousel from 'modules/press/components/PressCarousel';
import CourseCarousel from 'modules/courses/components/CourseCarousel';
import CurriculumCarousel from 'modules/curriculums/components/CurriculumCarousel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      zIndex: 3,
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
  })
);

const TITLE = 'OCSC Learning Space';
const SUBTITLE =
  'โลกแห่งการเรียนรู้ ไม่มีวันจบสิ้น ยิ่งเรียนยิ่งรู้ ยิ่งเพิ่มพลังทางปัญญา';

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  const history = useHistory();
  const PATH = process.env.REACT_APP_BASE_PATH;
  const { search } = useLocation();
  const { courseCategoryId } = queryString.parse(search);

  const linkToCourses = () => {
    history.push(`${PATH}/courses`);
  };

  const linkToCurriculums = () => {
    history.push(`${PATH}/curriculums`);
  };

  const { items: users } = useSelector((state) => state.user);
  const { isLoading: isPressesLoading, items: presses } = useSelector(
    (state) => state.press
  );
  const { isLoading: isCoursesLoading, items: courses } = useSelector(
    (state) => state.courses
  );
  const { isRecommendedCoursesLoading, recommended: recommendedCourses } =
    useSelector((state) => state.courses);
  const { isLoading: isCurriculumsLoading, items: curriculums } = useSelector(
    (state) => state.curriculums
  );
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const presses_action = pressesActions.loadPresses();
    dispatch(presses_action);
  }, [dispatch]);

  useEffect(() => {
    const courses_action = coursesActions.loadCourses(courseCategoryId);
    dispatch(courses_action);
  }, [dispatch, courseCategoryId]);

  useEffect(() => {
    const recommended_courses_action = coursesActions.loadRecommendedCourses();
    dispatch(recommended_courses_action);
  }, [dispatch]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  useEffect(() => {
    const curriculums_action = curriculumsActions.loadCurriculums('');
    dispatch(curriculums_action);
  }, [dispatch]);

  return (
    <>
      <Header
        title={users.firstname ? `สวัสดี คุณ${users.firstname}` : TITLE}
        subtitle={SUBTITLE}
      />
      <Container maxWidth="lg" className={classes.content}>
        <PressCarousel presses={presses} isLoading={isPressesLoading} />

        <Box mt={3} mb={2}>
          <Divider />
        </Box>

        <Box my={3}>
          <Grid
            container
            direction="row"
            justify={matches ? 'space-between' : 'center'}
            alignItems="center"
          >
            <Typography
              gutterBottom
              component="h2"
              variant="h6"
              className={classes.sectionTitle}
            >
              รายการแนะนำ
            </Typography>
          </Grid>
          <CourseCarousel
            courses={recommendedCourses}
            categories={categories}
            isLoading={isRecommendedCoursesLoading}
          />
        </Box>

        <Box mt={3} mb={3}>
          <Divider />
        </Box>

        <Grid container direction="row" justify="center" alignItems="center">
          <CategoryFilter categories={categories} />
        </Grid>

        <Box my={3}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              component="h2"
              variant="h6"
              className={classes.sectionTitle}
            >
              รายวิชา
            </Typography>
            <Button
              variant="text"
              color="default"
              endIcon={<ArrowForwardIcon />}
              onClick={linkToCourses}
              className={classes.seeAllButton}
            >
              ดูทั้งหมด
            </Button>
          </Grid>
          <CourseCarousel
            courses={courses}
            categories={categories}
            isLoading={isCoursesLoading}
          />
        </Box>

        <Box mt={3} mb={2}>
          <Divider />
        </Box>

        <Box my={3}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              component="h2"
              variant="h6"
              className={classes.sectionTitle}
            >
              หลักสูตร
            </Typography>
            <Button
              variant="text"
              color="default"
              endIcon={<ArrowForwardIcon />}
              onClick={linkToCurriculums}
              className={classes.seeAllButton}
            >
              ดูทั้งหมด
            </Button>
          </Grid>
          <CurriculumCarousel
            curriculums={curriculums}
            isLoading={isCurriculumsLoading}
          />
        </Box>
      </Container>
    </>
  );
}
