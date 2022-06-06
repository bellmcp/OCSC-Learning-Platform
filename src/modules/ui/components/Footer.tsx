// @ts-nocheck
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  useMediaQuery,
  Typography,
  Container,
  Link,
  Grid,
  Box,
} from '@material-ui/core'

import * as uiActions from '../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    color: theme.palette.common.white,
    padding: theme.spacing(6, 2),
    marginTop: 'auto',
    backgroundColor: process.env.REACT_APP_SECONDARY_COLOR_HEX,
  },
  link: {
    color: process.env.REACT_APP_TERTIARY_COLOR_HEX,
  },
}))

const OCSC_NAME_TH = 'สำนักงานคณะกรรมการข้าราชการพลเรือน (สำนักงาน ก.พ.)'
const OCSC_NAME_EN = 'Office of the Civil Service Commission (OCSC)'
const OCSC_URL = 'https://www.ocsc.go.th/'
const OCSC_ADDRESS =
  '47/111 หมู่ 4 ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000'
const OCSC_EMAIL = 'learningspace@ocsc.go.th'
const OCSC_PHONE =
  'โทรศัพท์ 02 547 1000 ต่อ 1795, 1807 และ 6942 (ภายในเวลาราชการ)'

export default function Footer() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isFhdUp = useMediaQuery('(min-width:1080px)')

  const { footerInfo } = useSelector((state) => state.ui)
  const { value1, value2 } = footerInfo

  useEffect(() => {
    if (isEmpty(footerInfo)) {
      const footer_info_action = uiActions.loadFooterInfo()
      dispatch(footer_info_action)
    }
  }, [dispatch])

  const parseLinkToDefaultColor = (text: string) => {
    return text.replace(
      '<a',
      '<a style="color:#00A69C; text-decoration: none;"'
    )
  }

  function DesktopFooter() {
    return (
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        wrap='no-wrap'
      >
        <Box>
          <Typography variant='h6' color='inherit' align='left'>
            {OCSC_NAME_TH}
          </Typography>
          <Typography variant='body2' color='inherit' align='left'>
            {'Copyright © '} {new Date().getFullYear()}{' '}
            <Link className={classes.link} href={OCSC_URL} underline='none'>
              {OCSC_NAME_EN}
            </Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant='body2' color='inherit' align='right'>
            {OCSC_ADDRESS}
          </Typography>
          <Typography
            variant='body2'
            color='inherit'
            align='right'
            style={{ marginBottom: 8 }}
          >
            อีเมล{' '}
            <Link
              href={`mailto:${OCSC_EMAIL}`}
              className={classes.link}
              underline='none'
            >
              {OCSC_EMAIL}
            </Link>
          </Typography>
          {value1 && (
            <Typography
              component='div'
              variant='caption'
              color='inherit'
              align='right'
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: parseLinkToDefaultColor(value1),
                }}
              ></div>
            </Typography>
          )}
          {value2 && (
            <Typography
              component='div'
              variant='caption'
              color='inherit'
              align='right'
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: parseLinkToDefaultColor(value2),
                }}
              ></div>
            </Typography>
          )}
        </Box>
      </Grid>
    )
  }

  function MobileFooter() {
    return (
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item>
          <Box
            lineHeight={1.2}
            fontSize='h6.fontSize'
            fontWeight='fontWeightMedium'
            textAlign='center'
            mb={6}
          >
            {OCSC_NAME_TH}
          </Box>
        </Grid>
        <Grid item>
          <Box lineHeight={1.2} fontSize={12} textAlign='center' mb={1}>
            {OCSC_ADDRESS}
          </Box>
          <Box lineHeight={1.2} fontSize={12} textAlign='center' mb={2}>
            อีเมล{' '}
            <Link
              href={`mailto:${OCSC_EMAIL}`}
              className={classes.link}
              underline='none'
            >
              {OCSC_EMAIL}
            </Link>
          </Box>
          {value1 && (
            <Box lineHeight={1.2} fontSize={12} textAlign='center' mb={1}>
              <div
                dangerouslySetInnerHTML={{
                  __html: parseLinkToDefaultColor(value1),
                }}
              ></div>
            </Box>
          )}
          {value2 && (
            <Box lineHeight={1.2} fontSize={12} textAlign='center' mb={1}>
              <div
                dangerouslySetInnerHTML={{
                  __html: parseLinkToDefaultColor(value2),
                }}
              ></div>
            </Box>
          )}
        </Grid>
        <Grid item>
          <Box mt={6} lineHeight={1.2} fontSize={9} textAlign='center'>
            {'Copyright © '} {new Date().getFullYear()} {OCSC_NAME_EN}
          </Box>
        </Grid>
      </Grid>
    )
  }

  return (
    <footer className={classes.footer}>
      <Container maxWidth='lg'>
        {isFhdUp ? <DesktopFooter /> : <MobileFooter />}
      </Container>
    </footer>
  )
}
