// @ts-nocheck
import React from "react";
import clsx from "clsx";
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
  Badge,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
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
      paddingLeft: 26,
      borderLeft: `6px solid ${green[800]}`,
    },
  })
);

export default function ContentList({
  courseContents,
  contentViews,
  handleMobileDialogClose,
}: any) {
  const classes = useStyles();
  const { pathname, search } = useLocation();
  const { contentId } = queryString.parse(search);

  function getContentViewById(contentId: any) {
    const result = contentViews.filter(
      (contentView) => contentView.courseContentId === contentId
    );
    return result;
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
              className={clsx({
                [classes.nested]: true,
                [classes.completed]: getContentViewById(courseContent?.id)[0]
                  ?.isCompleted,
              })}
              component={RouterLink}
              to={`${pathname}?contentId=${courseContent?.id}`}
              onClick={handleMobileDialogClose && handleMobileDialogClose}
            >
              <ListItemIcon>
                <Badge
                  badgeContent={
                    getContentViewById(courseContent?.id)[0]?.isCompleted ? (
                      <CheckCircleIcon
                        style={{ color: green[800], fontSize: "16px" }}
                      />
                    ) : null
                  }
                >
                  {getContentTypeIcon(
                    courseContent?.type,
                    getContentType(courseContent.content1)
                  )}
                </Badge>
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
