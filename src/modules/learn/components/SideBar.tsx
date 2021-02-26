// @ts-nocheck
import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  ListSubheader,
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
  Toolbar,
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
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    completed: {
      paddingLeft: theme.spacing(2),
      borderLeft: `8px solid ${green[800]}`,
    },
  })
);

export default function SideBar({ id, course, courseContents }: any) {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const path = "/learning-platform";

  const linkToLearn = () => {
    history.push(`${path}/learn`);
  };

  function GenerateCourseContentIcon(type: string) {
    switch (type) {
      case "c":
        return <VideoIcon />;
      case "r":
        return <ReadIcon />;
      case "t":
        return <QuizIcon />;
      case "e":
        return <SurveyIcon />;
      default:
        return <FileIcon />;
    }
  }

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" style={{ zIndex: 2 }}>
          <Toolbar />
          <Box mt={1} mb={3}>
            <Button
              variant="text"
              color="default"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={linkToLearn}
            >
              ออกจากห้องเรียน
            </Button>
            <Box mt={1} mx={2}>
              <Typography
                color="textPrimary"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  lineHeight: "1.1",
                }}
                gutterBottom
              >
                {course?.name ? course?.name : "รายวิชา"}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {course?.code ? course?.code : "รหัสวิชา"}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </ListSubheader>
      }
      className={classes.root}
      dense
    >
      <List component="div">
        {courseContents.length === 0 ? (
          <Grid container justify="center" alignItems="center">
            <Box my={6}>
              <Typography variant="body2" color="textSecondary">
                ไม่มีเนื้อหารายวิชา
              </Typography>
            </Box>
          </Grid>
        ) : (
          <>
            {courseContents.map((courseContent) => (
              <MenuItem
                button
                // selected={item.id === id}
                // className={clsx({
                //   [classes.nested]: true,
                //   [classes.completed]: item.completed,
                // })}
                className={classes.nested}
                component={RouterLink}
                to={`${pathname}?contentId=${courseContent.id}`}
                // onClick={() => console.log(courseContent.id)}
                // onClick={linkToContent(1)}
              >
                <ListItemIcon>
                  {GenerateCourseContentIcon(courseContent.type)}
                </ListItemIcon>
                {/* <ListItemIcon>
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
            </ListItemIcon> */}
                <ListItemText
                  primary={
                    <Typography variant="body1" color="textPrimary">
                      {courseContent.name ? courseContent.name : "เนื้อหา"}
                    </Typography>
                  }
                  secondary={
                    courseContent.minutes && (
                      <Typography variant="body2" color="textSecondary">
                        {courseContent.minutes} นาที
                      </Typography>
                    )
                  }
                />
              </MenuItem>
            ))}
          </>
        )}
      </List>

      <Divider variant="middle" />
      <Box my={4}>
        <Grid container justify="center" direction="column" alignItems="center">
          <Grid item>
            <Typography
              component="p"
              variant="body2"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              โปรดให้คะแนนรายวิชา
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
