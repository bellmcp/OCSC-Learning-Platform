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
    carousel: {
      padding: "0 10px",
    },
    cardSmall: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMediaSmall: {
      paddingTop: "75%", // 4:3
      //paddingTop: "56.25%", // 16:9
    },
  })
);

export default function AnnouncementCarousel() {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <CarouselProvider
      infinite
      naturalSlideWidth={100}
      naturalSlideHeight={70}
      totalSlides={6}
      visibleSlides={isMdUp ? 3 : isSmUp ? 2 : 1}
      className={classes.carousel}
    >
      <div style={{ position: "relative" }}>
        <Slider style={{ padding: "0 0" }}>
          <Slide index={0}>
            <div
              style={{
                width: "100%",
                padding: "15px",
                height: "100%",
              }}
            >
              <AnnouncementItem />
            </div>
          </Slide>
          <Slide index={1}>
            <div
              style={{
                width: "100%",
                padding: "15px",
                height: "100%",
              }}
            >
              <AnnouncementItem />
            </div>
          </Slide>
          <Slide index={2}>
            <div
              style={{
                width: "100%",
                padding: "15px",
                height: "100%",
              }}
            >
              <AnnouncementItem />
            </div>
          </Slide>
          <Slide index={3}>
            <div
              style={{
                width: "100%",
                padding: "15px",
                height: "100%",
              }}
            >
              <AnnouncementItem />
            </div>
          </Slide>
          <Slide index={4}>
            <div
              style={{
                width: "100%",
                padding: "15px",
                height: "100%",
              }}
            >
              <AnnouncementItem />
            </div>
          </Slide>
          <Slide index={5}>
            <div
              style={{
                width: "100%",
                padding: "15px",
                height: "100%",
              }}
            >
              <AnnouncementItem />
            </div>
          </Slide>
        </Slider>
        <ButtonBack
          style={{
            position: "absolute",
            top: "43%",
            left: "-25px",
            background: "none",
            border: 0,
            padding: 0,
          }}
        >
          <IconButton edge="end">
            <ArrowBack />
          </IconButton>
        </ButtonBack>
        <ButtonNext
          style={{
            position: "absolute",
            top: "43%",
            right: "-25px",
            background: "none",
            border: 0,
            padding: 0,
          }}
        >
          <div>
            <IconButton edge="start">
              <ArrowForward />
            </IconButton>
          </div>
        </ButtonNext>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <DotGroup />
        </div>
      </div>
    </CarouselProvider>
  );
}
