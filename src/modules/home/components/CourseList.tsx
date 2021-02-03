import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
  Container,
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
    maxWidth: "calc(100vw - 74px)",
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
  },
  buttonNext: {
    position: "absolute",
    top: "43%",
    right: "-25px",
    background: "none",
    border: "none",
    padding: theme.spacing(0, 0),
  },
}));

export default function CourseList() {
  const classes = useStyles();
  const { search } = useLocation();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/Courses${search}`);
      setCourses(data);
      setIsLoading(false);
    };
    loadCourses();
  }, [search]);

  return (
    <>
      {isLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 407 }}
        >
          <CircularProgress />
        </Grid>
      ) : (
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
              <Slider className={classes.slide}>
                {courses.map((course: any) => (
                  <Slide key={course.id} index={course.id}>
                    <div className={classes.course}>
                      <CourseItem {...course} />
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
      )}
    </>
  );
}
