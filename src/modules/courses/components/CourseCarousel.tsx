// @ts-nocheck
import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import {
  useMediaQuery,
  Grid,
  IconButton,
  CircularProgress,
  Typography,
} from "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  ArrowForwardIosRounded as ArrowForward,
  ArrowBackIosRounded as ArrowBack,
} from "@material-ui/icons";

import CourseItem from "./CourseItem";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  carousel: {
    width: "100%",
    maxWidth: "100%",
  },
  slider: {
    position: "relative",
  },
  slide: {
    padding: theme.spacing(0, 0),
  },
  course: {
    width: "100%",
    padding: "4px",
    paddingBottom: 0,
    height: "100%",
  },
  buttonBack: {
    position: "absolute",
    top: "43%",
    left: "-25px",
    background: "none",
    border: "none",
    padding: theme.spacing(0, 0),
    zIndex: 2,
  },
  buttonNext: {
    position: "absolute",
    top: "43%",
    right: "-25px",
    background: "none",
    border: "none",
    padding: theme.spacing(0, 0),
    zIndex: 2,
  },
  growButtonBack: {
    position: "absolute",
    top: "50%",
    left: "-28px",
    height: "100%",
    width: "22px",
    backgroundColor: "#fafafa",
    transform: "translateY(-50%)",
    zIndex: 1,
    boxShadow: "0 0px 11px 15px #fafafa",
  },
  growButtonNext: {
    position: "absolute",
    top: "50%",
    right: "-28px",
    height: "100%",
    width: "22px",
    backgroundColor: "#fafafa",
    transform: "translateY(-50%)",
    zIndex: 1,
    boxShadow: "0 0px 11px 15px #fafafa",
  },
}));

export default function CourseCarousel({ courses, categories, isLoading }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  function renderFilteredResult() {
    if (isLoading) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 411 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      );
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
        <Grid container direction="row" justify="center" alignItems="center">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={135}
            isIntrinsicHeight
            totalSlides={courses.length}
            visibleSlides={isMdUp ? 4 : isSmUp ? 3 : 1}
            step={isMdUp ? 4 : isSmUp ? 3 : 1}
            className={classes.carousel}
          >
            <div className={classes.slider}>
              <div className={classes.growButtonBack} />
              <div className={classes.growButtonNext} />
              <Slider className={classes.slide}>
                {courses.map((course: any) => (
                  <Slide key={course.id} index={course.id}>
                    <div className={classes.course}>
                      <CourseItem {...course} categories={categories} />
                    </div>
                  </Slide>
                ))}
              </Slider>
              <ButtonBack className={classes.buttonBack}>
                <IconButton edge="end">
                  <ArrowBack />
                </IconButton>
              </ButtonBack>
              <ButtonNext className={classes.buttonNext}>
                <IconButton edge="start">
                  <ArrowForward />
                </IconButton>
              </ButtonNext>
            </div>
          </CarouselProvider>
        </Grid>
      );
    }
  }

  return <>{renderFilteredResult()}</>;
}
