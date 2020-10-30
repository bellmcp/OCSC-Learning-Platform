import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../root/components/NavigationBar";
import Header from "../root/components/Header";
import Footer from "../root/components/Footer";
import CourseGallery from "./components/CourseGallery";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import ArrowForward from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBack from "@material-ui/icons/ArrowBackIosRounded";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const heroImage = require("../../assets/images/hero.jpg");

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

interface Props {
  window?: () => Window;
}

function AnnoCard() {
  const classes = useStyles();
  const course = require("../../assets/images/course.png");

  return (
    <Card className={classes.cardSmall} style={{ position: "relative" }}>
      <CardMedia
        className={classes.cardMediaSmall}
        image={course}
        title="Image title"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url('${course}')`,
          backgroundSize: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          color: "white",
          textAlign: "center",
          bottom: 15,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        พร้อมรบ พร้อมรับ กับสถานการณ์ COVID-19
      </div>
    </Card>
  );
}

function Announcement() {
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
              <AnnoCard />
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
              <AnnoCard />
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
              <AnnoCard />
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
              <AnnoCard />
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
              <AnnoCard />
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
              <AnnoCard />
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

export default function Home(props: Props) {
  const classes = useStyles();
  const title = "OCSC Learning Platform";
  const subtitle =
    "คอร์สเรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

  return (
    <>
      <Header title={title} subtitle={subtitle} imageUrl={heroImage} />
      <Container>
        <div className={classes.main}>
          <CssBaseline />
          <NavigationBar active={0} />
          <main className={classes.content}>
            <Announcement />
            <CourseGallery />
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
}
