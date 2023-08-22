// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import useKonami from 'use-konami'
import {
  CssBaseline,
  Snackbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Divider,
  Link,
  CircularProgress,
  Container,
  Grid,
  Slide,
} from '@material-ui/core'
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'
import { Close as CloseIcon } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

import * as actions from '../actions'
import NavBar from './NavBar'
import Routes from './Routes'
import Footer from './Footer'

import { isLogin } from 'utils/isLogin'
import * as pressesActions from 'modules/press/actions'
import { setCookieSubDomain, getCookie } from 'utils/cookies'

const useStyles = makeStyles((theme: Theme) => ({
  backDrop: {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0,0,30,0.4)',
  },
}))

export default function Layout() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const history = useHistory()
  const PATH = process.env.REACT_APP_BASE_PATH
  const dispatch = useDispatch()
  const {
    isSnackbarOpen,
    isDialogOpen,
    flashMessage,
    alertType,
    isGlobalModalOpen,
    globalModalTitle,
    globalModalMessage,
    globalModalCTAAction,
  } = useSelector((state) => state.ui)
  const closeFlashMessage = () => dispatch(actions.clearFlashMessage())
  const closeGlobalModal = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      return
    }
    globalModalCTAAction && globalModalCTAAction()
    dispatch(actions.clearGlobalModal())
  }

  const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false)

  const { isAnnoucementLoading, announcement } = useSelector(
    (state) => state.press
  )

  const handleAnnouncementDialogClose = () => {
    setAnnouncementDialogOpen(false)
  }

  useEffect(() => {
    const presses_action = pressesActions.loadAnnouncement()
    dispatch(presses_action)
  }, [dispatch])

  useEffect(() => {
    if (!isLogin()) {
      if (isAnnoucementLoading) {
        setAnnouncementDialogOpen(false)
      } else {
        if (get(announcement, 'mesg') !== '') {
          setAnnouncementDialogOpen(true)
        } else {
          setAnnouncementDialogOpen(false)
        }
      }
    } else {
      setAnnouncementDialogOpen(false)
    }
  }, [announcement, isAnnoucementLoading])

  const isLearnModule =
    pathname.includes(`${PATH}/learn/courses`) ||
    pathname.includes(`${PATH}/democontent`)

  // //GET STATE FOR DEBUG
  // const loginState = useSelector((state) => state.login);
  // const userState = useSelector((state) => state.user);
  // const categoriesState = useSelector((state) => state.categories);
  // const coursesState = useSelector((state) => state.courses);
  // const curriculumsState = useSelector((state) => state.curriculums);
  // const registrationsState = useSelector((state) => state.registrations);
  // const learnState = useSelector((state) => state.learn);
  // const pressState = useSelector((state) => state.press);
  // const supportState = useSelector((state) => state.support);
  // const meState = useSelector((state) => state.me);
  // const uiState = useSelector((state) => state.ui);

  useEffect(() => {
    const setInitialActivePage = () => {
      switch (pathname) {
        case `${PATH}`:
          setActivePage(0)
          break
        case `${PATH}/learn`:
          setActivePage(1)
          break
        case `${PATH}/support`:
          setActivePage(2)
          break
        default:
          setActivePage(99)
          break
      }
      if (isLearnModule) {
        setActivePage(1)
      }
    }
    setInitialActivePage()
  }, [pathname]) //eslint-disable-line

  const [activePage, setActivePage] = useState(0)
  const [isCookieBannerOpen, setIsCookieBannerOpen] = useState(true)

  const defaultTheme = createMuiTheme()

  const theme = createMuiTheme({
    typography: {
      fontFamily: ['Prompt', 'sans-serif'].join(','),
    },
    overrides: {
      MuiToolbar: {
        gutters: {
          [defaultTheme.breakpoints.up('xs')]: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
      MuiCardContent: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
    breakpoints: {
      values: {
        sm: 670,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        main: process.env.REACT_APP_PRIMARY_COLOR_HEX,
      },
      secondary: {
        main: process.env.REACT_APP_SECONDARY_COLOR_HEX,
      },
    },
  })

  // DEBUG DIALOG
  useKonami({
    onUnlock: () => setDebugDialogOpen(true),
  })
  const [debugDialogOpen, setDebugDialogOpen] = useState(false)
  const handleDebugDialogClose = () => {
    setDebugDialogOpen(false)
  }

  const handleDialogClose = () => {
    dispatch(actions.setLearnExitDialog(false))
  }
  const linkToLearn = () => {
    handleDialogClose()
    history.push(`${PATH}/learn`)
    dispatch(
      actions.setFlashMessage('บันทึกเวลาเรียนสะสมเรียบร้อยแล้ว', 'success')
    )
  }

  const handleClickAcceptCookie = () => {
    setCookieSubDomain('AcceptCookie', 'true', 9999)
    setIsCookieBannerOpen(false)
  }

  useEffect(() => {
    const isCookieAccecpted = getCookie('AcceptCookie')
    setIsCookieBannerOpen(!isCookieAccecpted)
  }, [])

  const parseLinkToDefaultColor = (text: string) => {
    return text.replaceAll(/<a/g, '<a class="footer_link"')
  }

  const parseLinkToSnackBarColor = (text: string) => {
    return text ? text.replaceAll(/<a/g, '<a class="snackbar_link"') : text
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingBar
        maxProgress={100}
        updateTime={100}
        style={{
          zIndex: 9999999999,
          height: 2,
          position: 'fixed',
          backgroundColor: theme.palette.primary.main,
          transition: 'all 5s ease 3s',
        }}
      />
      <NavBar active={activePage} setActivePage={setActivePage} />
      <Routes />
      {/* ANNOUNCEMENT DIALOG */}
      <Dialog
        open={announcementDialogOpen}
        onClose={handleAnnouncementDialogClose}
      >
        {isAnnoucementLoading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <>
            <DialogTitle style={{ margin: '16px 0' }}>
              <Typography
                variant='h5'
                color='secondary'
                align='center'
                style={{ fontWeight: 600 }}
              >
                ประกาศ
              </Typography>
            </DialogTitle>
            <DialogContent style={{ padding: '0 32px' }}>
              <Typography variant='body1' align='center' color='textPrimary'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseLinkToDefaultColor(
                      get(announcement, 'mesg', 'ไม่มีข้อความ')
                    ),
                  }}
                ></div>
              </Typography>
            </DialogContent>
            <DialogActions style={{ margin: '16px 0', marginTop: 24 }}>
              <div style={{ flex: '1 0 0' }} />
              <Button
                variant='contained'
                color='secondary'
                onClick={handleAnnouncementDialogClose}
                style={{ width: 100 }}
              >
                รับทราบ
              </Button>
              <div style={{ flex: '1 0 0' }} />
            </DialogActions>
          </>
        )}
      </Dialog>
      {/* REGISTRATION CONDITION DIALOG */}
      <Dialog
        open={isGlobalModalOpen}
        onClose={closeGlobalModal}
        fullWidth
        maxWidth='sm'
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle style={{ margin: '16px 0' }}>
          <Typography
            variant='h5'
            color='secondary'
            align='center'
            style={{ fontWeight: 600 }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: parseLinkToDefaultColor(globalModalTitle),
              }}
            ></div>
          </Typography>
        </DialogTitle>
        <DialogContent style={{ padding: '0 32px' }}>
          <Typography variant='body1' align='center' color='textPrimary'>
            <div
              dangerouslySetInnerHTML={{
                __html: parseLinkToDefaultColor(globalModalMessage),
              }}
            ></div>
          </Typography>
        </DialogContent>
        <DialogActions style={{ margin: '16px 0', marginTop: 24 }}>
          <div style={{ flex: '1 0 0' }} />
          <Button
            variant='contained'
            color='secondary'
            onClick={closeGlobalModal}
            style={{ width: 100 }}
          >
            รับทราบ
          </Button>
          <div style={{ flex: '1 0 0' }} />
        </DialogActions>
      </Dialog>
      {/* DEBUG DIALOG */}
      <Dialog open={debugDialogOpen} onClose={handleDebugDialogClose}>
        <DialogTitle onClose={handleDebugDialogClose}>เกี่ยวกับ</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{ fontWeight: 600 }} variant='body1'>
            OCSC Learning Space
            <br />
            Version 2.2.1
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography gutterBottom style={{ fontWeight: 600 }}>
            Developer
          </Typography>
          <Typography gutterBottom variant='body2'>
            WUTIPAT KHAMNUANSIN
            <br />
            ANUNYA PRASONGKIAT
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography gutterBottom style={{ fontWeight: 600 }}>
            Advisor
          </Typography>
          <Typography gutterBottom variant='body2'>
            ASSOC. PROF. CHATCHAWIT APORNTEWAN, Ph.D.
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography gutterBottom variant='caption' color='textSecondary'>
            Licensed under{' '}
            <Link
              href='https://github.com/bellmcp/OCSC-Learning-Platform/blob/master/LICENSE'
              target='_blank'
              rel='noopener noreferrer'
            >
              The GNU General Public License v3.0 License
            </Link>
            .
            <br />
            Copyright © {new Date().getFullYear()}{' '}
            <Link
              href='https://www.ocsc.go.th/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Office of the Civil Service Commission (OCSC)
            </Link>
            , All rights reserved.
          </Typography>
        </DialogContent>
        {/* <DialogActions>
          <Button
            color="secondary"
            onClick={() => console.log(JSON.stringify(loginState, null, "\t"))}
          >
            Log Login State
          </Button>
        </DialogActions> */}
      </Dialog>
      {/* LEARN EXIT DIALOG */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'ออกจากห้องเรียน?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            เซสชันปัจจุบันจะจบลง และเวลาเรียนสะสมของคุณจะถูกบันทึก
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='secondary'>
            ยกเลิก
          </Button>
          <Button
            color='secondary'
            autoFocus
            variant='contained'
            disableElevation
            onClick={linkToLearn}
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        onClose={closeFlashMessage}
        message={flashMessage}
        autoHideDuration={6000}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={closeFlashMessage}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
        style={{
          marginBottom: isLearnModule ? 60 : 'unset',
        }}
      >
        <Alert
          onClose={closeFlashMessage}
          severity={alertType ? alertType : 'info'}
          elevation={6}
          variant='filled'
        >
          <div
            dangerouslySetInnerHTML={{
              __html: parseLinkToSnackBarColor(flashMessage),
            }}
          ></div>
        </Alert>
      </Snackbar>
      {!isLearnModule && <Footer />}
      {!isLearnModule && (
        <Slide
          direction='up'
          in={isCookieBannerOpen}
          timeout={{ enter: 2000, exit: 1000 }}
        >
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100vw',
              zIndex: 1199,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              // backdropFilter: 'saturate(180%) blur(20px)',
              boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Container maxWidth='lg'>
              <Grid
                container
                spacing={2}
                justify='space-between'
                alignItems='center'
                style={{ padding: '18px 12px' }}
              >
                <Grid item>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 500 }}
                  >
                    เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ
                    และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    คุณสามารถศึกษารายละเอียดได้ที่{' '}
                    <Link
                      href='https://www.ocsc.go.th/cookies-policy'
                      target='_blank'
                    >
                      นโยบายคุกกี้
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    style={{ borderRadius: 24 }}
                    onClick={handleClickAcceptCookie}
                  >
                    ยอมรับ
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Slide>
      )}
    </ThemeProvider>
  )
}
