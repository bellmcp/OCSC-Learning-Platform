// @ts-nocheck
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import DayJS from 'react-dayjs';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import {
  useMediaQuery,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  Divider,
  CardActionArea,
  Collapse,
  Tooltip,
  Link,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { green, amber, grey } from '@material-ui/core/colors';
import { CheckCircle as CheckIcon } from '@material-ui/icons';

import MyCourseItem from './MyCourseItem';
import * as registrationsActions from '../actions';

import { MyCurriculumProps } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(0),
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    cardImage: {
      width: '166px',
      borderRadius: '4 0 0 0',
    },
    stack: {
      boxShadow:
        '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0px rgb(0 0 0 / 14%), 0 1px 3px 0px rgb(0 0 0 / 12%), 0 -1px 1px rgb(0 0 0 / 15%), 0 -14px 0 -5px rgb(243 243 243), 0 -14px 5px -4px rgb(0 0 0 / 20%), 0 -28px 0 -10px rgb(238 238 238), 0px -28px 5px -9px rgb(0 0 0 / 20%)',
    },
    stackHide: {
      boxShadow:
        '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0px rgb(0 0 0 / 14%), 0 1px 3px 0px rgb(0 0 0 / 12%), 0 -1px 1px rgb(0 0 0 / 15%), 0 -10px 0 -5px rgb(243 243 243), 0 -10px 5px -4px rgb(0 0 0 / 20%), 0 -22px 0 -10px rgb(238 238 238), 0px -22px 5px -9px rgb(0 0 0 / 20%)',
    },
  })
);

export default function MyCurriculumItem({
  id,
  registrationDate,
  satisfactionScore,
  isCompleted,
  completeDate,
  code,
  name,
  thumbnail,
  myCourses,
  localDateTime,
}: MyCurriculumProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [showChildCourses, setshowChildCourses] = useState(true);

  useEffect(() => {
    setValue(satisfactionScore);
  }, [satisfactionScore]);

  const updateSatisfactionScore = (newValue) => {
    const satisfaction_score_action =
      registrationsActions.updateCurriculumSatisfactionScore(id, newValue);
    dispatch(satisfaction_score_action);
    setValue(newValue);
  };

  const handleOnClickCard = () => {
    setshowChildCourses(!showChildCourses);
  };

  const childCoursesLength = myCourses.filter(
    (myCourse) => myCourse.curriculumRegistrationId === id
  ).length;

  return (
    <>
      <Card
        className={clsx({
          [classes.stack]: showChildCourses,
          [classes.stackHide]: !showChildCourses,
        })}
        style={{ marginTop: 28 }}
      >
        <Tooltip title={`${showChildCourses ? 'ซ่อน' : 'แสดง'}รายวิชาย่อย`}>
          <CardActionArea onClick={handleOnClickCard}>
            <div className={classes.details}>
              <CardMedia
                image={thumbnail}
                style={{
                  background: `url('${thumbnail}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  borderLeft: isCompleted
                    ? `6px solid ${green[800]}`
                    : `6px solid ${amber[500]}`,
                }}
                className={classes.cardImage}
              />
              <div className={classes.controls}>
                <Grid container direction="column" justify="center">
                  <Box
                    my={2}
                    mx={3}
                    flex
                    style={{
                      display: 'flex',
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      wrap="nowrap"
                    >
                      <Grid item>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{
                            color: amber[500],
                            fontWeight: 'bold',
                            lineHeight: '1.1',
                            marginBottom: 4,
                          }}
                        >
                          หลักสูตร
                        </Typography>
                        <Typography
                          variant="h6"
                          component="h2"
                          style={{
                            lineHeight: '1.1',
                            marginBottom: 4,
                            fontWeight: 600,
                          }}
                        >
                          {name ? name : 'หลักสูตร'}
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                          {code ? code : 'รหัสหลักสูตร'}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          color="textSecondary"
                          gutterBottom
                        >
                          {childCoursesLength} รายวิชา
                        </Typography>
                        <Typography
                          variant="caption"
                          component="p"
                          color="textSecondary"
                          style={{ lineHeight: '1.2' }}
                          gutterBottom
                        >
                          <b>ลงทะเบียน </b>
                          <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                            {registrationDate
                              ? registrationDate
                              : 'ไม่มีข้อมูล'}
                          </DayJS>
                        </Typography>
                      </Grid>
                      {!matches && (
                        <Grid item>
                          <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            wrap="nowrap"
                          >
                            {isCompleted && (
                              <Grid item>
                                <CheckIcon
                                  style={{
                                    color: green[800],
                                    marginTop: 6,
                                  }}
                                />
                              </Grid>
                            )}
                            <Grid item>
                              <Typography
                                gutterBottom
                                component="p"
                                variant="body2"
                                align="center"
                                color="textSecondary"
                              >
                                โปรดให้คะแนนหลักสูตร
                              </Typography>
                              <Rating
                                name="size-large"
                                value={value}
                                size="large"
                                onChange={(event, newValue) => {
                                  updateSatisfactionScore(newValue);
                                }}
                              />
                              {isCompleted && (
                                <Typography
                                  variant="caption"
                                  component="p"
                                  color="textSecondary"
                                  align="center"
                                  style={{ lineHeight: '1.2', marginTop: 8 }}
                                >
                                  <span style={{ color: green[800] }}>
                                    <b>สำเร็จการศึกษา </b>
                                    <DayJS
                                      format="D/M/YYYY"
                                      add={{ years: 543 }}
                                    >
                                      {completeDate
                                        ? completeDate
                                        : 'ไม่มีข้อมูล'}
                                    </DayJS>
                                  </span>
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              </div>
            </div>
          </CardActionArea>
        </Tooltip>
        {matches && (
          <>
            <Divider />
            <Box m={1}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
              >
                <Grid item>
                  <Typography
                    component="p"
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    โปรดให้คะแนนหลักสูตร
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="size-large"
                    value={value}
                    size="large"
                    onChange={(event, newValue) => {
                      updateSatisfactionScore(newValue);
                    }}
                  />
                </Grid>
              </Grid>
              {isCompleted && (
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: 8, marginBottom: 16 }}
                >
                  <CheckIcon
                    style={{
                      color: green[800],
                      fontSize: 16,
                      marginRight: 8,
                    }}
                  />
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                    align="center"
                    style={{
                      lineHeight: '1.2',
                    }}
                  >
                    <span style={{ color: green[800] }}>
                      <b>สำเร็จการศึกษา </b>
                      <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                        {completeDate ? completeDate : 'ไม่มีข้อมูล'}
                      </DayJS>
                    </span>
                  </Typography>
                </Grid>
              )}
            </Box>
          </>
        )}
      </Card>
      <Collapse in={showChildCourses}>
        {myCourses.filter(
          (myCourse) => myCourse.curriculumRegistrationId === id
        ).length !== 0 && (
          <Box px={2} pt={2} style={{ borderLeft: `2px dotted ${grey[300]}` }}>
            <Grid container direction="column" spacing={2}>
              {myCourses
                .filter((myCourse) => myCourse.curriculumRegistrationId === id)
                .map((childCourse) => (
                  <Grid item key={childCourse.id}>
                    <MyCourseItem
                      {...childCourse}
                      localDateTime={localDateTime}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
      </Collapse>
      {!showChildCourses && (
        <Box mt={3}>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            align="center"
          >
            {childCoursesLength} รายวิชาถูกซ่อน{' '}
            <Link onClick={handleOnClickCard} style={{ cursor: 'pointer' }}>
              (แสดง)
            </Link>
          </Typography>
        </Box>
      )}
    </>
  );
}
