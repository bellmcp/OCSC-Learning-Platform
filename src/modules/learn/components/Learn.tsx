// @ts-nocheck
import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { Drawer, Toolbar, Box, Fab, Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Bookmarks as ArrowUpIcon, Lock as LockIcon } from '@material-ui/icons'

import * as learnActions from '../actions'
import * as coursesActions from 'modules/courses/actions'
import * as registrationsActions from 'modules/registrations/actions'
import SideBar from './SideBar'
import SideBarMobile from './SideBarMobile'
import ContentView from './ContentView'
import Timer from './Timer'
import TimerCountdown from './TimerCountdown'
import Loading from 'modules/ui/components/Loading'

import isBetween from 'utils/isBetween'

const DRAWER_WIDTH = 300
const FOOTER_HEIGHT = 60

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    drawer: {
      display: 'unset',
      width: DRAWER_WIDTH,
      flexShrink: 0,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      marginTop: 64,
      height: 'calc(100% - 64px) !important',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1),
      position: 'relative',
      marginBottom: FOOTER_HEIGHT,
    },
    bottom: {
      position: 'sticky',
      bottom: 0,
      width: '100%',
    },
    timerWrapper: {
      position: 'fixed',
      height: FOOTER_HEIGHT,
      bottom: 0,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      backgroundColor: theme.palette.background.paper,
      marginLeft: DRAWER_WIDTH,
      zIndex: 1201,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginLeft: '0',
      },
    },
    fab: {
      display: 'none',
      position: 'fixed',
      bottom: FOOTER_HEIGHT + theme.spacing(3),
      zIndex: 1202,
      [theme.breakpoints.down('xs')]: {
        display: 'inherit',
      },
    },
  })
)

export default function Learn() {
  const classes = useStyles()
  const { id: courseId }: any = useParams()
  const { search } = useLocation()
  const { contentId } = queryString.parse(search)
  const dispatch = useDispatch()
  const [accessible, setAccessible] = useState(true)
  const [courseStart, setCourseStart] = useState('')
  const [courseEnd, setCourseEnd] = useState('')

  const [course] = useSelector((state) => state.courses.items)
  var { contents: courseContents } = useSelector((state) => state.courses)
  const { myCourses, localDateTime, isLocalDateTimeLoading } = useSelector(
    (state) => state.registrations
  )
  const { contentViews } = useSelector((state) => state.learn)
  if (courseContents.length === 0) {
    courseContents = []
  }
  const { sessions: currentSession } = useSelector((state) => state.learn)

  const courseRegistrationDetails = myCourses.filter(
    (myCourse) => myCourse.courseId === parseInt(courseId)
  )
  const courseRegistrationId = courseRegistrationDetails[0]?.id

  const activeContentView = courseContents.filter(
    (courseContent) => courseContent.id === parseInt(contentId)
  )
  const currentContentView = contentViews.filter(
    (contentView) => contentView.courseContentId === parseInt(contentId)
  )

  useEffect(() => {
    const load_local_date_time = registrationsActions.loadLocalDateTime()
    dispatch(load_local_date_time)
  }, [dispatch])

  useEffect(() => {
    const courses_action = coursesActions.loadCourse(courseId)
    dispatch(courses_action)
  }, [dispatch, courseId])

  useEffect(() => {
    const course_content_action = coursesActions.loadCourseContents(courseId)
    dispatch(course_content_action)
  }, [dispatch, courseId])

  useEffect(() => {
    const course_registrations_action =
      registrationsActions.loadCourseRegistrations()
    dispatch(course_registrations_action)
  }, [dispatch])

  useEffect(() => {
    const content_view_action =
      learnActions.loadContentViews(courseRegistrationId)
    if (courseRegistrationId !== undefined) {
      dispatch(content_view_action)
    }
  }, [dispatch, courseRegistrationId, contentId])

  useEffect(() => {
    const create_session_action = learnActions.createSession()
    if (contentId !== undefined) {
      dispatch(create_session_action)
    }
    setTestStart(false)
  }, [dispatch, contentId])

  useEffect(() => {
    setCourseStart(courseRegistrationDetails[0]?.courseStart)
    setCourseEnd(courseRegistrationDetails[0]?.courseEnd)
  }, [courseRegistrationDetails])

  useEffect(() => {
    if (courseStart && courseEnd) {
      let check = isBetween(courseStart, courseEnd, localDateTime)
      setAccessible(check)
    }
  }, [courseStart, courseEnd, localDateTime])

  const [mobileDialogOpen, setMobileDialogOpen] = useState(false)
  const handleMobileDialogOpen = () => {
    setMobileDialogOpen(true)
  }
  const handleMobileDialogClose = () => {
    setMobileDialogOpen(false)
  }

  const [testStart, setTestStart] = useState(false)
  const [userTestAnswers, setUserTestAnswers] = useState('0')

  const [contentListProgress, setContentListProgress] = useState([])

  function renderTimer() {
    if (contentId !== undefined) {
      if (activeContentView[0]?.type === 'c') {
        return (
          <Timer
            contentId={contentId}
            activeContentView={activeContentView}
            currentContentView={currentContentView[0]}
            courseRegistrationDetails={courseRegistrationDetails}
            contentListProgress={contentListProgress}
            setContentListProgress={setContentListProgress}
          />
        )
      } else if (activeContentView[0]?.type === 't') {
        if (testStart) {
          return (
            <TimerCountdown
              currentContentView={currentContentView[0]}
              courseRegistrationDetails={courseRegistrationDetails}
              userTestAnswers={userTestAnswers}
            />
          )
        } else {
          return null
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }

  console.log('courseRegistrationDetails', courseRegistrationDetails)
  console.log('contentListProgress', contentListProgress)

  function renderLearnModule() {
    if (isLocalDateTimeLoading || !accessible) {
      return <Loading height={380} />
    } else if (accessible) {
      return (
        <>
          <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor='left'
          >
            <SideBar
              course={course}
              courseContents={courseContents}
              contentViews={contentViews}
              courseRegistrationDetails={courseRegistrationDetails}
              contentListProgress={contentListProgress}
              setContentListProgress={setContentListProgress}
            />
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <ContentView
              contentId={contentId}
              activeContentView={activeContentView[0]}
              currentContentView={currentContentView[0]}
              courseRegistrationDetails={courseRegistrationDetails}
              currentSession={currentSession}
              testStart={testStart}
              setTestStart={setTestStart}
              userTestAnswers={userTestAnswers}
              setUserTestAnswers={setUserTestAnswers}
            />
          </main>
          {/* MOBILE NAVIGATION */}
          <Fab
            color='secondary'
            aria-label='สารบัญ'
            variant={contentId === undefined ? 'extended' : 'round'}
            className={classes.fab}
            style={{
              left: contentId === undefined && 'calc(50% - 55px)',
              right: contentId !== undefined && '24px',
            }}
            onClick={handleMobileDialogOpen}
          >
            <ArrowUpIcon
              style={{ marginRight: contentId === undefined ? 8 : 0 }}
            />
            {contentId === undefined && 'สารบัญ'}
          </Fab>
          <SideBarMobile
            mobileDialogOpen={mobileDialogOpen}
            handleMobileDialogClose={handleMobileDialogClose}
            course={course}
            courseContents={courseContents}
            contentViews={contentViews}
            courseRegistrationDetails={courseRegistrationDetails}
            contentListProgress={contentListProgress}
            setContentListProgress={setContentListProgress}
          />
          {/* TIMER */}
          <div className={classes.timerWrapper}>
            <Box mx={2} mt={1}>
              {renderTimer()}
            </Box>
          </div>
        </>
      )
    } else {
      return (
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          style={{ height: 500 }}
        >
          <LockIcon
            color='disabled'
            style={{ fontSize: 54, marginBottom: 14 }}
          />
          <Typography component='h2' variant='body2' color='textSecondary'>
            ไม่สามารถเข้าสู่บทเรียนได้
          </Typography>
        </Grid>
      )
    }
  }

  return (
    <div className={classes.root}>
      <Toolbar />
      {renderLearnModule()}
    </div>
  )
}
