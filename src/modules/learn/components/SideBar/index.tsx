import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VideoIcon from "@material-ui/icons/PlayCircleFilled";
import ReadIcon from "@material-ui/icons/MenuBook";
import QuizIcon from "@material-ui/icons/LibraryBooks";
import SurveyIcon from "@material-ui/icons/ThumbUp";
import CheckIcon from "@material-ui/icons/CheckCircle";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import green from "@material-ui/core/colors/green";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import FileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(3),
    },
  })
);

const path = "/learning-platform";

const course3 = [
  {
    title: "แบบทดสอบก่อนเรียน",
    detail: "5/5 คะแนน, 1/1 ครั้ง",
    icon: <QuizIcon />,
    completed: true,
  },
  {
    title: "วิดีโอ: ทดสอบระบบ 1",
    detail: "2 นาที",
    icon: <VideoIcon />,
    completed: true,
  },
  {
    title: "วิดีโอ: ทดสอบระบบ 2",
    detail: "2 นาที",
    icon: <VideoIcon />,
    id: 3,
    link: `${path}/learn/demo`,
  },
  {
    title: "เอกสาร: ทดสอบระบบ",
    detail: "1 นาที",
    icon: <ReadIcon />,
    id: 4,
    link: `${path}/learn/demo/read`,
  },
  {
    title: "แบบทดสอบหลังเรียน",
    detail: "0/5 คะแนน, 0/1 ครั้ง",
    icon: <QuizIcon />,
    id: 5,
    link: `${path}/learn/demo/exam`,
  },
  {
    title: "แบบประเมินรายวิชา",
    detail: "0/1 ครั้ง",
    icon: <SurveyIcon />,
    id: 6,
    link: `${path}/learn/demo/survey`,
  },
  {
    title: "ไฟล์: ทดสอบระบบ",
    detail: "1 นาที",
    icon: <FileIcon />,
    id: 7,
    link: `${path}/learn/demo/file`,
  },
];

interface SideBarProps {
  id: number;
}

export default function SideBar({ id }: SideBarProps) {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Box my={3}>
            <Typography
              style={{
                fontSize: "0.8rem",
              }}
              gutterBottom
            >
              หลักสูตร ทดสอบหลักสูตร 01
            </Typography>
            <Typography
              color="textPrimary"
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              รายวิชา ทดสอบรายวิชา 01
            </Typography>
          </Box>
        </ListSubheader>
      }
      className={classes.root}
      dense
    >
      <Divider />

      <List component="div" disablePadding dense>
        {course3.map((item, index) => (
          <MenuItem
            button
            key={index}
            selected={item.id === id}
            component={RouterLink}
            to={item.link ? item.link : `${path}/learn/demo`}
            className={classes.nested}
          >
            <ListItemIcon>
              {item.completed ? (
                <Badge
                  badgeContent={
                    <CheckIcon
                      style={{ color: green[800], fontSize: "16px" }}
                    />
                  }
                >
                  {item.icon}
                </Badge>
              ) : (
                <>{item.icon}</>
              )}
            </ListItemIcon>
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
          </MenuItem>
        ))}
      </List>

      <Divider />
      <Box my={3}>
        <Grid container justify="center" direction="column" alignItems="center">
          <Grid item>
            <Typography
              style={{
                fontSize: "0.8rem",
              }}
              gutterBottom
            >
              โปรดให้คะแนนรายวิชานี้
            </Typography>
          </Grid>
          <Grid item>
            <Rating
              name="size-large"
              defaultValue={0}
              size="large"
              onChange={(event, newValue) => {
                alert(`Voted: ${newValue} stars`);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </List>
  );
}
