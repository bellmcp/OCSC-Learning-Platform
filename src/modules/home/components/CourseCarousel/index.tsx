import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBack from "@material-ui/icons/ArrowBackIosRounded";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CourseItem from "../CourseItem";

import { CourseCarouselProps } from "../CourseCarousel/types";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      padding: theme.spacing(0, 1),
      maxWidth: "calc(100vw)",
      // minWidth: "unset",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "calc(100vw - 48px)",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "calc(100vw - 36px)", //TODO: remove x-axis scrollbar on mobile
      },
    },
    slider: {
      position: "relative",
    },
    slide: {
      padding: theme.spacing(0, 0),
    },
    course: {
      width: "100%",
      padding: "5px",
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
  })
);

export default function CourseCarousel({ courses }: CourseCarouselProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container>
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
            {courses.map((item, index) => (
              <Slide index={index}>
                <div className={classes.course}>
                  <CourseItem
                    key={index}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    genre={item.genre}
                    detail={item.detail}
                    availableSeat={item.availableSeat}
                    totalSeat={item.totalSeat}
                  />
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
