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
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import InfoIcon from "@material-ui/icons/Info";
import { amber } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Accordion from "@material-ui/core/Accordion/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

const heroImage = require("../../../../assets/images/course_blur.png");

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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightMedium,
      flexBasis: "66.66%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export default function CourseDetail({ course }: CourseDetailProps) {
  const classes = useStyles();
  const subtitle =
    "คอร์สเรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      title: "เกณฑ์การวัดและประเมินผล",
      detail: course.criteria,
      icon: <AssessmentIcon />,
    },
    { title: "หมายเหตุ", detail: course.note, icon: <InfoIcon /> },
  ];

  const roundInfoPlaceholder = [
    { title: "ช่วงเวลาเรียน", detail: course.round?.duration },
    { title: "เนื้อหา", detail: course.round?.unit },
    { title: "กลุ่มเป้าหมาย", detail: course.round?.target },
    { title: "เกณฑ์การเรียนจบ", detail: course.round?.goal },
    { title: "แพลตฟอร์ม", detail: course.round?.platform },
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
        imageUrl={heroImage}
        isCourse
        courseId={course.id}
        courseInstructor={course.instructor?.name}
        courseGenre={course.genre}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mt={4} mb={6}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={6}>
                  <h1 style={{ margin: 0 }}>รอบที่ {course.round?.id}</h1>
                  <Box mb={3}>
                    {course.totalSeat && course.availableSeat ? (
                      <Box display="flex" alignItems="center">
                        <Box width="100%">
                          <Typography
                            variant="body2"
                            color="primary"
                            align="right"
                          >
                            {course.availableSeat} / {course.totalSeat} ที่ว่าง
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={
                              ((course.totalSeat - course.availableSeat) /
                                course.totalSeat) *
                              100
                            }
                            color="secondary"
                          />
                        </Box>
                        <Box></Box>
                      </Box>
                    ) : null}
                  </Box>
                  <Box my={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      endIcon={<ArrowRightIcon />}
                    >
                      ลงทะเบียนเรียน
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {roundInfoPlaceholder.map((item, index) => (
                    <Grid
                      container
                      spacing={3}
                      key={index}
                      alignItems="baseline"
                    >
                      <Grid item xs={5}>
                        <Typography variant="h6">{item.title}</Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body2" color="textSecondary">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.detail ? item.detail : "ไม่มีข้อมูล",
                            }}
                          ></div>
                        </Typography>
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
              <Grid item xs={12} sm={8}>
                <h1>ประมวลรายวิชา</h1>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box mb={3}>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        แบบทดสอบก่อนเรียน
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <LibraryBooksIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="แบบทดสอบก่อนเรียน (Pre-test)"
                            secondary="แบบทดสอบ, 1 ชั่วโมง, สูงสุด 1 ครั้ง"
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className={classes.heading}>
                        บทที่ 1: PR in Radio Broadcasting
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        4 วิดีโอ, 1 บทความ
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <PlayCircleFilledIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="1.1 ความรู้พื้นฐานทางวิทยุกระจายเสียง"
                              secondary="วิดีโอ, 30 นาที"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PlayCircleFilledIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="1.2
                        ประเภทรายการวิทยุกระจายเสียงและความสำคัญต่อการประชาสัมพันธ์"
                              secondary="วิดีโอ, 30 นาที"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PlayCircleFilledIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="1.3 ประเภทของประชาสัมพันธ์ผ่านสื่อวิทยุกระจายเสียง"
                              secondary="วิดีโอ, 30 นาที"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PlayCircleFilledIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="1.4 การเขียนบทวิทยุเพื่อการประชาสัมพันธ์"
                              secondary="วิดีโอ, 30 นาที"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="1.5 เทคนิคการผลิตสื่อประชาสัมพันธ์แบบโฆษณาทางวิทยุ"
                              secondary="บทความ, 15 นาที"
                            />
                          </ListItem>
                        </List>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography className={classes.heading}>
                        บทที่ 2: PR in Television Broadcasting
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        8 วิดีโอ, 1 บทความ
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.1 ความเป็นมาของสื่อวิทยุโทรทัศน์"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.2 ประเภทของระบบวิทยุโทรทัศน์"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.3 ประเภทของรายการวิทยุโทรทัศน์"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.4 รูปแบบการประชาสัมพันธ์ผ่านสื่อวิทยุโทรทัศน์"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.5 การผลิตสื่อประชาสัมพันธ์ทางโทรทัศน์"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.6 การเขียนบทโทรทัศน์เพื่อการประชาสัมพันธ์ ตอนที่ 1"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.7 การเขียนบทโทรทัศน์เพื่อการประชาสัมพันธ์ ตอนที่ 2"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <MenuBookIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.8 ตัวอย่างการเขียนบทประชาสัมพันธ์ทางโทรทัศน์ ตอนที่ 1"
                            secondary="บทความ, 15 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.9 ตัวอย่างการเขียนบทประชาสัมพันธ์ทางโทรทัศน์ ตอนที่ 2"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="2.10 รู้ทันสื่อโทรทัศน์ก่อนเลือกใช้"
                            secondary="วิดีโอ, 30 นาที"
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography className={classes.heading}>
                        แบบทดสอบหลังเรียน
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <LibraryBooksIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="แบบทดสอบหลังเรียน (Post-test)"
                            secondary="แบบทดสอบ, 1 ชั่วโมง, สูงสุด 3 ครั้ง"
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Box>
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
                    <Box mt={2}>
                      <Typography variant="h6" align="center" gutterBottom>
                        {course.instructor?.name}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {course.instructor?.description}
                      </Typography>
                    </Box>
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
