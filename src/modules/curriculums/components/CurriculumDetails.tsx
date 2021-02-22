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
  CircularProgress,
  Button,
} from "@material-ui/core";
import {
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Create as CreateIcon,
  People as PeopleIcon,
  ArrowForwardIos as ArrowForwardIcon,
} from "@material-ui/icons";
import { amber } from "@material-ui/core/colors";

import * as curriculumsActions from "../actions";
import * as coursesActions from "modules/courses/actions";
import * as categoriesActions from "modules/categories/actions";
import CurriculumHeader from "modules/curriculums/components/CurriculumHeader";
import CourseItem from "modules/courses/components/CourseItem";

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

export default function CurriculumDetails() {
  const classes = useStyles();
  const { id }: any = useParams();

  const dispatch = useDispatch();
  const [curriculum] = useSelector((state) => state.curriculums.items);
  const { child: childCourses } = useSelector((state) => state.curriculums);
  const { isLoading: isCurriculumLoading } = useSelector(
    (state) => state.curriculums
  );
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const curriculum_action = curriculumsActions.loadCurriculum(id);
    dispatch(curriculum_action);
  }, [dispatch, id]);

  useEffect(() => {
    const curriculum_child_action = curriculumsActions.loadCurriculumChild(id);
    dispatch(curriculum_child_action);
  }, [dispatch, id]);

  useEffect(() => {
    const courses_action = coursesActions.loadCourses("/");
    dispatch(courses_action);
  }, [dispatch]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  const curriculumInfoPlaceholder = [
    {
      title: "เป้าหมายการเรียนรู้",
      detail: curriculum?.learningObjective,
      icon: <AssignmentIcon />,
    },
    {
      title: "ประเด็นการเรียนรู้",
      detail: curriculum?.learningTopic,
      icon: <CreateIcon />,
    },
    {
      title: "วิธีการประเมินผล",
      detail: curriculum?.assessment,
      icon: <AssessmentIcon />,
    },
    {
      title: "กลุ่มเป้าหมาย",
      detail: curriculum?.targetGroup,
      icon: <PeopleIcon />,
    },
  ];

  function RenderCurriculumInfo({ index, title, info, icon }: any) {
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
      <CurriculumHeader
        title={curriculum?.name}
        code={curriculum?.code}
        icon={<PeopleIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={curriculum?.thumbnail}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            {isCurriculumLoading ? (
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
                <Box mt={2}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={7}>
                      {curriculumInfoPlaceholder
                        .slice(0, 2)
                        .map((item, index) => (
                          <RenderCurriculumInfo
                            index={index}
                            title={item.title}
                            info={item.detail}
                            icon={item.icon}
                          />
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      {curriculumInfoPlaceholder
                        .slice(2, curriculumInfoPlaceholder.length)
                        .map((item, index) => (
                          <RenderCurriculumInfo
                            index={index}
                            title={item.title}
                            info={item.detail}
                            icon={item.icon}
                          />
                        ))}
                    </Grid>
                  </Grid>

                  <Box mt={2} mb={4}>
                    <Divider />
                  </Box>

                  <Typography
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: 600,
                    }}
                  >
                    หลักสูตรนี้ประกอบด้วย
                  </Typography>
                  <Box my={3}>
                    <Grid container spacing={1}>
                      {childCourses.map((course) => (
                        <Grid item key={course.id} xs={12} sm={4} md={3}>
                          <CourseItem {...course} categories={categories} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>

                <Box mt={2} mb={4}>
                  <Divider />
                </Box>

                <Typography
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 600,
                  }}
                >
                  ลงทะเบียน
                </Typography>

                <Box my={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => alert("Register")}
                  >
                    ลงทะเบียนหลักสูตร
                  </Button>
                </Box>
              </>
            )}
          </main>
        </div>
      </Container>
    </>
  );
}
