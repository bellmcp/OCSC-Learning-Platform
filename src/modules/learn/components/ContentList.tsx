// @ts-nocheck
import React from "react";
import queryString from "query-string";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
  PlayCircleFilled as VideoIcon,
  MenuBook as ReadIcon,
  LibraryBooks as QuizIcon,
  ThumbUp as SurveyIcon,
  Language as FileIcon,
} from "@material-ui/icons";

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

export default function ContentList({ courseContents }: any) {
  const classes = useStyles();
  const { pathname, search } = useLocation();
  const { contentId } = queryString.parse(search);

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
              selected={parseInt(contentId) === courseContent?.id}
              // className={clsx({
              //   [classes.nested]: true,
              //   [classes.completed]: item.completed,
              // })}
              className={classes.nested}
              component={RouterLink}
              to={`${pathname}?contentId=${courseContent?.id}`}
            >
              <ListItemIcon>
                {GenerateCourseContentIcon(courseContent?.type)}
                {/* {item.completed ? (
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
              )} */}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textPrimary">
                    {courseContent?.name ? courseContent?.name : "เนื้อหา"}
                  </Typography>
                }
                secondary={
                  courseContent?.minutes && (
                    <Typography variant="body2" color="textSecondary">
                      {courseContent?.minutes} นาที
                    </Typography>
                  )
                }
              />
            </MenuItem>
          ))}
        </>
      )}
    </List>
  );
}
