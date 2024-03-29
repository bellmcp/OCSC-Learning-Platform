// @ts-nocheck
import React from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import { useMediaQuery, Grid, Typography } from '@material-ui/core/'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  ArrowForwardIosRounded as ArrowForward,
  ArrowBackIosRounded as ArrowBack,
} from '@material-ui/icons'
import CourseItem from './CourseItem'
import Loading from 'modules/ui/components/Loading'

import { CategoryProps } from 'modules/categories/types'
import { CourseProps } from '../types'

interface CourseCarouselProps {
  courses: CourseProps
  categories: CategoryProps
  isLoading: boolean
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  carousel: {
    width: '100%',
    maxWidth: '100%',
  },
  slider: {
    position: 'relative',
  },
  slide: {
    padding: theme.spacing(0, 0),
    outline: 'none !important',
  },
  course: {
    width: '100%',
    padding: '4px',
    paddingBottom: 0,
    height: '100%',
  },
  buttonBack: {
    position: 'absolute',
    top: '47%',
    left: '-15px',
    background: 'none',
    border: 'none',
    padding: theme.spacing(0, 0),
    zIndex: 2,
    outline: 'none !important',
    [theme.breakpoints.down('xs')]: {
      left: '-10px',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  buttonNext: {
    position: 'absolute',
    top: '47%',
    right: '-15px',
    background: 'none',
    border: 'none',
    padding: theme.spacing(0, 0),
    zIndex: 2,
    outline: 'none !important',
    [theme.breakpoints.down('xs')]: {
      right: '-10px',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  growButtonBack: {
    position: 'absolute',
    top: '50%',
    left: '-28px',
    height: '100%',
    width: '22px',
    backgroundColor: theme.palette.background.default,
    transform: 'translateY(-50%)',
    zIndex: 1,
    boxShadow: `0 0px 11px 15px ${theme.palette.background.default}`,
  },
  growButtonNext: {
    position: 'absolute',
    top: '50%',
    right: '-28px',
    height: '100%',
    width: '22px',
    backgroundColor: theme.palette.background.default,
    transform: 'translateY(-50%)',
    zIndex: 1,
    boxShadow: `0 0px 11px 15px ${theme.palette.background.default}`,
  },
}))

export default function CourseCarousel({
  courses,
  categories,
  isLoading,
}: CourseCarouselProps) {
  const classes = useStyles()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  function renderFilteredResult() {
    if (isLoading) {
      return <Loading height={410} />
    } else if (courses.length === 0) {
      return (
        <Grid
          container
          justify='center'
          alignItems='center'
          style={{ height: 410 }}
        >
          <Typography component='h2' variant='body1' color='textSecondary'>
            ไม่พบผลลัพธ์การค้นหา
          </Typography>
        </Grid>
      )
    } else {
      return (
        <Grid container direction='row' justify='center' alignItems='center'>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={135}
            isIntrinsicHeight
            totalSlides={courses.length}
            visibleSlides={isMdUp ? 4 : isSmUp ? 3 : 1}
            step={isMdUp ? 4 : isSmUp ? 3 : 1}
            className={classes.carousel}
          >
            <div className={classes.slider}>
              <div className={classes.growButtonBack} />
              <div className={classes.growButtonNext} />
              <Slider className={classes.slide} aria-label='Courses carousel'>
                {courses.map((course: any) => (
                  <Slide key={course.id} index={course.id}>
                    <div className={classes.course}>
                      <CourseItem {...course} categories={categories} />
                    </div>
                  </Slide>
                ))}
              </Slider>
              <ButtonBack className={classes.buttonBack}>
                <ArrowBack fontSize={isSmUp ? 'default' : 'small'} />
              </ButtonBack>
              <ButtonNext className={classes.buttonNext}>
                <ArrowForward fontSize={isSmUp ? 'default' : 'small'} />
              </ButtonNext>
            </div>
          </CarouselProvider>
        </Grid>
      )
    }
  }

  return <>{renderFilteredResult()}</>
}
