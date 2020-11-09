import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../../../root/components/NavigationBar";
import Header from "../../../root/components/Header";
import Footer from "../../../root/components/Footer";

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
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const heroImage = require("../../../../assets/images/curriculum_blur.png");

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

export default function CurriculumDetail() {
  const classes = useStyles();
  const subtitle =
    "เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const courseInfoPlaceholder = [
    {
      title: "เกี่ยวกับหลักสูตร",
      detail:
        "หลักสูตรนี้จะมีชื่อว่า มหากาพย์ สังคมศึกษา น่ารู้ โดยจะมีทั้งหมด 5 เรื่อง ได้แก่ <ol><li>กฎหมายและสังคมวิทยา <li>ศาสนาสากลและพระพุทธศาสนา <li>เศรษฐศาสตร์ <li>ภูมิศาสตร์ <li>ประวัติศาสตร์</ol>วิชานี้จะเป็นเป็นการนำเสนอความรู้เรื่องสังคมศึกษาที่จำเป็นต่อนักเรียน นิสิต นักศึกษา และประชาชนทั่วไป ผู้เรียนสามารถนำความรู้ที่ได้ไปใช้กับการสอบเข้าศึกษาต่อในมหาวิทยาลัย และนำไปใช้ในชีวิตประจำวัน",
      icon: <AssignmentIcon />,
    },
    {
      title: "วัตถุประสงค์",
      detail:
        "<ol><li>เพื่อให้ผู้เรียนสามารถนำความรู้ที่ได้เรียนในแต่ละคลิปนำไปปรับใช้ในการเรียน การทำงาน และชีวิตประจำวันได้<li>เพื่อผลิตสื่อวีดิทัศน์สำหรับการเรียนการสอนในรูปแบบออนไลน์ให้สำหรับนิสิต และประชาชนทั่วไป ได้ศึกษาเพิ่มเติมความรู้ด้วยตนเอง</ol>",
      icon: <CreateIcon />,
    },
    {
      title: "เกณฑ์การวัดและประเมินผล",
      detail:
        "มีการวัดและประเมินผลผ่านแบบทดสอบหลังเรียน (Posttest) โดยจะเป็นคะแนนจาก Posttest เท่ากับ 100 คะแนน ทั้งนี้ผู้เรียนต้องทำคะแนนรวมทั้งหมดให้ได้ร้อยละ 60 ขึ้นไป และเรียนจบภายในเวลาที่กำหนดจึงจะสามารถขอรับ Certificate of Completion ได้",
      icon: <AssessmentIcon />,
    },
    {
      title: "หมายเหตุ",
      detail:
        "<ol><li>ผู้เรียนจะมีสิทธิ์ทำแบบทดสอบหลังเรียน (Posttest) เมื่อเข้าร่วมกิจกรรมการเรียน (Course Progress) มากกว่า 80% ขึ้นไป<li>ผู้เรียนจะสามารถทำข้อสอบ Posttest ได้เพียง 1 ครั้งเท่านั้น</ol>",
      icon: <InfoIcon />,
    },
  ];

  const roundInfoPlaceholder = [
    {
      title: "ช่วงเวลาเรียน",
      detail:
        "เริ่มลงทะเบียน 10 กรกฎาคม 2563<br/>เริ่มเรียน 11 กรกฎาคม 2563<br/>สิ้นสุดการเรียน 31 สิงหาคม 2563",
    },
    { title: "เนื้อหา", detail: "4 บทเรียน" },
    {
      title: "กลุ่มเป้าหมาย",
      detail: "นิสิต นักศึกษา และบุคคลทั่วไป<br/>จำนวน 5,000 คน",
    },
    {
      title: "เกณฑ์การเรียนจบ",
      detail: "ผู้เรียนต้องทำคะแนนรวมทั้งหมด<br/>ให้ได้ร้อยละ 60 ขึ้นไป",
    },
    { title: "แพลตฟอร์ม", detail: "OCSC Learning Platform" },
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
        title={"มหากาพย์ สังคมศึกษา น่ารู้"}
        subtitle={subtitle}
        imageUrl={heroImage}
        isCourse
        courseId={1}
        courseInstructor={"อาจารย์ กนก จันทรา และคณะ"}
        courseGenre={"ศิลปะและการพัฒนาตนเอง"}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mt={4} mb={6}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={6}>
                  <h1 style={{ margin: 0 }}>รอบที่ 4</h1>
                  <Box mb={3}>
                    <Box display="flex" alignItems="center">
                      <Typography>
                        คุณลงทะเบียนหลักสูตรนี้แล้ว เริ่มเรียนได้เลย
                      </Typography>
                    </Box>
                  </Box>
                  <Box my={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                    >
                      เข้าเรียน
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
                <h1>ประมวลหลักสูตร</h1>
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
            </Grid> */}
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
