import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../root/components/NavigationBar";
import Header from "../root/components/Header";
import Footer from "../root/components/Footer";
import CourseItem from "../home/components/CourseItem";

import { CourseModuleProps } from "./types";
import Grid from "@material-ui/core/Grid";
import { GroupOutlined } from "@material-ui/icons";

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

export default function Courses({ data }: CourseModuleProps) {
  const classes = useStyles();
  const title = "คอร์สเรียน";
  const subtitle =
    "คอร์สเรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={1} />
      <Header title={title} subtitle={subtitle} imageUrl={heroImage} />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Grid container spacing={1}>
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  {item.courses.map((course, index) => (
                    <Grid item xs={12} sm={4} md={3}>
                      <CourseItem
                        key={index}
                        id={course.id}
                        title={course.title}
                        image={course.image}
                        genre={course.genre}
                        detail={course.detail}
                        availableSeat={course.availableSeat}
                        totalSeat={course.totalSeat}
                      />
                    </Grid>
                  ))}
                </React.Fragment>
              ))}
            </Grid>
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
