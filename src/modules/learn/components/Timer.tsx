//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
  Hidden,
  Box,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import * as learnActions from '../actions';
import * as uiActions from 'modules/ui/actions';

export default function Timer({
  contentId,
  activeContentView,
  currentContentView,
  courseRegistrationDetails,
  contentListProgress,
  setContentListProgress,
}: any) {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [contentViewId, setContentViewId] = useState(0);
  const [courseRegistrationId, setCourseRegistrationId] = useState(0);
  const [initialContentMinutes, setInitialContentMinutes] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(currentContentView?.isCompleted);
  }, [currentContentView]);

  useEffect(() => {
    setContentLength(activeContentView[0]?.minutes);
  }, [activeContentView]);

  useEffect(() => {
    setInitialContentMinutes(
      Math.round(currentContentView?.contentSeconds / 60)
    );
  }, [contentId, initialContentMinutes, currentContentView]);

  if (
    initialContentMinutes == null ||
    initialContentMinutes === undefined ||
    isNaN(initialContentMinutes)
  ) {
    setInitialContentMinutes(0);
  }

  useEffect(() => {
    setContentViewId(currentContentView?.id);
  }, [currentContentView]);

  useEffect(() => {
    setCourseRegistrationId(courseRegistrationDetails[0]?.id);
  }, [courseRegistrationDetails]);

  // CLOCK
  useEffect(() => {
    if (contentId !== undefined) {
      const round = setInterval(() => {
        setTimer((prevTimer) => (prevTimer >= 59 ? 0 : prevTimer + 1));
      }, 1000);
      return () => {
        clearInterval(round);
      };
    }
  }, [contentId]);

  // MINUTE PROGRESS
  useEffect(() => {
    if (contentId !== undefined) {
      const sequence = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
        const isGoingToComplete =
          progress + 1 === contentLength && !isCompleted;
        const update_content_view_action = learnActions.updateContentView(
          courseRegistrationId,
          contentViewId,
          60,
          isGoingToComplete ? false : true
        );
        dispatch(update_content_view_action);

        if (isGoingToComplete) {
          dispatch(
            uiActions.setFlashMessage(
              'คุณเรียนเนื้อหานี้ครบเวลาที่กำหนดแล้ว',
              'success'
            )
          );
          const updatedContentListProgress = contentListProgress.map(
            (contentList: any) => {
              if (contentList.courseContentId === parseInt(contentId)) {
                return {
                  courseContentId: contentList.courseContentId,
                  isCompleted: true,
                };
              }
              return contentList;
            }
          );
          setContentListProgress(updatedContentListProgress);
        }
      }, 60000);
      return () => {
        clearTimeout(sequence);
      };
    }
  }, [
    contentId,
    courseRegistrationId,
    contentViewId,
    progress,
    contentLength,
    dispatch,
  ]);

  useEffect(() => {
    setTimer(0);
    setProgress(initialContentMinutes);
  }, [contentId, initialContentMinutes]);

  useEffect(() => {
    dispatch(uiActions.setFlashMessage('เริ่มจับเวลาเข้าเรียนแล้ว', 'info'));
  }, [dispatch, contentId]);

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="static"
          {...props}
          value={props.value * (100 / 60)}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textPrimary"
          >{`${Math.round(props.value)} วิ`}</Typography>
        </Box>
      </Box>
    );
  }

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={props.value > 100 || isNaN(props.value) ? 100 : props.value}
            color="primary"
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textPrimary">{`${Math.round(
            isNaN(props.value) || props.value >= 100 ? 100 : props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <CircularProgressWithLabel
          value={timer}
          style={{
            backgroundColor: `${grey[300]}`,
            borderRadius: '50%',
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{ fontSize: '1rem' }}>
          <Hidden only={['xs']}>
            <b>เวลาเรียนสะสม</b>
          </Hidden>{' '}
          {progress}
          {'/'}
          {contentLength ? contentLength : '0'} นาที
        </Typography>
      </Grid>
      <Grid item style={{ width: '100px' }}>
        <LinearProgressWithLabel
          value={(progress / contentLength) * 100}
          color="primary"
        />
      </Grid>
    </Grid>
  );
}
