import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBack from "@material-ui/icons/ArrowBackIosRounded";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AnnouncementItem from "../AnnouncementItem";

import { AnnouncementCarouselProps } from "../AnnouncementCarousel/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carousel: {
      padding: theme.spacing(0, 1),
    },
    slider: {
      position: "relative",
    },
    slide: {
      padding: theme.spacing(0, 0),
    },
    announcement: {
      width: "100%",
      padding: "15px",
      height: "100%",
    },
    dotGroup: {
      display: "flex",
      justifyContent: "center",
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

export default function AnnouncementCarousel({
  announcements,
}: AnnouncementCarouselProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <CarouselProvider
      infinite
      naturalSlideWidth={100}
      naturalSlideHeight={70}
      totalSlides={announcements.length}
      visibleSlides={isMdUp ? 3 : isSmUp ? 2 : 1}
      interval={5000}
      isPlaying
      className={classes.carousel}
    >
      <div className={classes.slider}>
        <Slider className={classes.slide}>
          {announcements.map((item, index) => (
            <Slide index={index}>
              <div className={classes.announcement}>
                <AnnouncementItem
                  key={index}
                  id={item.id}
                  image={item.image}
                  detail={item.detail}
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
      <div className={classes.dotGroup}>
        <DotGroup />
      </div>
    </CarouselProvider>
  );
}
