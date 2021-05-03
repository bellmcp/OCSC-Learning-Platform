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
  getContentTypeTitle,
} from "utils/contentType";
import { LineWeight } from "@material-ui/icons";

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
  isSeqentialFlow,
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

  //SEQUENTIAL FLOW
  function isDisableContentViewItem(itemId) {
    if (isSeqentialFlow && itemId !== 0) {
      return !contentViews[itemId - 1]?.isCompleted;
    }
    return false;
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
          {courseContents.map((courseContent, id) => (
            <MenuItem
              button
              disabled={isDisableContentViewItem(id)}
              selected={parseInt(contentId) === courseContent?.id}
              className={clsx({
                [classes.nested]: true,
                [classes.completed]: getContentViewById(courseContent?.id)[0]
                  ?.isCompleted,
              })}
              component={RouterLink}
              to={`${pathname}?contentId=${courseContent?.id}`}
              onClick={handleMobileDialogClose && handleMobileDialogClose}
              style={{ whiteSpace: "normal" }}
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
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    style={{ lineHeight: "1.4" }}
                  >
                    {courseContent?.name
                      ? courseContent?.name
                      : getContentTypeTitle(
                          courseContent?.type,
                          getContentType(courseContent?.content1)
                        )}
                  </Typography>
                }
                secondary={
                  courseContent?.minutes && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: 2 }}
                    >
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
