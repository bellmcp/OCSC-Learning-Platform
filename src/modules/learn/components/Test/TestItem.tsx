//@ts-nocheck
import React from 'react'
import {
  Avatar,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Box,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    amber: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    options: {
      padding: theme.spacing(1.5),
    },
  })
)

export default function TestItem({
  id,
  no,
  solution,
  question,
  numChoices,
  choice1,
  choice2,
  choice3,
  choice4,
  choice5,
  imgUrl,
  imgUrl1,
  imgUrl2,
  imgUrl3,
  imgUrl4,
  imgUrl5,
  register,
  errors,
}) {
  const classes = useStyles()
  const choices = [
    { id: 1, option: choice1, image: imgUrl1 },
    { id: 2, option: choice2, image: imgUrl2 },
    { id: 3, option: choice3, image: imgUrl3 },
    { id: 4, option: choice4, image: imgUrl4 },
    { id: 5, option: choice5, image: imgUrl5 },
  ]

  return (
    <>
      <Grid
        container
        direction='row'
        alignItems='center'
        spacing={2}
        wrap='nowrap'
      >
        <Grid item>
          <Avatar className={classes.amber}>{no}</Avatar>
        </Grid>
        <Grid item>
          <Typography
            component='h1'
            variant='h6'
            align='left'
            style={{ fontSize: '1rem', fontWeight: 600, lineHeight: '1.3' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: question,
              }}
            ></div>
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      {imgUrl && (
        <Box my={2}>
          <Grid
            container
            spacing={1}
            direction='row'
            justify='center'
            alignItems='center'
            alignContent='center'
            wrap='nowrap'
          >
            <img
              alt='รูปภาพโจทย์'
              src={imgUrl}
              style={{ width: '50%', minWidth: 250, height: 'auto' }}
            />
          </Grid>
        </Box>
      )}
      <form>
        <FormControl component='fieldset'>
          <RadioGroup aria-label={question} name={question}>
            <Grid className={classes.options} container spacing={0}>
              {choices.map((choice) => (
                <Grid item xs={12}>
                  {choice.option || choice.image ? (
                    <Grid
                      container
                      spacing={0}
                      direction='row'
                      justify='flex-start'
                      alignItems='center'
                      alignContent='center'
                      wrap='nowrap'
                    >
                      <FormControlLabel
                        name={`testAnswer${no}`}
                        id={`testAnswer${no}`}
                        value={choice.id.toString()}
                        inputRef={register({ required: true })}
                        control={<Radio />}
                        label={
                          <Typography
                            style={{
                              lineHeight: '1.3',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              {choice.image && (
                                <img
                                  alt={choice.option}
                                  src={choice.image}
                                  style={{
                                    width: '25%',
                                    minWidth: 180,
                                    height: 'auto',
                                    marginRight: 16,
                                  }}
                                />
                              )}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: choice.option,
                                }}
                              ></div>
                            </div>
                          </Typography>
                        }
                      />
                    </Grid>
                  ) : null}
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </form>
    </>
  )
}
