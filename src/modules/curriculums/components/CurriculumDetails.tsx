// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  Avatar,
  CircularProgress,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import {
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Create as CreateIcon,
  People as PeopleIcon,
  ArrowForwardIos as ArrowForwardIcon,
} from "@material-ui/icons";
import { isLogin } from "utils/isLogin";

import * as curriculumsActions from "../actions";
import * as coursesActions from "modules/courses/actions";
import * as categoriesActions from "modules/categories/actions";
import * as registrationsActions from "modules/registrations/actions";
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
      [theme.breakpoints.down("xs")]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },
    amber: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { id }: any = useParams();
  const history = useHistory();
  const path = "/learning-platform";

  const dispatch = useDispatch();
  const [curriculum] = useSelector((state) => state.curriculums.items);
  const { isLoading: isCurriculumLoading } = useSelector(
    (state) => state.curriculums
  );
  const { items: categories } = useSelector((state) => state.categories);
  var { myCurriculums } = useSelector((state) => state.registrations);
  const { child: childCourses } = useSelector((state) => state.curriculums);

  if (myCurriculums === "") {
    myCurriculums = [];
  }

  useEffect(() => {
    const curriculum_action = curriculumsActions.loadCurriculum(id);
    dispatch(curriculum_action);
  }, [dispatch, id]);

  useEffect(() => {
    const curriculum_registrations_action = registrationsActions.loadCurriculumRegistrations();
    dispatch(curriculum_registrations_action);
  }, [dispatch]);

  useEffect(() => {
    const curriculum_child_action = curriculumsActions.loadCurriculumChild(id);
    dispatch(curriculum_child_action);
  }, [dispatch, id]);

  useEffect(() => {
    const courses_action = coursesActions.loadCourses();
    dispatch(courses_action);
  }, [dispatch]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  const linkToLogin = () => {
    history.push(`${path}/login`);
  };

  const linkToLearn = () => {
    history.push(`${path}/learn`);
  };

  const registerCurriculum = () => {
    const registration_action = registrationsActions.registerCurriculum(id);
    dispatch(registration_action);
  };

  const curriculumInfoPlaceholder = [
    {
      title: "เป้าหมายการเรียนรู้",
      detail: curriculum?.learningObjective
        ? curriculum?.learningObjective
        : "ไม่มีข้อมูล",
      icon: <AssignmentIcon />,
    },
    {
      title: "ประเด็นการเรียนรู้",
      detail: curriculum?.learningTopic
        ? curriculum?.learningTopic
        : "ไม่มีข้อมูล",
      icon: <CreateIcon />,
    },
    {
      title: "วิธีการประเมินผล",
      detail: curriculum?.assessment ? curriculum?.assessment : "ไม่มีข้อมูล",
      icon: <AssessmentIcon />,
    },
    {
      title: "กลุ่มเป้าหมาย",
      detail: curriculum?.targetGroup ? curriculum?.targetGroup : "ไม่มีข้อมูล",
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
                lineHeight: "1.1",
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

  function renderRegisterButton() {
    if (!isLogin()) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            โปรดเข้าสู่ระบบเพื่อลงทะเบียนหลักสูตร
          </Typography>
          <Box my={2}>
            <Button
              color="secondary"
              variant="contained"
              onClick={linkToLogin}
              fullWidth={!matches}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Grid>
      );
    } else if (
      isLogin() &&
      myCurriculums.filter(
        (myCurriculum) => myCurriculum.curriculumId === parseInt(id)
      ).length !== 0
    ) {
      return (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            คุณลงทะเบียนหลักสูตรนี้แล้ว เข้าเรียนได้เลย
          </Typography>
          <Box my={2}>
            <Button
              color="secondary"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={linkToLearn}
              fullWidth={!matches}
            >
              เข้าเรียน
            </Button>
          </Box>
        </Grid>
      );
    } else {
      return (
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIcon />}
            onClick={registerCurriculum}
          >
            ลงทะเบียนหลักสูตร
          </Button>
        </Grid>
      );
    }
  }

  return (
    <>
      <CurriculumHeader
        title={curriculum?.name ? curriculum?.name : "หลักสูตร"}
        code={curriculum?.code ? curriculum?.code : "รหัสหลักสูตร"}
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
                  <Grid
                    container
                    direction="row"
                    justify={matches ? "flex-start" : "center"}
                    alignItems="center"
                  >
                    <Typography
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: 600,
                      }}
                    >
                      หลักสูตรนี้ประกอบด้วย
                    </Typography>
                  </Grid>
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
                <Grid
                  container
                  direction="row"
                  justify={matches ? "flex-start" : "center"}
                  alignItems="center"
                >
                  <Typography
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: 600,
                    }}
                  >
                    ลงทะเบียน
                  </Typography>
                </Grid>
                <Box my={3}>
                  <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    direction="row"
                    justify={matches ? "flex-start" : "center"}
                  >
                    {renderRegisterButton()}
                  </Grid>
                </Box>
              </>
            )}
          </main>
        </div>
      </Container>
    </>
  );
}
