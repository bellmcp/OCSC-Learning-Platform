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
  getContentType,
  getContentTypeText,
  getContentTypeIcon,
} from "utils/contentType";

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

export default function ContentList({ courseContents, handleClose }: any) {
  const classes = useStyles();
  const { pathname, search } = useLocation();
  const { contentId } = queryString.parse(search);

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
              onClick={handleClose && handleClose}
            >
              <ListItemIcon>
                {getContentTypeIcon(
                  courseContent?.type,
                  getContentType(courseContent.content1)
                )}
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
                      {`${getContentTypeText(
                        getContentType(courseContent.content1)
                      )}${
                        courseContent.minutes
                          ? `, ${courseContent.minutes} นาที`
                          : ""
                      }`}
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
