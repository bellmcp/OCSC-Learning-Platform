//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  Avatar,
  Divider,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MoreHoriz as QuestionIcon, Send as SendIcon } from '@material-ui/icons'

import * as learnActions from 'modules/learn/actions'
import EvaluationItem from './EvaluationItem'
import Loading from 'modules/ui/components/Loading'

import HeroImage from 'assets/images/hero-evaluation.svg'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  options: {
    padding: theme.spacing(1.5),
  },
  amber: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function EvaluationList({
  activeContentView,
  currentContentView,
  courseRegistrationDetails,
}: any) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()

  const evaluationId = activeContentView.evaluationId
  const isCompleted = currentContentView?.isCompleted

  const [contentViewId, setContentViewId] = useState(0)
  const [courseRegistrationId, setCourseRegistrationId] = useState(0)
  const {
    isLoading: isEvaluationLoading,
    evaluation,
    evaluationItems,
  } = useSelector((state) => state.learn)

  useEffect(() => {
    setContentViewId(currentContentView?.id)
  }, [currentContentView])

  useEffect(() => {
    setCourseRegistrationId(courseRegistrationDetails[0]?.id)
  }, [courseRegistrationDetails])

  useEffect(() => {
    const load_evaluation_action = learnActions.loadEvaluation(evaluationId)
    dispatch(load_evaluation_action)
  }, [dispatch, evaluationId])

  useEffect(() => {
    const load_evaluation_items_action =
      learnActions.loadEvaluationItems(evaluationId)
    dispatch(load_evaluation_items_action)
  }, [dispatch, evaluationId])

  const onSubmit = (data, event) => {
    event.preventDefault()
    const evaluationOpinion = get(data, 'evaluationOpinion', '')
    const keys = Object.keys(data)
    let evaluationAnswerList = []
    keys.forEach((key) => {
      if (key.includes('evaluationAnswer')) {
        if (!data[key] || data[key] === '') {
          return evaluationAnswerList.push('0')
        } else {
          return evaluationAnswerList.push(data[key])
        }
      }
    })
    const evaluationAnswer = evaluationAnswerList.join('')

    const update_evaluation_action = learnActions.updateEvaluation(
      courseRegistrationId,
      contentViewId,
      evaluationAnswer,
      evaluationOpinion
    )
    dispatch(update_evaluation_action)
  }

  function renderEvaluationList() {
    if (isEvaluationLoading) {
      return <Loading height={380} />
    } else if (isCompleted) {
      return (
        <Box my={10}>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid
              item
              style={{
                width: '50%',
                minWidth: 200,
                maxWidth: 300,
                marginBottom: 24,
              }}
            >
              <img
                src={HeroImage}
                alt='บันทึกข้อมูลแล้ว'
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Typography
              variant='h6'
              color='textPrimary'
              gutterBottom
              style={{ fontWeight: 600 }}
            >
              บันทึกข้อมูลแล้ว
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              ขอบคุณสำหรับความคิดเห็นของคุณ
            </Typography>
          </Grid>
        </Box>
      )
    } else {
      return (
        <>
          <Typography variant='body1' color='textSecondary'>
            <b>คำชี้แจง</b> {evaluation?.instruction}
            <br />
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            {evaluationItems.map((evaluationItem) => (
              <Paper
                key={evaluationItem.id}
                className={classes.paper}
                elevation={1}
              >
                <EvaluationItem
                  {...evaluationItem}
                  register={register}
                  errors={errors}
                />
              </Paper>
            ))}
            <Paper className={classes.paper} elevation={1}>
              <Grid container direction='row' alignItems='center' spacing={2}>
                <Grid item>
                  <Avatar className={classes.amber}>
                    <QuestionIcon />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography
                    component='h1'
                    variant='h6'
                    align='center'
                    style={{ fontSize: '1rem', fontWeight: 600 }}
                  >
                    ข้อคิดเห็น และ ข้อเสนอแนะ (ถ้ามี)
                  </Typography>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              <Box mt={3} mb={2}>
                <TextField
                  inputRef={register}
                  name='evaluationOpinion'
                  id='evaluationOpinion'
                  label='แสดงความคิดเห็น'
                  placeholder={evaluation?.opinion}
                  variant='outlined'
                  color='primary'
                  fullWidth
                  multiline
                  rows={6}
                />
              </Box>
            </Paper>
            <Box my={6}>
              <Button
                type='submit'
                color='secondary'
                variant='contained'
                startIcon={<SendIcon />}
                fullWidth
              >
                ส่งแบบประเมิน
              </Button>
            </Box>
          </form>
        </>
      )
    }
  }

  return (
    <>
      <Typography
        variant='h6'
        color='textPrimary'
        gutterBottom
        style={{ fontWeight: 600, marginBottom: 16, lineHeight: '1.3' }}
      >
        {evaluation?.name}
      </Typography>
      {renderEvaluationList()}
    </>
  )
}
