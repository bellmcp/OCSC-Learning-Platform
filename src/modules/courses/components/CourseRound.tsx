// @ts-nocheck
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Moment from 'react-moment'
import moment from 'moment'
import {
  Typography,
  Box,
  Grid,
  LinearProgress,
  Button,
} from '@material-ui/core'
import { ArrowForwardIos as ArrowForwardIcon } from '@material-ui/icons'
import { isLogin } from 'utils/isLogin'
import isBetween from 'utils/isBetween'

import * as registrationsActions from 'modules/registrations/actions'

import { CourseProps } from '../types'

interface CourseRoundProps {
  id: number
  name: string
  registrationStart: string
  registrationEnd: string
  registrationCondition: string
  courseStart: string
  courseEnd: string
  maxStudents: number
  numStudents: number
  myCourses: CourseProps[]
  courseId: number
  localDateTime: string[]
}

export default function CourseRound({
  id,
  name,
  registrationStart,
  registrationEnd,
  registrationCondition,
  courseStart,
  courseEnd,
  maxStudents,
  numStudents,
  myCourses,
  courseId,
  localDateTime,
}: CourseRoundProps) {
  const dispatch = useDispatch()
  const history = useHistory()
  const PATH = process.env.REACT_APP_BASE_PATH
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(false)
  const [registerButtonLabel, setRegisterButtonLabel] =
    useState('ลงทะเบียนเรียน')

  const isEligibleForAccess = isBetween(
    registrationStart,
    registrationEnd,
    localDateTime
  )

  if (myCourses === '') {
    myCourses = []
  }

  const linkToLogin = () => {
    history.push(`${PATH}/login`)
  }

  const linkToLearn = () => {
    history.push(`${PATH}/learn`)
  }

  const registerCourse = () => {
    const registration_action = registrationsActions.registerCourse(
      id,
      courseId
    )
    dispatch(registration_action)
    setIsRegisterButtonDisabled(true)
    setRegisterButtonLabel('กำลังลงทะเบียน...')
    //PREVENT MULTIPLE REQUEST
    setTimeout(() => {
      setIsRegisterButtonDisabled(false)
      setRegisterButtonLabel('ลงทะเบียนเรียน')
    }, 5000)
  }

  function renderRegisterButton() {
    if (!isLogin()) {
      return (
        <Grid item>
          <Typography variant='body2' color='textSecondary'>
            โปรดเข้าสู่ระบบเพื่อลงทะเบียนรายวิชา
          </Typography>
          <Box my={1}>
            <Button color='secondary' variant='contained' onClick={linkToLogin}>
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Grid>
      )
    } else if (
      isLogin() &&
      myCourses.filter(
        (myCourse) =>
          myCourse.courseId === parseInt(courseId) &&
          myCourse.courseRoundId === parseInt(id)
      ).length !== 0
    ) {
      return (
        <Grid item>
          <Typography variant='body2' color='textSecondary'>
            คุณลงทะเบียนรอบนี้แล้ว เข้าเรียนได้เลย
          </Typography>
          <Box my={2}>
            <Button
              color='secondary'
              variant='contained'
              endIcon={<ArrowForwardIcon />}
              onClick={linkToLearn}
            >
              เข้าเรียน
            </Button>
          </Box>
        </Grid>
      )
    } else if (numStudents >= maxStudents) {
      return (
        <Grid item>
          <Typography variant='body2' color='textSecondary'>
            จำนวนผู้เรียนเต็มแล้ว
          </Typography>
        </Grid>
      )
    } else if (!isEligibleForAccess) {
      return (
        <Grid item>
          <Typography variant='body2' color='textSecondary'>
            ไม่เปิดให้ลงทะเบียน
          </Typography>
        </Grid>
      )
    } else {
      return (
        <Button
          variant='contained'
          color='primary'
          endIcon={<ArrowForwardIcon />}
          onClick={registerCourse}
          disabled={isRegisterButtonDisabled}
        >
          {registerButtonLabel}
        </Button>
      )
    }
  }

  const isInfiniteCourse = moment(courseEnd).isSameOrAfter(moment('3000-01-01'))

  if (isInfiniteCourse) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <Typography
            style={{
              fontSize: '1.7rem',
              lineHeight: '1.2',
              fontWeight: 600,
            }}
            gutterBottom
          >
            {name}
          </Typography>
          <Box mb={3}>
            <Box display='flex' alignItems='center'>
              <Box width='100%'>
                <Typography variant='body1' color='primary'>
                  <span style={{ fontWeight: 600 }}>
                    {numStudents.toLocaleString()} คน
                  </span>{' '}
                  ลงทะเบียนเรียนรอบนี้แล้ว
                </Typography>
              </Box>
              <Box></Box>
            </Box>
          </Box>
          <Box my={3}>{renderRegisterButton()}</Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Grid
            container
            spacing={3}
            alignItems='baseline'
            style={{ marginBottom: 4 }}
          >
            <Grid item xs={6}>
              <Typography
                variant='h6'
                style={{ lineHeight: '1.2' }}
                gutterBottom
              >
                เปิดให้ลงทะเบียน
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='textSecondary'>
                <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                  {registrationStart}
                </Moment>{' '}
                ถึง{' '}
                <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                  {registrationEnd}
                </Moment>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            alignItems='baseline'
            style={{ marginBottom: 4 }}
          >
            <Grid item xs={6}>
              <Typography
                variant='h6'
                style={{ lineHeight: '1.2' }}
                gutterBottom
              >
                เงื่อนไขการลงทะเบียน
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='textSecondary'>
                {registrationCondition ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: registrationCondition,
                    }}
                  ></div>
                ) : (
                  'ไม่มีเงื่อนไข'
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            alignItems='baseline'
            style={{ marginBottom: 4 }}
          >
            <Grid item xs={6}>
              <Typography
                variant='h6'
                style={{ lineHeight: '1.2' }}
                gutterBottom
              >
                เข้าเรียนได้
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='textSecondary'>
                <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                  {courseStart ? courseStart : 'ไม่มีข้อมูล'}
                </Moment>{' '}
                ถึง{' '}
                {isInfiniteCourse ? (
                  <>ไม่มีกำหนด</>
                ) : (
                  <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                    {courseEnd ? courseEnd : 'ไม่มีข้อมูล'}
                  </Moment>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={7}>
        <Typography
          style={{
            fontSize: '1.7rem',
            lineHeight: '1.2',
            fontWeight: 600,
          }}
          gutterBottom
        >
          {name}
        </Typography>
        <Box mb={3}>
          <Box display='flex' alignItems='center'>
            <Box width='100%'>
              <Typography variant='body2' color='textSecondary' align='right'>
                {numStudents.toLocaleString()} / {maxStudents.toLocaleString()}{' '}
                คน
              </Typography>
              <LinearProgress
                variant='determinate'
                value={(numStudents / maxStudents) * 100}
                color='primary'
              />
            </Box>
            <Box></Box>
          </Box>
        </Box>
        <Box my={3}>{renderRegisterButton()}</Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Grid container spacing={3} alignItems='baseline'>
          <Grid item xs={6}>
            <Typography variant='h6' style={{ lineHeight: '1.2' }} gutterBottom>
              เปิดให้ลงทะเบียน
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='textSecondary'>
              <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                {registrationStart}
              </Moment>{' '}
              ถึง{' '}
              <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                {registrationEnd}
              </Moment>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems='baseline'>
          <Grid item xs={6}>
            <Typography variant='h6' style={{ lineHeight: '1.2' }} gutterBottom>
              เงื่อนไขการลงทะเบียน
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='textSecondary'>
              {registrationCondition ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: registrationCondition,
                  }}
                ></div>
              ) : (
                'ไม่มีเงื่อนไข'
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems='baseline'>
          <Grid item xs={6}>
            <Typography variant='h6' style={{ lineHeight: '1.2' }} gutterBottom>
              เข้าเรียนได้
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='textSecondary'>
              <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                {courseStart}
              </Moment>{' '}
              ถึง{' '}
              <Moment add={{ years: 543 }} locale='th' format='D MMM YYYY'>
                {courseEnd}
              </Moment>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems='baseline'>
          <Grid item xs={6}>
            <Typography variant='h6' style={{ lineHeight: '1.2' }} gutterBottom>
              จำนวนผู้เรียนสูงสุด
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' color='textSecondary'>
              {maxStudents.toLocaleString()} คน
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
