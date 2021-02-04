// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  Avatar,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import {
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Create as CreateIcon,
  Info as InfoIcon,
  People as PeopleIcon,
} from "@material-ui/icons";
import { amber } from "@material-ui/core/colors";

import * as actions from "../actions";

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

export default function CourseDetails() {
  const classes = useStyles();
  const { id }: any = useParams();

  const dispatch = useDispatch();
  const [course] = useSelector((state) => state.courses.items);
  const { isLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    const action = actions.loadCourse(id);
    dispatch(action);
  }, [dispatch, id]);

  const courseInfoPlaceholder = [
    {
      title: "เป้าหมายการเรียนรู้",
      detail: course?.LearningObjective,
      icon: <AssignmentIcon />,
    },
    {
      title: "ประเด็นการเรียนรู้",
      detail: course?.LearningTopic,
      icon: <CreateIcon />,
    },
    {
      title: "วิธีการประเมินผล",
      detail: course?.Assessment,
      icon: <AssessmentIcon />,
    },
    {
      title: "กลุ่มเป้าหมาย",
      detail: course?.TargetGroup,
      icon: <PeopleIcon />,
    },
    {
      title: "หมายเหตุ",
      detail: course?.SeqFlow
        ? "บังคับเรียนตามลำดับเนื้อหา"
        : "ไม่บังคับเรียนตามลำดับเนื้อหา",
      icon: <InfoIcon />,
    },
  ];

  function RenderCourseInfo({ index, title, info, icon }: any) {
    return (
      <Box mb={3} key={index}>
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
    <>
      <Toolbar />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            {isLoading ? (
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: 500 }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <>
                <Grid container justify="space-between" alignItems="center">
                  <h1>รายวิชา {course?.Name}</h1>
                  <Typography
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    รหัสวิชา: {course?.Code}
                  </Typography>
                </Grid>

                <Box mb={3}>
                  <Divider />
                </Box>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={7}>
                    {courseInfoPlaceholder.slice(0, 2).map((item, index) => (
                      <RenderCourseInfo
                        index={index}
                        title={item.title}
                        info={item.detail}
                        icon={item.icon}
                      />
                    ))}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    {courseInfoPlaceholder
                      .slice(2, courseInfoPlaceholder.length)
                      .map((item, index) => (
                        <RenderCourseInfo
                          index={index}
                          title={item.title}
                          info={item.detail}
                          icon={item.icon}
                        />
                      ))}
                  </Grid>
                </Grid>
              </>
            )}
          </main>
        </div>
      </Container>
    </>
  );
}
