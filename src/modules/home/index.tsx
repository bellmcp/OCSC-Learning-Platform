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
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
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
  })
);

interface Props {
  window?: () => Window;
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
            {/* <Carousel /> */}
            {/* <Announcement />*/}
            <CourseGallery />
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={20}
              totalSlides={3}
            >
              <div style={{ position: "relative" }}>
                <Slider>
                  <Slide index={0}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                        justifyContent: "space-between",
                        textAlign: "center",
                        paddingLeft: "40px",
                        paddingRight: "40px",
                      }}
                    >
                      <div
                        style={{
                          width: "300px",
                          height: "400px",
                          backgroundColor: "red",
                        }}
                      >
                        <h1>Test 1</h1>
                      </div>
                      <div
                        style={{
                          width: "300px",
                          backgroundColor: "red",
                        }}
                      >
                        <h1>Test 1</h1>
                      </div>
                      <div
                        style={{
                          width: "300px",
                          backgroundColor: "red",
                        }}
                      >
                        <h1>Test 1</h1>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={1}>
                    <div>
                      <h1>Test 2</h1>
                    </div>
                  </Slide>
                  <Slide index={2}>
                    <div>
                      <h1>Test 3</h1>
                    </div>
                  </Slide>
                </Slider>
                <ButtonBack
                  style={{ position: "absolute", top: "50%", left: 0 }}
                >
                  {"<"}
                </ButtonBack>
                <ButtonNext
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                  }}
                >
                  {">"}
                </ButtonNext>
              </div>
            </CarouselProvider>
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
}
