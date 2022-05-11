// @ts-nocheck
import React, { useState } from 'react'
import {
  Drawer,
  Toolbar,
  Grid,
  Box,
  TextField,
  Button,
  Fab,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Bookmarks as ArrowUpIcon } from '@material-ui/icons'

import SideBar from './components/SideBar'
import SideBarMobile from './components/SideBarMobile'
import ContentView from './components/ContentView'

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

export default function DemoContent() {
  const classes = useStyles()

  const [mobileDialogOpen, setMobileDialogOpen] = useState(false)
  const handleMobileDialogOpen = () => {
    setMobileDialogOpen(true)
  }
  const handleMobileDialogClose = () => {
    setMobileDialogOpen(false)
  }

  const [activeSource, setActiveSource] = useState('')

  const [url, setUrl] = useState('')

  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleClickPreview = () => {
    setActiveSource(url)
  }

  const handleClickReset = () => {
    setUrl('')
    setActiveSource('')
  }

  return (
    <div className={classes.root}>
      <Toolbar />
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <SideBar />
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <ContentView activeSource={activeSource} setUrl={setUrl} />
      </main>
      {/* MOBILE NAVIGATION */}
      <Fab
        color='secondary'
        aria-label='สารบัญ'
        variant={!activeSource ? 'extended' : 'round'}
        className={classes.fab}
        style={{
          left: !activeSource && 'calc(50% - 55px)',
          right: activeSource && '24px',
        }}
        onClick={handleMobileDialogOpen}
      >
        <ArrowUpIcon style={{ marginRight: !activeSource ? 8 : 0 }} />
        {!activeSource && 'สารบัญ'}
      </Fab>
      <SideBarMobile
        mobileDialogOpen={mobileDialogOpen}
        handleMobileDialogClose={handleMobileDialogClose}
      />
      {/* TIMER */}
      <div className={classes.timerWrapper}>
        <Box mx={2} mt={1}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            style={{ display: 'flex' }}
          >
            <div style={{ flexGrow: 1, paddingRight: 10 }}>
              <TextField
                variant='outlined'
                size='small'
                placeholder='URL ของเนื้อหา (MP4, YouTube, PDF, HTML)'
                fullWidth
                value={url}
                onChange={handleChangeUrl}
              />
            </div>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClickPreview}
            >
              ทดสอบ
            </Button>
            <Button
              color='secondary'
              onClick={handleClickReset}
              style={{ marginLeft: 5 }}
            >
              ล้าง
            </Button>
          </Grid>
        </Box>
      </div>
    </div>
  )
}
