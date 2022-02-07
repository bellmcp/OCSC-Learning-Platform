// @ts-nocheck
import React, { useState } from 'react'
import DayJS from 'react-dayjs'
import { useHistory } from 'react-router-dom'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  useMediaQuery,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  MoreVert as MoreIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import { green } from '@material-ui/core/colors'

import isBetween from 'utils/isBetween'

import { MyCourseProps } from '../types'

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
      width: '150px',
      borderRadius: '4 0 0 0',
    },
    noWrapButton: {
      whiteSpace: 'nowrap !important',
    },
    listItemIcon: {
      minWidth: 30,
    },
  })
)

const PATH = process.env.REACT_APP_BASE_PATH

export default function MyCourseItem({
  courseRoundName,
  courseStart,
  courseEnd,
  registrationDate,
  isCompleted,
  completeDate,
  courseId,
  code,
  name,
  thumbnail,
  localDateTime,
  showNumber,
  index,
  isChildCourse,
  handleUnEnrollDialogOpen,
  setUnEnrollInfo,
  courseRoundId,
}: MyCourseProps) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  const history = useHistory()

  const isEligibleForAccess = isBetween(courseStart, courseEnd, localDateTime)

  const linkToLecture = () => {
    history.push(`${PATH}/learn/courses/${courseId}`)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickCourseDetail = () => {
    history.push(`${PATH}/courses/${courseId}`)
    handleClose()
  }
  const handleClickUnEnroll = () => {
    handleUnEnrollDialogOpen('course')
    setUnEnrollInfo({
      name: name,
      id: code,
      childLength: 0,
      courseRoundId,
      curriculumId: 0,
    })
    handleClose()
  }

  return (
    <>
      <Card>
        <div className={classes.details}>
          <CardMedia
            image={thumbnail}
            style={{
              background: `url('${thumbnail}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              borderLeft: isCompleted ? `6px solid ${green[800]}` : '',
            }}
            className={classes.cardImage}
          />
          <div className={classes.controls}>
            <Grid container direction='column' justify='center'>
              <Box
                my={2}
                ml={3}
                mr={!isChildCourse ? 1 : 3}
                flex
                style={{
                  display: 'flex',
                }}
              >
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='center'
                  wrap='nowrap'
                >
                  <Grid item>
                    <Typography
                      variant='h6'
                      component='h2'
                      style={{ lineHeight: '1.1', marginBottom: 4 }}
                    >
                      {showNumber && `${index + 1}. `}
                      {name ? name : 'รายวิชา'}
                    </Typography>
                    <Typography variant='body1' component='p' gutterBottom>
                      {code ? code : 'รหัสรายวิชา'}
                    </Typography>
                    <Typography
                      variant='body2'
                      component='p'
                      color='textSecondary'
                      gutterBottom
                    >
                      {courseRoundName ? courseRoundName : 'ไม่มีข้อมูล'}
                    </Typography>
                    <Typography
                      variant='caption'
                      component='p'
                      color='textSecondary'
                      style={{ lineHeight: '1.2' }}
                      gutterBottom
                    >
                      <b>ลงทะเบียน </b>
                      <DayJS format='D/M/YYYY' add={{ years: 543 }}>
                        {registrationDate ? registrationDate : 'ไม่มีข้อมูล'}
                      </DayJS>
                    </Typography>
                    <Typography
                      variant='caption'
                      component='p'
                      color='textSecondary'
                      style={{ lineHeight: '1.2' }}
                    >
                      <b>เข้าเรียนได้ </b>
                      <DayJS format='D/M/YYYY' add={{ years: 543 }}>
                        {courseStart ? courseStart : 'ไม่มีข้อมูล'}
                      </DayJS>{' '}
                      ถึง{' '}
                      <DayJS format='D/M/YYYY' add={{ years: 543 }}>
                        {courseEnd ? courseEnd : 'ไม่มีข้อมูล'}
                      </DayJS>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    alignItems='center'
                    justify='center'
                    style={{ display: 'flex' }}
                  >
                    {!matches && (
                      <Grid item>
                        <Grid
                          container
                          spacing={1}
                          direction='row'
                          justify='center'
                          alignItems='center'
                          wrap='nowrap'
                        >
                          {isCompleted && (
                            <Grid item>
                              <CheckIcon
                                style={{
                                  color: green[800],
                                  marginTop: 6,
                                  marginRight: 4,
                                }}
                              />
                            </Grid>
                          )}
                          <Grid item>
                            <Button
                              disabled={!isEligibleForAccess}
                              variant='outlined'
                              color='secondary'
                              startIcon={<PlayIcon />}
                              onClick={linkToLecture}
                              fullWidth
                              className={classes.noWrapButton}
                            >
                              เข้าเรียน
                            </Button>
                            <Typography variant='caption' color='error'>
                              {/* <b>FOR DEVELOPMENT</b>
                            <br />
                            courseStart: {courseStart.slice(0, 10)}
                            <br />
                            current: {localDateTime.toString()}
                            <br />
                            courseEnd: {courseEnd.slice(0, 10)}
                            <br />
                            isEligibleForAccess: {isEligibleForAccess.toString()} */}
                            </Typography>
                          </Grid>
                        </Grid>
                        {isCompleted && (
                          <Typography
                            variant='caption'
                            component='p'
                            color='textSecondary'
                            align='center'
                            style={{ lineHeight: '1.2', marginTop: 16 }}
                          >
                            <span style={{ color: green[800] }}>
                              <b>สำเร็จการศึกษา </b>
                              <DayJS format='D/M/YYYY' add={{ years: 543 }}>
                                {completeDate ? completeDate : 'ไม่มีข้อมูล'}
                              </DayJS>
                            </span>
                          </Typography>
                        )}
                      </Grid>
                    )}
                    {!isChildCourse && (
                      <Grid item style={{ marginLeft: 8 }}>
                        <IconButton size='small' onClick={handleClick}>
                          <MoreIcon />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </div>
        </div>
        {matches && (
          <>
            <Divider />
            <Box m={1}>
              <Button
                disabled={!isEligibleForAccess}
                variant='text'
                color='secondary'
                startIcon={<PlayIcon />}
                fullWidth
                onClick={linkToLecture}
              >
                เข้าเรียน
              </Button>
              {isCompleted && (
                <Grid
                  container
                  spacing={1}
                  direction='row'
                  justify='center'
                  alignItems='center'
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
                    variant='caption'
                    component='p'
                    color='textSecondary'
                    align='center'
                    style={{ lineHeight: '1.2' }}
                  >
                    <span style={{ color: green[800] }}>
                      <b>สำเร็จการศึกษา </b>
                      <DayJS format='D/M/YYYY' add={{ years: 543 }}>
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
      <Menu
        dense
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 22,
          horizontal: 'right',
        }}
      >
        <MenuItem dense onClick={handleClickCourseDetail}>
          <ListItemIcon className={classes.listItemIcon}>
            <InfoIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>ข้อมูลรายวิชา</ListItemText>
        </MenuItem>
        <MenuItem dense onClick={handleClickUnEnroll}>
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>ยกเลิกการลงทะเบียนรายวิชา</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
