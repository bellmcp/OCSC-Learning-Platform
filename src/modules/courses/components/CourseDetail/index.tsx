import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../../../root/components/NavigationBar";
import Header from "../../../root/components/Header";
import Footer from "../../../root/components/Footer";

import { CourseDetailProps } from "../CourseDetail/types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import CreateIcon from "@material-ui/icons/Create";
import InfoIcon from "@material-ui/icons/Info";
import { green, amber } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";

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
    amber: {
      color: theme.palette.getContrastText(amber[500]),
      backgroundColor: amber[500],
    },
    small: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  })
);

export default function CourseDetail({ course }: CourseDetailProps) {
  const classes = useStyles();
  const subtitle =
    "คอร์สเรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

  const courseInfoPlaceholder = [
    {
      title: "เกี่ยวกับรายวิชา",
      detail: course.fineprint,
      icon: <AssignmentIcon />,
    },
    {
      title: "วัตถุประสงค์",
      detail: course.objective,
      icon: <CreateIcon />,
    },
    {
      title: "เกณฑ์การวัด และประเมินผล",
      detail: course.criteria,
      icon: <AssessmentIcon />,
    },
    { title: "หมายเหตุ", detail: course.note, icon: <InfoIcon /> },
  ];

  const roundInfoPlaceholder = [
    { title: "ช่วงเวลาเรียน" },
    { title: "เนื้อหา" },
    { title: "กลุ่มเป้าหมาย" },
    { title: "เกณฑ์การเรียนจบ" },
    { title: "แพลตฟอร์ม" },
  ];

  function RenderCourseInfo({ index, title, info, icon }: any) {
    return (
      <Box my={5} key={index}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Avatar className={classes.amber}>{icon}</Avatar>
          </Grid>
          <Grid item>
            <h1>{title}</h1>
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="body2" color="textSecondary">
            {info ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: info,
                }}
              ></div>
            ) : null}
          </Typography>
        </Grid>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={1} />
      <Header
        title={course.title}
        subtitle={subtitle}
        imageUrl={course.image}
        isCourse
        courseId={course.id}
        courseInstructor={course.instructor?.name}
        courseGenre={course.genre}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box m={4} ml={0}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <h1 style={{ margin: 0 }}>รอบที่ 1</h1>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {roundInfoPlaceholder.map((item, index) => (
                    <Grid
                      container
                      spacing={3}
                      key={index}
                      alignItems="baseline"
                    >
                      <Grid item xs={4}>
                        <Typography variant="h6">{item.title}</Typography>
                      </Grid>
                      <Grid item xs>
                        เริ่มลงทะเบียน 9 ตุลาคม 2563 เริ่มเรียนได้ 10 ตุลาคม
                        2563 สิ้นสุดการเรียน 30 พฤศจิกายน 2563
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                {courseInfoPlaceholder.slice(0, 1).map((item, index) => (
                  <RenderCourseInfo
                    index={index}
                    title={item.title}
                    info={item.detail}
                    icon={item.icon}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={6}>
                {courseInfoPlaceholder.slice(1, 4).map((item, index) => (
                  <RenderCourseInfo
                    index={index}
                    title={item.title}
                    info={item.detail}
                    icon={item.icon}
                  />
                ))}
              </Grid>
            </Grid>
            <Box my={3}>
              <Divider />
            </Box>
            <Grid
              container
              spacing={2}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <h1>อาจารย์ผู้สอน</h1>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box mb={3}>
                  <Grid
                    container
                    spacing={2}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Avatar
                      alt="User"
                      src={course.instructor?.image}
                      className={classes.small}
                    />
                    <Typography variant="h6" align="center" gutterBottom>
                      {course.instructor?.name}
                    </Typography>
                    <Typography variant="body2" align="center">
                      {course.instructor?.description}
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
