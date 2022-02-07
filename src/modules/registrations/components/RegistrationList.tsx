// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  useMediaQuery,
  Typography,
  Container,
  Grid,
  Box,
  Divider,
  Button,
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import { PlayArrow as LearnIcon } from '@material-ui/icons'

import * as registrationsActions from '../actions'
import Header from 'modules/ui/components/Header'
import MyCurriculumItem from './MyCurriculumItem'
import MyCourseItem from './MyCourseItem'
import UnEnrollDialog from './UnEnrollDialog'
import Loading from 'modules/ui/components/Loading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
    },
    root: {
      display: 'flex',
    },
    details: {
      height: '100px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(0),
    },
    content: {
      width: '100%',
      marginBottom: 50,
    },
    cover: {
      width: '25%',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    cardImage: {
      width: '150px',
      borderRadius: '4 0 0 0',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  })
)

export default function RegistrationList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const PATH = process.env.REACT_APP_BASE_PATH
  var {
    isLoading: isRegistrationsLoading,
    myCourses,
    myCurriculums,
    localDateTime,
  } = useSelector((state) => state.registrations)

  if (myCourses === '') {
    myCourses = []
  }

  if (myCurriculums === '') {
    myCurriculums = []
  }

  useEffect(() => {
    const course_registrations_action =
      registrationsActions.loadCourseRegistrations()
    dispatch(course_registrations_action)
  }, [dispatch])

  useEffect(() => {
    const curriculum_registrations_action =
      registrationsActions.loadCurriculumRegistrations()
    dispatch(curriculum_registrations_action)
  }, [dispatch])

  useEffect(() => {
    const load_local_date_time = registrationsActions.loadLocalDateTime()
    dispatch(load_local_date_time)
  }, [dispatch])

  const linkToCourses = () => {
    history.push(`${PATH}/courses`)
  }

  const linkToCurriculums = () => {
    history.push(`${PATH}/curriculums`)
  }

  const [type, setType] = useState('')
  const [unEnrollDialogVisible, setUnEnrollDialogVisible] = useState(false)
  const [unEnrollInfo, setUnEnrollInfo] = useState({
    name: '',
    id: '',
    childLength: 0,
    courseRoundId: 0,
    curriculumId: 0,
  })

  const handleUnEnrollDialogOpen = (type: string) => {
    setType(type)
    setUnEnrollDialogVisible(true)
  }

  function renderRegisteredCurriculumsList() {
    if (isRegistrationsLoading) {
      return <Loading height={380} />
    } else if (myCurriculums.length !== 0) {
      return (
        <Grid container direction='column' spacing={2}>
          {myCurriculums.map((myCurriculum) => (
            <Grid item key={myCurriculum.id}>
              <MyCurriculumItem
                {...myCurriculum}
                myCourses={myCourses}
                localDateTime={localDateTime}
                handleUnEnrollDialogOpen={handleUnEnrollDialogOpen}
                setUnEnrollInfo={setUnEnrollInfo}
              />
            </Grid>
          ))}
        </Grid>
      )
    } else {
      return (
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          style={{ height: 160 }}
        >
          <Typography component='h2' variant='body1' color='textSecondary'>
            คุณยังไม่ได้ลงทะเบียนหลักสูตร
          </Typography>
          <Box mt={2} mb={4}>
            <Button
              variant='contained'
              color='secondary'
              style={{ width: 200 }}
              onClick={linkToCurriculums}
            >
              ดูหลักสูตรทั้งหมด
            </Button>
          </Box>
        </Grid>
      )
    }
  }

  function renderRegisteredCoursesList() {
    if (isRegistrationsLoading) {
      return <Loading height={380} />
    } else if (
      myCourses.filter((myCourse) => myCourse.curriculumRegistrationId === null)
        .length !== 0
    ) {
      return (
        <Grid container direction='column' spacing={2}>
          {myCourses
            .filter((myCourse) => myCourse.curriculumRegistrationId === null)
            .map((myCourse) => (
              <Grid item key={myCourse.id}>
                <MyCourseItem
                  {...myCourse}
                  localDateTime={localDateTime}
                  handleUnEnrollDialogOpen={handleUnEnrollDialogOpen}
                  setUnEnrollInfo={setUnEnrollInfo}
                />
              </Grid>
            ))}
        </Grid>
      )
    } else {
      return (
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          style={{ height: 160 }}
        >
          <Typography component='h2' variant='body1' color='textSecondary'>
            คุณยังไม่ได้ลงทะเบียนรายวิชา
          </Typography>
          <Box mt={2} mb={4}>
            <Button
              variant='contained'
              color='secondary'
              style={{ width: 200 }}
              onClick={linkToCourses}
            >
              ดูรายวิชาทั้งหมด
            </Button>
          </Box>
        </Grid>
      )
    }
  }

  return (
    <>
      <Header
        title='เข้าเรียน'
        icon={<LearnIcon fontSize='large' style={{ marginRight: '24px' }} />}
      />
      <Container>
        <div className={classes.main}>
          <div className={classes.content}>
            <Box mt={4}>
              <Typography
                gutterBottom
                component='h2'
                variant='h6'
                style={{ fontSize: '1.7rem', fontWeight: 600 }}
                align={matches ? 'left' : 'center'}
              >
                หลักสูตรของฉัน
              </Typography>
            </Box>
            {renderRegisteredCurriculumsList()}
            <Box mt={4} mb={3}>
              <Divider />
            </Box>
            <Box my={3}>
              <Typography
                gutterBottom
                component='h2'
                variant='h6'
                style={{ fontSize: '1.7rem', fontWeight: 600 }}
                align={matches ? 'left' : 'center'}
              >
                รายวิชาของฉัน
              </Typography>
            </Box>
            {renderRegisteredCoursesList()}
          </div>
        </div>
      </Container>
      <UnEnrollDialog
        type={type}
        unEnrollInfo={unEnrollInfo}
        unEnrollDialogVisible={unEnrollDialogVisible}
        setUnEnrollDialogVisible={setUnEnrollDialogVisible}
      />
    </>
  )
}
