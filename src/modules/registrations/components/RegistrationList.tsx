// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  PlayArrow as LearnIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'

import * as registrationsActions from '../actions'
import Header from 'modules/ui/components/Header'
import MyCurriculumItem from './MyCurriculumItem'
import MyCourseItem from './MyCourseItem'
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
    unEnrollButton: {
      backgroundColor: '#c62828',
      '&:disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
      },
      '&:hover': {
        backgroundColor: '#b31818',
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
  })
  const [unEnrollConfirm, setUnEnrollConfirm] = useState(false)

  const handleUnEnrollDialogOpen = (type: string) => {
    setType(type)
    setUnEnrollDialogVisible(true)
  }
  const handleChangeUnEnrollConfirmInput = (event) => {
    if (event.target.value === get(unEnrollInfo, 'id', '')) {
      setUnEnrollConfirm(true)
    } else {
      setUnEnrollConfirm(false)
    }
  }
  const handleCloseUnEnrollDialog = () => {
    setUnEnrollDialogVisible(false)
    setUnEnrollConfirm(false)
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
      <Dialog open={unEnrollDialogVisible} onClose={handleCloseUnEnrollDialog}>
        <DialogTitle>
          ยกเลิกการลงทะเบียน{type === 'curriculum' ? 'หลักสูตร' : 'รายวิชา'}?
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {type === 'curriculum' ? (
              <div style={{ marginBottom: 24 }}>
                <Typography variant='body1'>
                  หลักสูตร{' '}
                  <span style={{ fontWeight: 600 }}>
                    "{get(unEnrollInfo, 'name', '')}"
                  </span>{' '}
                  และรายวิชาย่อย{' '}
                  <span style={{ fontWeight: 600 }}>
                    {get(unEnrollInfo, 'childLength', 0)} รายวิชา
                  </span>{' '}
                  จะถูกลบ
                </Typography>
              </div>
            ) : (
              <div style={{ marginBottom: 24 }}>
                <Typography variant='body1'>
                  รายวิชา{' '}
                  <span style={{ fontWeight: 600 }}>
                    "{get(unEnrollInfo, 'name', '')}"
                  </span>{' '}
                  จะถูกลบ
                </Typography>
              </div>
            )}
            <Typography variant='body1' style={{ marginBottom: 8 }}>
              โปรดพิมพ์รหัส{type === 'curriculum' ? 'หลักสูตร' : 'รายวิชา'}{' '}
              <span style={{ fontWeight: 600 }}>
                {get(unEnrollInfo, 'id', '')}
              </span>{' '}
              เพื่อยืนยัน
            </Typography>
            <TextField
              fullWidth
              variant='outlined'
              size='small'
              onChange={handleChangeUnEnrollConfirmInput}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='default' onClick={handleCloseUnEnrollDialog}>
            กลับ
          </Button>
          <Button
            color='secondary'
            variant='contained'
            disabled={!unEnrollConfirm}
            disableElevation
            onClick={handleCloseUnEnrollDialog}
            startIcon={<DeleteIcon />}
            className={classes.unEnrollButton}
          >
            ยกเลิกการลงทะเบียน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
