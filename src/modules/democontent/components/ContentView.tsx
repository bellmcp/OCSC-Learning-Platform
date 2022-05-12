//@ts-nocheck
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  Link,
  ButtonGroup,
  Button,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { getContentType } from 'utils/contentType'
import {
  Hd as HdIcon,
  ArrowDownward as ArrowBottom,
  OndemandVideo as Hero,
} from '@material-ui/icons'

import VideoPlayer from 'modules/learn/components/Content/VideoPlayer'
import PdfViewer from 'modules/learn/components/Content/PdfViewer'
import IframeViewer from 'modules/learn/components/Content/IframeViewer'

export default function ContentView({ activeSource, setUrl }) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  function checkVideoQuality() {
    if (!isMobile) {
      return (
        <HdIcon
          color='disabled'
          style={{ marginLeft: 12, marginBottom: '-4px' }}
        />
      )
    }
  }

  function renderContentView() {
    switch (getContentType(activeSource)) {
      case 'video':
        return <VideoPlayer url={activeSource} />
      case 'pdf':
        return <PdfViewer url={activeSource} />
      case 'iframe':
        return <IframeViewer url={activeSource} />
      default:
        return (
          <Grid container justify='center' alignItems='center'>
            <Box my={4}>
              <Typography variant='body1' color='textSecondary'>
                ไม่สามารถแสดงเนื้อหาประเภทนี้ได้
              </Typography>
            </Box>
          </Grid>
        )
    }
  }

  const truncate = (input) =>
    input.length > 48
      ? `${input.substring(0, 48)}...${input.slice(-10)}`
      : input

  return (
    <>
      {activeSource ? (
        <Container maxWidth='lg'>
          <Box mt={4} mb={3}>
            <Grid
              container
              spacing={1}
              direction={matches ? 'row' : 'column'}
              justify='space-between'
              alignItems='center'
              wrap='nowrap'
            >
              <Grid item>
                <Grid container wrap='nowrap'>
                  <Typography
                    variant='h6'
                    color='initial'
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      lineHeight: '1.2',
                    }}
                    gutterBottom={matches ? false : true}
                    align={matches ? 'left' : 'center'}
                  >
                    ทดสอบเนื้อหา
                    {matches && getContentType(activeSource) === 'video'
                      ? checkVideoQuality()
                      : null}
                  </Typography>
                </Grid>
              </Grid>
              {activeSource && (
                <Grid item>
                  <Typography
                    variant='body2'
                    align={!matches ? 'center' : 'right'}
                    color='textSecondary'
                  >
                    <b>URL ที่กำลังแสดงผล : </b>
                    <Link href={activeSource} target='__blank'>
                      {truncate(activeSource)}
                    </Link>
                  </Typography>
                  <Typography
                    variant='body2'
                    align={!matches ? 'center' : 'right'}
                    color='textSecondary'
                  >
                    <b>ประเภทเนื้อหา : </b>
                    {getContentType(activeSource)}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
          <Box my={4}>{renderContentView()}</Box>
        </Container>
      ) : (
        <Box my={10}>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item>
              <Hero
                style={{
                  fontSize: 86,
                  color: theme.palette.primary.main,
                  marginBottom: 36,
                }}
              />
            </Grid>
            <Typography
              variant='h6'
              color='textPrimary'
              gutterBottom
              style={{ fontSize: '1.7rem', fontWeight: 600 }}
            >
              ทดสอบการติดตั้งเนื้อหา
            </Typography>
            <Typography variant='body1' color='textSecondary' align='center'>
              โปรดกรอก URL ของเนื้อหาที่ต้องการทดสอบในช่องด้านล่าง และกดปุ่ม
              "ทดสอบ"
            </Typography>
            <Typography
              variant='body1'
              color='textSecondary'
              align='center'
              style={{ marginTop: 20, marginBottom: 10 }}
            >
              หรือ ทดสอบโดยใช้ URL ตัวอย่าง
            </Typography>
            <ButtonGroup>
              <Button
                style={{ textTransform: 'none' }}
                onClick={() =>
                  setUrl(
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  )
                }
              >
                MP4
              </Button>
              <Button
                style={{ textTransform: 'none' }}
                onClick={() =>
                  setUrl('https://www.youtube.com/watch?v=jNQXAC9IVRw')
                }
              >
                YouTube
              </Button>
              <Button
                style={{ textTransform: 'none' }}
                onClick={() =>
                  setUrl('http://www.africau.edu/images/default/sample.pdf')
                }
              >
                PDF
              </Button>
              <Button
                style={{ textTransform: 'none' }}
                onClick={() =>
                  setUrl(
                    'https://learningportal.ocsc.go.th/courses/KD00/status.html'
                  )
                }
              >
                HTML
              </Button>
            </ButtonGroup>
            <ArrowBottom
              style={{ marginTop: 48, color: theme.palette.text.secondary }}
            />
          </Grid>
        </Box>
      )}
    </>
  )
}
