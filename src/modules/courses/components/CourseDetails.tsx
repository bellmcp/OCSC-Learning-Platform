// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  useMediaQuery,
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  Avatar,
  CircularProgress,
  LinearProgress,
  Button,
} from "@material-ui/core";
import {
  Assignment as AssignmentIcon,
  Equalizer as AssessmentIcon,
  Create as CreateIcon,
  Info as InfoIcon,
  People as PeopleIcon,
  ArrowForwardIos as ArrowForwardIcon,
} from "@material-ui/icons";
import { amber } from "@material-ui/core/colors";

import * as coursesActions from "../actions";
import * as categoriesActions from "modules/categories/actions";
import CourseHeader from "./CourseHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { id }: any = useParams();

  const dispatch = useDispatch();
  const [course] = useSelector((state) => state.courses.items);
  const { isLoading: isCourseLoading } = useSelector((state) => state.courses);
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const courses_action = coursesActions.loadCourse(id);
    dispatch(courses_action);
  }, [dispatch, id]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  const courseInfoPlaceholder = [
    {
      title: "เป้าหมายการเรียนรู้",
      detail: course?.learningObjective,
      icon: <AssignmentIcon />,
    },
    {
      title: "ประเด็นการเรียนรู้",
      detail: course?.learningTopic,
      icon: <CreateIcon />,
    },
    {
      title: "วิธีการประเมินผล",
      detail: course?.assessment,
      icon: <AssessmentIcon />,
    },
    {
      title: "กลุ่มเป้าหมาย",
      detail: course?.targetGroup,
      icon: <PeopleIcon />,
    },
    {
      title: "หมายเหตุ",
      detail: course?.seqFlow
        ? "บังคับเรียนตามลำดับเนื้อหา"
        : "ไม่บังคับเรียนตามลำดับเนื้อหา",
      icon: <InfoIcon />,
    },
  ];

  const roundInfoPlaceholder = [
    { title: "เปิดให้ลงทะเบียน", detail: "2020-01-01 ถึง 2020-01-31" },
    {
      title: "เงื่อนไขการลงทะเบียน",
      detail: "เฉพาะข้าราชการบรรจุใหม่กระทรวงการคลังเท่านั้น",
    },
    { title: "เข้าเรียนได้ตั้งแต่", detail: "2020-02-01 ถึง 2020-03-31" },
    { title: "จำนวนผู้เรียนที่รับได้สูงสุด", detail: "300 คน" },
  ];

  function RenderCourseInfo({ index, title, info, icon }: any) {
    return (
      <Box mb={4} key={index}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
          wrap="nowrap"
          style={{
            marginBottom: 4,
          }}
        >
          <Grid item>
            <Avatar className={classes.amber}>{icon}</Avatar>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              style={{
                fontSize: "1.7rem",
                lineHeight: "0.9",
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: 58 }}
          >
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
      <CourseHeader
        title={course?.name}
        code={course?.code}
        icon={<PeopleIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={course?.thumbnail}
        categoryId={course?.courseCategoryId}
        category={categories[course?.courseCategoryId - 1]?.courseCategory}
      />
      <Container>
        <div className={classes.main}>
          <div className={classes.content}>
            {isCourseLoading ? (
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: 350 }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <>
                <Box mt={2}>
                  <Grid
                    container
                    spacing={matches ? 6 : 0}
                    alignItems="flex-start"
                  >
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
                </Box>

                <Box mt={2} mb={3}>
                  <Divider />
                </Box>

                <Box mt={4} mb={6}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={7}>
                      <Typography
                        style={{
                          fontSize: "1.7rem",
                          fontWeight: 600,
                        }}
                      >
                        รอบที่ 1/2563
                      </Typography>
                      <Box mb={3}>
                        <Box display="flex" alignItems="center">
                          <Box width="100%">
                            <Typography
                              variant="body2"
                              color="primary"
                              align="right"
                            >
                              100 / 300 คน
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={33}
                              color="secondary"
                            />
                          </Box>
                          <Box></Box>
                        </Box>
                      </Box>
                      <Box my={3}>
                        <Button
                          variant="contained"
                          color="secondary"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => alert("Register")}
                        >
                          ลงทะเบียนเรียน
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      {roundInfoPlaceholder.map((item, index) => (
                        <Grid
                          container
                          spacing={3}
                          key={index}
                          alignItems="baseline"
                        >
                          <Grid item xs={6}>
                            <Typography variant="h6">{item.title}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.detail
                                    ? item.detail
                                    : "ไม่มีข้อมูล",
                                }}
                              ></div>
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
