import React from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  MenuItem,
  Grid,
  Badge,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {
  PlayCircleFilled as VideoIcon,
  MenuBook as ReadIcon,
  LibraryBooks as QuizIcon,
  ThumbUp as SurveyIcon,
  CheckCircle as CheckIcon,
  Language as FileIcon,
  ArrowBackIos as ArrowBackIcon,
} from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(3),
    },
    completed: {
      paddingLeft: theme.spacing(2),
      borderLeft: `8px solid ${green[800]}`,
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
    title: "วิดีโอ: ทดสอบระบบ",
    detail: "2 นาที",
    icon: <VideoIcon />,
    id: 3,
    link: `${path}/learn/demo`,
  },
  {
    title: "ไฟล์: ทดสอบระบบ",
    detail: "1 นาที",
    icon: <FileIcon />,
    id: 4,
    link: `${path}/learn/demo/file`,
  },
  {
    title: "เอกสาร: ทดสอบระบบ",
    detail: "1 นาที",
    icon: <ReadIcon />,
    id: 5,
    link: `${path}/learn/demo/read`,
  },
  {
    title: "แบบทดสอบหลังเรียน",
    detail: "0/5 คะแนน, 0/1 ครั้ง",
    icon: <QuizIcon />,
    id: 6,
    link: `${path}/learn/demo/exam`,
  },
  {
    title: "แบบประเมินรายวิชา",
    detail: "0/1 ครั้ง",
    icon: <SurveyIcon />,
    id: 7,
    link: `${path}/learn/demo/survey`,
  },
];

export default function SideBarMobile({ id }: any) {
  const classes = useStyles();
  const history = useHistory();
  const path = "/learning-platform";

  const linkToLearn = () => {
    history.push(`${path}/learn`);
  };

  return (
    <List component="nav" className={classes.root} dense>
      <Box my={2}>
        <Grid direction="column" justify="center" alignItems="center">
          <Typography
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
            color="textSecondary"
            align="center"
            gutterBottom
          >
            หลักสูตร หลักสูตรฝึกอบรมข้าราชการบรรจุใหม่
          </Typography>
          <Typography
            color="textPrimary"
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
            align="center"
          >
            รายวิชา ทดสอบรายวิชา 01
          </Typography>
        </Grid>
      </Box>
      <Divider />
      <List component="div" disablePadding dense>
        {course3.map((item, index) => (
          <MenuItem
            button
            key={index}
            selected={item.id === id}
            component={RouterLink}
            to={item.link ? item.link : `${path}/learn/demo`}
            className={clsx({
              [classes.nested]: true,
              [classes.completed]: item.completed,
            })}
          >
            <ListItemIcon>
              {item.completed ? (
                <Badge
                  badgeContent={
                    <CheckIcon
                      style={{ color: green[800], fontSize: "18px" }}
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

      <Divider variant="middle" />
      <Box mt={3} mb={2}>
        <Grid container justify="center" direction="column" alignItems="center">
          <Grid item>
            <Typography component="p" variant="caption" align="center">
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
