// @ts-nocheck
import React, { useState } from 'react'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'

import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  useMediaQuery,
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { Delete as DeleteIcon } from '@material-ui/icons'

import * as registrationsActions from '../actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export default function UnEnrollDialog({
  unEnrollDialogVisible,
  setUnEnrollDialogVisible,
  type,
  unEnrollInfo,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [unEnrollConfirm, setUnEnrollConfirm] = useState(false)

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

  const unEnrollCourse = () => {
    const courseRoundId = get(unEnrollInfo, 'courseRoundId', '')
    const registration_action =
      registrationsActions.unEnrollCourse(courseRoundId)
    dispatch(registration_action)
    handleCloseUnEnrollDialog()
  }

  const unEnrollCurriculum = () => {
    const curriculumId = get(unEnrollInfo, 'curriculumId', '')
    const registration_action =
      registrationsActions.unEnrollCurriculum(curriculumId)
    dispatch(registration_action)
    handleCloseUnEnrollDialog()
  }

  return (
    <Dialog open={unEnrollDialogVisible} onClose={handleCloseUnEnrollDialog}>
      <DialogTitle>
        ยกเลิกการลงทะเบียน{type === 'curriculum' ? 'หลักสูตร' : 'รายวิชา'}?
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {type === 'curriculum' ? (
            <>
              <Typography variant='body1'>
                คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการลงทะเบียนหลักสูตร{' '}
                <span style={{ fontWeight: 600 }}>
                  "{get(unEnrollInfo, 'name', '')}"
                </span>
                <br />
                เวลาเรียนสะสม คะแนนสอบ และข้อมูลที่เกี่ยวข้องจะถูกลบ
              </Typography>
              <Box my={2}>
                <Alert severity='error'>
                  หลักสูตร{' '}
                  <span style={{ fontWeight: 600 }}>
                    "{get(unEnrollInfo, 'name', '')}"
                  </span>{' '}
                  และรายวิชาในหลักสูตรทั้งหมด{' '}
                  <span style={{ fontWeight: 600 }}>
                    {get(unEnrollInfo, 'childLength', 0)} รายวิชา
                  </span>{' '}
                  จะถูกลบ
                </Alert>
              </Box>
            </>
          ) : (
            <>
              <Typography variant='body1'>
                คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการลงทะเบียนรายวิชา{' '}
                <span style={{ fontWeight: 600 }}>
                  "{get(unEnrollInfo, 'name', '')}"
                </span>
              </Typography>
              <Box my={2}>
                <Alert severity='error'>
                  เวลาเรียนสะสม คะแนนสอบ และข้อมูลที่เกี่ยวข้องจะถูกลบ
                </Alert>
              </Box>
            </>
          )}
          <Typography variant='body1' style={{ marginBottom: 8 }}>
            โปรดพิมพ์รหัส{type === 'curriculum' ? 'หลักสูตร' : 'รายวิชา'}{' '}
            <span style={{ fontWeight: 600 }}>
              {get(unEnrollInfo, 'id', '')}
            </span>{' '}
            เพื่อยืนยัน
          </Typography>
          <TextField
            autoFocus={matches}
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
          onClick={type === 'curriculum' ? unEnrollCurriculum : unEnrollCourse}
          startIcon={<DeleteIcon />}
          className={classes.unEnrollButton}
        >
          ยกเลิกการลงทะเบียน
        </Button>
      </DialogActions>
    </Dialog>
  )
}
