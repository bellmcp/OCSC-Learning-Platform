// @ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import {
  useMediaQuery,
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Assignment as AssignmentIcon,
  Equalizer as AssessmentIcon,
  Create as CreateIcon,
  Info as InfoIcon,
  People as PeopleIcon,
  GpsFixed as TargetIcon,
  PeopleAlt as InstructorIcon,
} from '@material-ui/icons';
import {
  getContentType,
  getContentTypeText,
  getContentTypeIcon,
  getContentTypeTitle,
} from 'utils/contentType';

import * as coursesActions from '../actions';
import * as registrationsActions from 'modules/registrations/actions';
import * as categoriesActions from 'modules/categories/actions';
import CourseHeader from './CourseHeader';
import CourseRound from './CourseRound';
import Loading from 'modules/ui/components/Loading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
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
      flexBasis: '100%',
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
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { id: courseId }: any = useParams();

  const dispatch = useDispatch();
  const [course] = useSelector((state) => state.courses.items);
  const { rounds, contents } = useSelector((state) => state.courses);
  const { isLoading: isCourseLoading } = useSelector((state) => state.courses);
  const { items: categories } = useSelector((state) => state.categories);
  const { myCourses, localDateTime } = useSelector(
    (state) => state.registrations
  );

  useEffect(() => {
    const load_local_date_time = registrationsActions.loadLocalDateTime();
    dispatch(load_local_date_time);
  }, [dispatch]);

  useEffect(() => {
    const courses_action = coursesActions.loadCourse(courseId);
    dispatch(courses_action);
  }, [dispatch, courseId]);

  useEffect(() => {
    const course_registrations_action =
      registrationsActions.loadCourseRegistrations();
    dispatch(course_registrations_action);
  }, [dispatch]);

  useEffect(() => {
    const course_round_action = coursesActions.loadCourseRounds(courseId);
    dispatch(course_round_action);
  }, [dispatch, courseId]);

  useEffect(() => {
    const course_content_action = coursesActions.loadCourseContents(courseId);
    dispatch(course_content_action);
  }, [dispatch, courseId]);

  useEffect(() => {
    const categories_action = categoriesActions.loadCategories();
    dispatch(categories_action);
  }, [dispatch]);

  const courseInfoPlaceholder = [
    {
      title: 'เป้าหมายการเรียนรู้',
      detail: course?.learningObjective
        ? course?.learningObjective
        : 'ไม่มีข้อมูล',
      icon: <AssignmentIcon />,
    },
    {
      title: 'วิทยากร',
      detail: course?.instructor ? course?.instructor : 'ไม่มีข้อมูล',
      icon: <InstructorIcon />,
    },
    {
      title: 'ประเด็นการเรียนรู้',
      detail: course?.learningTopic ? course?.learningTopic : 'ไม่มีข้อมูล',
      icon: <CreateIcon />,
    },
    {
      title: 'วิธีการประเมินผล',
      detail: course?.assessment ? course?.assessment : 'ไม่มีข้อมูล',
      icon: <AssessmentIcon />,
    },
    {
      title: 'กลุ่มเป้าหมาย',
      detail: course?.targetGroup ? course?.targetGroup : 'ไม่มีข้อมูล',
      icon: <TargetIcon />,
    },
    {
      title: 'หมายเหตุ',
      detail: course?.seqFlow
        ? 'บังคับเรียนตามลำดับเนื้อหา'
        : 'ไม่บังคับเรียนตามลำดับเนื้อหา',
      icon: <InfoIcon />,
    },
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
                fontSize: '1.7rem',
                lineHeight: '1.1',
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
        title={course?.name ? course?.name : 'รายวิชา'}
        code={course?.code ? course?.code : 'รหัสรายวิชา'}
        icon={<PeopleIcon fontSize="large" style={{ marginRight: '24px' }} />}
        imageUrl={course?.thumbnail}
        categoryId={course?.courseCategoryId}
        category={categories[course?.courseCategoryId - 1]?.courseCategory}
      />
      <Container>
        <div className={classes.main}>
          <div className={classes.content}>
            {isCourseLoading ? (
              <Loading height={350} />
            ) : (
              <>
                <Box mt={2}>
                  <Grid
                    container
                    spacing={matches ? 6 : 0}
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} sm={7}>
                      {courseInfoPlaceholder.slice(0, 3).map((item, index) => (
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
                        .slice(3, courseInfoPlaceholder.length)
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

                {rounds.length !== 0 && (
                  <>
                    <Box mt={2} mb={3}>
                      <Divider />
                    </Box>
                    {rounds.map((round, id) => (
                      <>
                        {id !== 0 && <Divider />}
                        <Box my={5}>
                          <CourseRound
                            {...round}
                            myCourses={myCourses}
                            courseId={courseId}
                            localDateTime={localDateTime}
                          />
                        </Box>
                      </>
                    ))}
                  </>
                )}

                {contents.length !== 0 && (
                  <>
                    <Box mt={2} mb={3}>
                      <Divider />
                    </Box>
                    <Grid
                      container
                      direction="row"
                      justify={matches ? 'flex-start' : 'center'}
                      alignItems="center"
                    >
                      <Typography
                        style={{
                          fontSize: '1.7rem',
                          fontWeight: 600,
                        }}
                      >
                        ประมวลรายวิชา
                      </Typography>
                    </Grid>
                    <Box my={1} style={{ maxWidth: 720 }}>
                      <List>
                        {contents.map((content, id) => (
                          <>
                            {id !== 0 && <Divider variant="middle" />}
                            <ListItem>
                              <ListItemIcon>
                                {getContentTypeIcon(
                                  content.type,
                                  getContentType(content.content1)
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  content.name
                                    ? content.name
                                    : getContentTypeTitle(
                                        content.type,
                                        getContentType(content.content1)
                                      )
                                }
                                primaryTypographyProps={{
                                  style: {
                                    lineHeight: '1.3',
                                  },
                                }}
                                secondary={`${getContentTypeText(
                                  getContentType(content.content1)
                                )}${
                                  content.minutes
                                    ? `, ${content.minutes} นาที`
                                    : ''
                                }`}
                                secondaryTypographyProps={{
                                  style: {
                                    marginTop: 2,
                                  },
                                }}
                              />
                            </ListItem>
                          </>
                        ))}
                      </List>
                    </Box>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
