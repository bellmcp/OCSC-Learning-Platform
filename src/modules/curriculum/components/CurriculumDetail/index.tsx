import React from "react";
import { NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "modules/ui/components/NavigationBar";
import Header from "modules/ui/components/Header";
import Footer from "modules/ui/components/Footer";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import CreateIcon from "@material-ui/icons/Create";
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
import SurveyIcon from "@material-ui/icons/ThumbUp";

const heroImage = require("../../../../assets/images/root/curriculum-min.jpg");

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
      title: "เป้าหมายการเรียนรู้",
      detail:
        "หลักสูตรนี้จะมีชื่อว่า มหากาพย์ สังคมศึกษา น่ารู้ โดยจะมีทั้งหมด 5 เรื่อง ได้แก่ <ol><li>กฎหมายและสังคมวิทยา <li>ศาสนาสากลและพระพุทธศาสนา <li>เศรษฐศาสตร์ <li>ภูมิศาสตร์ <li>ประวัติศาสตร์</ol>วิชานี้จะเป็นเป็นการนำเสนอความรู้เรื่องสังคมศึกษาที่จำเป็นต่อนักเรียน นิสิต นักศึกษา และประชาชนทั่วไป ผู้เรียนสามารถนำความรู้ที่ได้ไปใช้กับการสอบเข้าศึกษาต่อในมหาวิทยาลัย และนำไปใช้ในชีวิตประจำวัน",
      icon: <AssignmentIcon />,
    },
    {
      title: "ประเด็นการเรียนรู้",
      detail:
        "<ol><li>เพื่อให้ผู้เรียนสามารถนำความรู้ที่ได้เรียนในแต่ละคลิปนำไปปรับใช้ในการเรียน การทำงาน และชีวิตประจำวันได้<li>เพื่อผลิตสื่อวีดิทัศน์สำหรับการเรียนการสอนในรูปแบบออนไลน์ให้สำหรับนิสิต และประชาชนทั่วไป ได้ศึกษาเพิ่มเติมความรู้ด้วยตนเอง</ol>",
      icon: <CreateIcon />,
    },
    {
      title: "วิธีการประเมินผล",
      detail:
        "มีการวัดและประเมินผลผ่านแบบทดสอบหลังเรียน (Posttest) โดยจะเป็นคะแนนจาก Posttest เท่ากับ 100 คะแนน ทั้งนี้ผู้เรียนต้องทำคะแนนรวมทั้งหมดให้ได้ร้อยละ 60 ขึ้นไป และเรียนจบภายในเวลาที่กำหนดจึงจะสามารถขอรับ Certificate of Completion ได้",
      icon: <AssessmentIcon />,
    },
    {
      title: "กลุ่มเป้าหมาย",
      detail:
        "<ol><li>ข้าราชการพลเรือนสามัญที่อยู่ระหว่างทดลองปฏิบัติหน้าที่ราชการ<li>ข้าราชการบรรจุใหม่กระทรวงการคลัง</ol>",
      icon: <InfoIcon />,
    },
  ];

  const roundInfoPlaceholder = [
    {
      title: "ช่วงเวลาเรียน",
      detail: "เริ่มลงทะเบียน 10 กรกฎาคม 2563<br/>สิ้นสุด 31 สิงหาคม 2563",
    },

    {
      title: "เงื่อนไขการลงทะเบียน",
      detail:
        "เฉพาะข้าราชการบรรจุใหม่กระทรวงการคลังเท่านั้น ต้องผ่านหลักสูตร OCSC00000 หรือวิชา การประชาสัมพันธ์เบื้องต้น มาก่อน มิฉะนั้นจะถูกยกเลิกในภายหลัง",
    },
  ];

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
      <NavigationBar
        active={1}
        setActivePage={() => {
          console.log("mock");
        }}
      />
      <Header
        title={"มหากาพย์ สังคมศึกษา น่ารู้"}
        subtitle={subtitle}
        imageUrl={heroImage}
        isCourse
        courseId={1}
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
                      component={NavLink}
                      to="/learn/epic-social-studies"
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
                        1. สังคมศึกษา น่ารู้: ภูมิศาสตร์
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>{renderMockContent()}</List>
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
                        2. สังคมศึกษา น่ารู้: เศรษฐศาสตร์
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <List dense>{renderMockContent()}</List>
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
                        3. สังคมศึกษา น่ารู้: ประวัติศาสตร์
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>{renderMockContent()}</List>
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
                        4. สังคมศึกษา น่ารู้: ศาสนาสากลและพระพุทธศาสนา
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <LibraryBooksIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="แบบทดสอบก่อนเรียน"
                            secondary="10 คะแนน, สูงสุด 1 ครั้ง"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="วิดีโอ: ศาสนาสากล"
                            secondary="30 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PlayCircleFilledIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="วิดีโอ: พระพุทธศาสนา"
                            secondary="15 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <MenuBookIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="เอกสาร: หลักธรรมเบื้องต้น"
                            secondary="8 นาที"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LibraryBooksIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="แบบทดสอบหลังเรียน"
                            secondary="20 คะแนน, สูงสุด 1 ครั้ง"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <SurveyIcon />
                          </ListItemIcon>
                          <ListItemText primary="แบบประเมินรายวิชา" />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel5"}
                    onChange={handleChange("panel5")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        5. สังคมศึกษา น่ารู้: กฎหมายและสังคมวิทยา
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>{renderMockContent()}</List>
                    </AccordionDetails>
                  </Accordion>
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
