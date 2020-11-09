import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import QuizIcon from "@material-ui/icons/LibraryBooks";
import VideoIcon from "@material-ui/icons/PlayCircleFilled";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ReadIcon from "@material-ui/icons/MenuBook";
import CheckIcon from "@material-ui/icons/CheckCircle";
import RatingIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const ListItem = withStyles({
  root: {
    "&$selected": {
      borderLeft: `6px solid ${amber[500]}`,
      paddingLeft: "26px",
    },
  },
  selected: {},
})(MuiListItem);

const course1 = [
  {
    title: "แบบทดสอบก่อนเรียน",
    detail: "30 นาที, 2/2 ครั้ง",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
  {
    title: "ภูมิศาสตร์ ตอนที่ 1",
    detail: "15 นาที",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
  {
    title: "ภูมิศาสตร์ ตอนที่ 2",
    detail: "8 นาที",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
  {
    title: "แบบทดสอบหลังเรียน",
    detail: "45 นาที, 1/2 ครั้ง",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
];

const course2 = [
  {
    title: "แบบทดสอบก่อนเรียน",
    detail: "30 นาที, 1/1 ครั้ง",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
  {
    title: "เศรษฐศาสตร์เบื้องต้น",
    detail: "30 นาที",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
  {
    title: "แบบทดสอบหลังเรียน",
    detail: "35 นาที, 2/2 ครั้ง",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
];

const course3 = [
  {
    title: "แบบทดสอบก่อนเรียน",
    detail: "15 นาที, 1/1 ครั้ง",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
  {
    title: "ประวัติศาสตร์โลก",
    detail: "30 นาที",
    icon: <CheckIcon style={{ color: green[800] }} />,
  },
  {
    title: "ประวัติศาสตร์ไทย (Video)",
    detail: "15 นาที",
    icon: <VideoIcon />,
    isSelected: true,
  },
  {
    title: "เอกสารประกอบ (PDF)",
    detail: "8 นาที",
    icon: <ReadIcon />,
  },
  {
    title: "สรุปเนื้อหา (Youtube)",
    detail: "5 นาที",
    icon: <YouTubeIcon />,
  },
  {
    title: "แบบทดสอบหลังเรียน",
    detail: "20 นาที, 0/2 ครั้ง",
    icon: <QuizIcon />,
  },
  {
    title: "แบบประเมินรายวิชา",
    detail: "5 นาที",
    icon: <RatingIcon />,
  },
];

const course4 = [
  {
    title: "แบบทดสอบก่อนเรียน",
    detail: "10 นาที, 0/2 ครั้ง",
    icon: <QuizIcon />,
  },
  {
    title: "ศาสนาเบื้องต้น",
    detail: "40 นาที",
    icon: <VideoIcon />,
  },
  {
    title: "แบบทดสอบหลังเรียน",
    detail: "15 นาที, 0/1 ครั้ง",
    icon: <QuizIcon />,
  },
];

const course5 = [
  {
    title: "แบบทดสอบก่อนเรียน",
    detail: "15 นาที, 0/2 ครั้ง",
    icon: <QuizIcon />,
  },
  {
    title: "กฎหมายเบื้องต้น",
    detail: "30 นาที",
    icon: <VideoIcon />,
  },
  {
    title: "แบบทดสอบหลังเรียน",
    detail: "20 นาที, 0/2 ครั้ง",
    icon: <QuizIcon />,
  },
];

export default function NestedList() {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(true);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const handleClick5 = () => {
    setOpen5(!open5);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Box my={3}>
            <Typography
              style={{
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              มหากาพย์ สังคมศึกษา น่ารู้
            </Typography>
          </Box>
        </ListSubheader>
      }
      className={classes.root}
      dense
    >
      <Divider />
      {/* Course 1 */}
      <ListItem button onClick={handleClick1}>
        <ListItemText
          primary={
            <Typography style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              1. สังคมศึกษา น่ารู้: ภูมิศาสตร์
            </Typography>
          }
        />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {course1.map((item, index) => (
            <ListItem button key={index} className={classes.nested}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "0.8rem" }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {item.detail}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* Course 2 */}
      <ListItem button onClick={handleClick2}>
        <ListItemText
          primary={
            <Typography style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              2. สังคมศึกษา น่ารู้: เศรษฐศาสตร์
            </Typography>
          }
        />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {course2.map((item, index) => (
            <ListItem button key={index} className={classes.nested}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "0.8rem" }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {item.detail}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* Course 3 */}
      <ListItem button onClick={handleClick3}>
        <ListItemText
          primary={
            <Typography style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              3. สังคมศึกษา น่ารู้: ประวัติศาสตร์
            </Typography>
          }
        />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {course3.map((item, index) => (
            <ListItem
              button
              key={index}
              className={classes.nested}
              selected={item.isSelected}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "0.8rem" }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {item.detail}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* Course 4 */}
      <ListItem button onClick={handleClick4}>
        <ListItemText
          primary={
            <Typography style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              4. สังคมศึกษา น่ารู้: ศาสนาสากลและพระพุทธศาสนา
            </Typography>
          }
        />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {course4.map((item, index) => (
            <ListItem button key={index} className={classes.nested}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "0.8rem" }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {item.detail}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* Course 5 */}
      <ListItem button onClick={handleClick5}>
        <ListItemText
          primary={
            <Typography style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              5. สังคมศึกษา น่ารู้: ศาสนาสากลและพระพุทธศาสนา
            </Typography>
          }
        />
        {open5 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {course5.map((item, index) => (
            <ListItem button key={index} className={classes.nested}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "0.8rem" }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {item.detail}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* Course 5 */}
      <ListItem button dense>
        <ListItemIcon>
          <RatingIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography style={{ fontSize: "0.8rem" }}>
              แบบประเมินหลักสูตร
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="textSecondary">
              2 นาที
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}
