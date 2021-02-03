// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  Avatar,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Toolbar,
} from "@material-ui/core";
import {
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Create as CreateIcon,
  KeyboardArrowRightRounded as ArrowRightIcon,
  Info as InfoIcon,
  ThumbUp as SurveyIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
  LibraryBooks as LibraryBooksIcon,
  MenuBook as CourseIcon,
  People as PeopleIcon,
} from "@material-ui/icons";
import { amber } from "@material-ui/core/colors";

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
      flexBasis: "100%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export default function CourseDetails() {
  const classes = useStyles();
  const { id }: any = useParams();
  const [course, setCourse] = useState();
  useEffect(() => {
    const loadCourse = async () => {
      const { data } = await axios.get(`/Courses/${id}`);
      setCourse(data);
    };
    loadCourse();
  }, [id]);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const courseInfoPlaceholder = [
    {
      title: "เป้าหมายการเรียนรู้",
      detail: course?.LearningObjective,
      icon: <AssignmentIcon />,
    },
    {
      title: "ประเด็นการเรียนรู้",
      detail: course?.LearningTopic,
      icon: <CreateIcon />,
    },
    {
      title: "วิธีการประเมินผล",
      detail: course?.Assessment,
      icon: <AssessmentIcon />,
    },
    {
      title: "กลุ่มเป้าหมาย",
      detail: course?.TargetGroup,
      icon: <PeopleIcon />,
    },
    {
      title: "หมายเหตุ",
      detail: course?.SeqFlow
        ? "บังคับเรียนตามลำดับเนื้อหา"
        : "ไม่บังคับเรียนตามลำดับเนื้อหา",
      icon: <InfoIcon />,
    },
  ];

  // const roundInfoPlaceholder = [
  //   { title: "ช่วงเวลาเรียน", detail: course.round?.duration },
  //   { title: "เงื่อนไขการลงทะเบียน", detail: course.round?.goal },
  // ];

  function renderMockContent() {
    return (
      <>
        <ListItem>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText
            primary="แบบทดสอบก่อนเรียน"
            secondary="5 คะแนน, สูงสุด 1 ครั้ง"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PlayCircleFilledIcon />
          </ListItemIcon>
          <ListItemText primary="วิดีโอ: แนะนำรายวิชา" secondary="5 นาที" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText
            primary="แบบทดสอบหลังเรียน"
            secondary="5 คะแนน, สูงสุด 1 ครั้ง"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SurveyIcon />
          </ListItemIcon>
          <ListItemText primary="แบบประเมินรายวิชา" />
        </ListItem>
      </>
    );
  }

  function RenderCourseInfo({ index, title, info, icon }: any) {
    return (
      <Box mb={3} key={index}>
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
    <>
      <Toolbar />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Grid container justify="space-between" alignItems="center">
              <h1>รายวิชา {course?.Name}</h1>
              <Typography variant="body2" component="p" color="textSecondary">
                รหัสวิชา: {course?.Code}
              </Typography>
            </Grid>
            {/* <Box mt={4} mb={6}>
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
            </Box> */}
            <Box mb={3}>
              <Divider />
            </Box>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={7}>
                {courseInfoPlaceholder.slice(0, 2).map((item, index) => (
                  <RenderCourseInfo
                    index={index}
                    title={item.title}
                    info={item.detail}
                    icon={item.icon}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={5}>
                {courseInfoPlaceholder
                  .slice(2, courseInfoPlaceholder.length)
                  .map((item, index) => (
                    <RenderCourseInfo
                      index={index}
                      title={item.title}
                      info={item.detail}
                      icon={item.icon}
                    />
                  ))}
              </Grid>
            </Grid>
            {/* <Box my={3}>
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
                  <Accordion expanded={true} onChange={handleChange("panel2")}>
                    <AccordionSummary
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className={classes.heading}>
                        การประชาสัมพันธ์ผ่านวิทยุและโทรทัศน์
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <List dense>{renderMockContent()}</List>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            </Grid> */}
          </main>
        </div>
      </Container>
    </>
  );
}
