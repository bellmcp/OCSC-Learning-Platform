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

import { AnnouncementItemProps } from "./components/AnnouncementItem/types";

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

  const courseImage = require("../../assets/images/course.png");
  const announcements: AnnouncementItemProps[] = [
    {
      id: 1,
      image: courseImage,
      detail:
        "ฉลองครบรอบ 3 ปี CHULA MOOC กับ 'มหากาพย์ อังกฤษ อัพเกรด' ที่กลับมาเปิดให้ลงทะเบียนอีกครั้ง!",
    },
    {
      id: 2,
      image: courseImage,
      detail:
        "คอร์สเรียน CHULA MOOC ประจำเดือนตุลาคม พร้อมเปิดให้ลงทะเบียนเรียนแล้ว!",
    },
    {
      id: 3,
      image: courseImage,
      detail: "พร้อมรบ พร้อมรับ กับสถานการณ์ COVID-19",
    },
    {
      id: 4,
      image: courseImage,
      detail: "อัพเดทข่าวสารกับเพจ CHULA MOOC",
    },
  ];

  return (
    <>
      <Header title={title} subtitle={subtitle} imageUrl={heroImage} />
      <Container>
        <div className={classes.main}>
          <CssBaseline />
          <NavigationBar active={0} />
          <main className={classes.content}>
            <AnnouncementCarousel announcements={announcements} />
            <CourseGallery />
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
}
