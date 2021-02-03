import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  createStyles,
  useTheme,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import {
  useMediaQuery,
  IconButton,
  Grid,
  CircularProgress,
} from "@material-ui/core";
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
import PressItem from "./PressItem";
import { amber, grey } from "@material-ui/core/colors";

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
        backgroundColor: amber[500],
      },
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
  })
);

export default function PressList() {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAnnouncements = async () => {
      setIsLoading(true);
      const { data } = await axios.get("/PressReleases");
      setAnnouncements(data);
      setIsLoading(false);
    };

    loadAnnouncements();
  }, []);

  return (
    <>
      {isLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 304 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <CarouselProvider
          infinite
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          totalSlides={announcements.length}
          visibleSlides={isMdUp ? 3 : isSmUp ? 2 : 1}
          interval={6000}
          isPlaying
          className={classes.carousel}
        >
          <div className={classes.slider}>
            <div className={classes.growButtonBack} />
            <div className={classes.growButtonNext} />
            <Slider className={classes.slide}>
              {announcements.map((announcement: any) => (
                <Slide index={announcement.id}>
                  <div className={classes.announcement}>
                    <PressItem key={announcement.id} {...announcement} />
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
            <DotGroup className={classes.styledDot} />
          </div>
        </CarouselProvider>
      )}
    </>
  );
}
