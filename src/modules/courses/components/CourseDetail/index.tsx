import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../../../root/components/NavigationBar";
import Header from "../../../root/components/Header";
import Footer from "../../../root/components/Footer";

import { CourseDetailProps } from "../CourseDetail/types";

const heroImage = require("../../../../assets/images/hero.jpg");

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

export default function CourseDetail({ course }: CourseDetailProps) {
  const classes = useStyles();
  const subtitle =
    "คอร์สเรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={1} />
      <Header
        title={course.title}
        subtitle={subtitle}
        imageUrl={heroImage}
        isCourse
        courseId={course.id}
        courseInstructor="รศ.ดร.สมิทธิ์ บุญชุติมา"
        courseGenre={course.genre}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <h1>เกี่ยวกับรายวิชา</h1>
            <p>{course.detail}</p>
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
