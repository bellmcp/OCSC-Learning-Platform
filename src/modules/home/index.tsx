import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "pure-react-carousel/dist/react-carousel.es.css";
import React from "react";
import Footer from "../root/components/Footer";
import Header from "../root/components/Header";
import NavigationBar from "../root/components/NavigationBar";
import CourseGallery from "./components/CourseGallery";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
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
            <AnnouncementCarousel />
            <CourseGallery />
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
}
