// @ts-nocheck
import React from "react";
import {
  createStyles,
  useTheme,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  ArrowBackIosRounded as ArrowBack,
  ArrowForwardIosRounded as ArrowForward,
} from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import PressItem from "./PressItem";
import Loading from "modules/ui/components/Loading";

import { PressProps } from "../types";

interface PressCarousel {
  presses: PressProps;
  isLoading: string;
}

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
      outline: "none !important",
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
    styledDot: {
      "& .carousel__dot": {
        backgroundColor: grey[300],
        height: "8px",
        width: "8px",
        padding: "4px",
        borderRadius: "50%",
        border: "none",
        margin: "0 4px",
      },
      "& .carousel__dot--selected": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    buttonBack: {
      position: "absolute",
      top: "47%",
      left: "-15px",
      background: "none",
      border: "none",
      padding: theme.spacing(0, 0),
      zIndex: 2,
      outline: "none !important",
    },
    buttonNext: {
      position: "absolute",
      top: "47%",
      right: "-15px",
      background: "none",
      border: "none",
      padding: theme.spacing(0, 0),
      zIndex: 2,
      outline: "none !important",
    },
    growButtonBack: {
      position: "absolute",
      top: "50%",
      left: "-28px",
      height: "100%",
      width: "22px",
      backgroundColor: theme.palette.background.default,
      transform: "translateY(-50%)",
      zIndex: 1,
      boxShadow: `0 0px 11px 15px ${theme.palette.background.default}`,
    },
    growButtonNext: {
      position: "absolute",
      top: "50%",
      right: "-28px",
      height: "100%",
      width: "22px",
      backgroundColor: theme.palette.background.default,
      transform: "translateY(-50%)",
      zIndex: 1,
      boxShadow: `0 0px 11px 15px ${theme.palette.background.default}`,
    },
  })
);

export default function PressCarousel({ presses, isLoading }: PressCarousel) {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {isLoading ? (
        <Loading height={304} />
      ) : (
        <CarouselProvider
          // infinite
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          totalSlides={presses.length}
          visibleSlides={isMdUp ? 3 : isSmUp ? 2 : 1}
          interval={6000}
          isPlaying={presses.length <= 3 ? false : true}
          className={classes.carousel}
        >
          <div className={classes.slider}>
            <div className={classes.growButtonBack} />
            <div className={classes.growButtonNext} />
            <Slider
              className={classes.slide}
              aria-label="Press releases carousel"
            >
              {presses.map((announcement: any) => (
                <Slide index={announcement.id}>
                  <div className={classes.announcement}>
                    <PressItem key={announcement.id} {...announcement} />
                  </div>
                </Slide>
              ))}
            </Slider>
            <ButtonBack className={classes.buttonBack}>
              <ArrowBack fontSize={isSmUp ? "default" : "small"} />
            </ButtonBack>
            <ButtonNext className={classes.buttonNext}>
              <ArrowForward fontSize={isSmUp ? "default" : "small"} />
            </ButtonNext>
          </div>
          <div className={classes.dotGroup}>
            <DotGroup className={classes.styledDot} />
          </div>
        </CarouselProvider>
      )}
    </>
  );
}
