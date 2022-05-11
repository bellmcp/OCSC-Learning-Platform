// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getCookie, eraseCookie } from 'utils/cookies'
import parseJwt from 'utils/parseJwt'
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Hidden,
  Button,
  Divider,
  Container,
  Tooltip,
  Dialog,
  Box,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation'
import { useLineNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/line'

import * as uiActions from 'modules/ui/actions'
import * as userActions from 'modules/user/actions'
import * as supportActions from 'modules/support/actions'
import useSearchInputState from '../hooks/useSearchInputState'
import NavDrawer from './NavDrawer'
import NavDropdownMobile from './NavDropdownMobile'
import NavDropdownDesktop from './NavDropdownDesktop'

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: process.env.REACT_APP_PRIMARY_COLOR_HEX,
    },
  },
  typography: {
    fontFamily: ['Prompt', 'sans-serif'].join(','),
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'saturate(180%) blur(20px)',
      boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 10px',
      [theme.breakpoints.up('sm')]: {
        zIndex: theme.zIndex.drawer + 1,
      },
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      display: 'none',
      marginRight: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    logo: {
      display: 'block',
      maxWidth: 110,
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        maxWidth: 100,
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    link: {
      textDecoration: 'none !important',
    },
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 0.9),
      borderRadius: theme.shape.borderRadius,
      width: '100%',
    },
    searchIcon: {
      color: grey[400],
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: theme.palette.text.primary,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      paddingRight: `calc(3em)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey[300]}`,
      '&:hover': {
        border: `1px solid ${theme.palette.grey[400]}`,
      },
      '&:focus': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: grey[700],
    },
    loggedIn: {
      color: theme.palette.common.white,
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: process.env.REACT_APP_TERTIARY_COLOR_HEX,
    },
    noDecorationLink: {
      textDecoration: 'none',
    },
    navMenu: {
      minWidth: '270px',
    },
    navItem: {
      color: theme.palette.text.primary,
    },
    navItemActive: {
      color: theme.palette.primary.main,
    },
    badge: {
      zIndex: 10,
    },
    divider: {
      width: 2,
      height: 32,
      margin: theme.spacing(2),
      backgroundColor: '#A7A8AB',
    },
    bold: {
      fontWeight: 600,
    },
    topScrollPaper: {
      alignItems: 'flex-start',
    },
    topPaperScrollBody: {
      verticalAlign: 'top',
    },
  })
)

interface NavigationBarProps {
  active: number
  setActivePage: (id: number) => void
}

export default function NavBar(props: NavigationBarProps) {
  const classes = useStyles()
  const history = useHistory()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const PATH = process.env.REACT_APP_BASE_PATH
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)

  const LogoImage = require('assets/images/logo.svg')

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearchDialogOpen, setMobileSearchDialogOpen] = useState(false)

  const token = getCookie('token')
  const userId = parseJwt(token).unique_name

  useEffect(() => {
    if (login()) {
      const actionProfile = userActions.loadUser()
      dispatch(actionProfile)
    }
  }, [dispatch, userId])

  const { items: users } = useSelector((state: any) => state.user)
  const login = () => {
    if (token === null) {
      return false
    }
    if (
      (token !== '' || token !== undefined) &&
      parseJwt(token).role === 'user'
    ) {
      return true
    }
    return false
  }

  const { items: supports } = useSelector((state) => state.support)
  const mySupportList = supports.filter((support) => {
    return support.userId === userId
  })

  useEffect(() => {
    const login = () => {
      if (token === null) {
        return false
      }
      if (
        (token !== '' || token !== undefined) &&
        parseJwt(token).role === 'user'
      ) {
        return true
      }
      return false
    }

    if (login()) {
      const action = supportActions.loadSupports()
      dispatch(action)
    }
  }, [dispatch, token, pathname])

  const UNREAD_NOTIFICATION_COUNT = mySupportList.filter((support: any) => {
    return support.replyMessage !== null && support.isAcknowledged === false
  }).length

  const navigationItem = [
    {
      id: 0,
      title: 'หน้าหลัก',
      url: `${PATH}`,
      notification: 0,
    },
    { id: 1, title: 'เข้าเรียน', url: `${PATH}/learn`, notification: 0 },
    {
      id: 2,
      title: 'ช่วยเหลือ',
      url: `${PATH}/support`,
      notification: UNREAD_NOTIFICATION_COUNT,
    },
  ]

  const isUserCurrentlyInLearn = pathname.includes(`${PATH}/learn/courses`)

  const linkToHome = () => {
    handleMenuClose()
    if (!isUserCurrentlyInLearn) {
      history.push(`${PATH}`)
    } else {
      dispatch(uiActions.setLearnExitDialog(true))
    }
  }

  const linkToLogin = () => {
    handleMenuClose()
    if (!isUserCurrentlyInLearn) {
      history.push(`${PATH}/login`)
    } else {
      dispatch(uiActions.setLearnExitDialog(true))
    }
  }

  const linkToProfile = () => {
    handleMenuClose()
    if (!isUserCurrentlyInLearn) {
      history.push(`${PATH}/me`)
    } else {
      dispatch(uiActions.setLearnExitDialog(true))
    }
  }

  const linkToPrintCertificate = () => {
    handleMenuClose()
    if (!isUserCurrentlyInLearn) {
      history.push(`${PATH}/me/certificate`)
    } else {
      dispatch(uiActions.setLearnExitDialog(true))
    }
  }

  const linkToCertificate = () => {
    handleMenuClose()
    window.open(`${process.env.REACT_APP_PORTAL_URL}history`, '_blank')
  }

  const linkToEditProfile = () => {
    handleMenuClose()
    window.open(`${process.env.REACT_APP_PORTAL_URL}edit`, '_blank')
  }

  const linkToChangePassword = () => {
    handleMenuClose()
    window.open(`${process.env.REACT_APP_PORTAL_URL}reset`, '_blank')
  }

  const linkToPortal = () => {
    handleMenuClose()
    window.open(`${process.env.REACT_APP_PORTAL_URL}`, '_blank')
  }

  const toggleSearchBar = () => {
    setMobileSearchDialogOpen(true)
  }

  const toggleSearchBarClose = () => {
    setMobileSearchDialogOpen(false)
  }

  const logout = () => {
    handleMenuClose()
    if (!isUserCurrentlyInLearn) {
      eraseCookie('token')
      dispatch(uiActions.setFlashMessage('ออกจากระบบเรียบร้อยแล้ว', 'success'))
      setTimeout(() => {
        history.push(`${PATH}`)
        window.location.reload()
      }, 1000)
    } else {
      dispatch(uiActions.setLearnExitDialog(true))
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const [searchValue, setSearchValue] = useSearchInputState(() => {
    history.push(`${PATH}/search?query=${searchValue}`)
  })

  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  const isLearnModule =
    pathname.includes(`${PATH}/learn/courses`) ||
    pathname.includes(`${PATH}/democontent`)

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.appBar} elevation={0}>
        <Container maxWidth={!isLearnModule ? 'lg' : false}>
          <Toolbar>
            {/* DRAWER TOGGLE */}
            <Hidden smUp implementation='css'>
              <IconButton
                edge='start'
                color='primary'
                className={classes.menuButton}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            {/* SITE LOGO */}
            <img
              src={LogoImage}
              alt='OCSC Logo'
              className={classes.logo}
              onClick={linkToHome}
            />
            <Hidden mdDown implementation='css'>
              <Typography
                color='textPrimary'
                variant='h6'
                noWrap
                className={classes.title}
                onClick={linkToHome}
              >
                Learning Space
              </Typography>
            </Hidden>
            {/* SEARCH */}
            <div className={classes.sectionDesktop}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='ค้นหา'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => setSearchValue(e?.target?.value ?? null)}
                />
              </div>
            </div>
            <div className={classes.grow} />
            {/* DESKTOP NAVIGATION */}
            <Hidden xsDown implementation='css'>
              <ThemeProvider theme={darkTheme}>
                <NavMenu
                  useStyles={useLineNavigationMenuStyles}
                  color='inherit'
                  className={classes.navMenu}
                >
                  {navigationItem.map((item) => (
                    <NavItem
                      active={props.active === item.id}
                      className={
                        props.active === item.id
                          ? classes.navItemActive
                          : classes.navItem
                      }
                      onClick={() => {
                        if (!isUserCurrentlyInLearn) {
                          history.push(`${item.url}`)
                          props.setActivePage(item.id)
                        } else {
                          dispatch(uiActions.setLearnExitDialog(true))
                        }
                      }}
                    >
                      {login() && item.notification !== 0 ? (
                        <Badge
                          className={classes.badge}
                          variant='dot'
                          color='error'
                        >
                          <Typography noWrap>{item.title}</Typography>
                        </Badge>
                      ) : (
                        <Typography noWrap>{item.title}</Typography>
                      )}
                    </NavItem>
                  ))}
                </NavMenu>
              </ThemeProvider>
            </Hidden>
            {/* DESKTOP DROPDOWN */}
            <div className={classes.sectionDesktop}>
              <Divider orientation='vertical' className={classes.divider} />
              <Tooltip title={login() ? 'ดูโปรไฟล์' : ''}>
                <Button
                  color='primary'
                  onClick={login() ? linkToProfile : linkToLogin}
                  size='small'
                  style={{
                    borderRadius: 50,
                    padding: '10px 10px',
                    margin: '6px 0',
                  }}
                  startIcon={
                    <Avatar
                      className={login() ? classes.loggedIn : classes.small}
                    />
                  }
                >
                  <Typography
                    color='textPrimary'
                    className={classes.bold}
                    noWrap
                  >
                    {login() ? users.firstname : 'เข้าสู่ระบบ'}
                  </Typography>
                </Button>
              </Tooltip>
              <IconButton
                color='primary'
                edge='end'
                aria-label='Toggle user dropdown menu'
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
                style={{
                  margin: '6px 0',
                }}
              >
                <ArrowDownIcon />
              </IconButton>
            </div>
            {/* MOBILE DROPDOWN */}
            <Hidden only={['xs', 'lg', 'md', 'xl']}>
              <div className={classes.grow} />
            </Hidden>
            <div className={classes.sectionMobile}>
              <IconButton onClick={toggleSearchBar} color='primary'>
                <SearchIcon />
              </IconButton>
              <IconButton
                aria-controls={mobileMenuId}
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <Avatar
                  className={login() ? classes.loggedIn : classes.small}
                />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <NavDropdownMobile
        login={login}
        logout={logout}
        users={users}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        linkToLogin={linkToLogin}
        linkToPortal={linkToPortal}
        linkToProfile={linkToProfile}
        linkToPrintCertificate={linkToPrintCertificate}
        linkToCertificate={linkToCertificate}
        linkToEditProfile={linkToEditProfile}
        linkToChangePassword={linkToChangePassword}
      />
      <NavDropdownDesktop
        login={login}
        logout={logout}
        users={users}
        linkToPortal={linkToPortal}
        linkToProfile={linkToProfile}
        linkToPrintCertificate={linkToPrintCertificate}
        linkToCertificate={linkToCertificate}
        linkToEditProfile={linkToEditProfile}
        linkToChangePassword={linkToChangePassword}
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <NavDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        active={props.active}
        unreadNotificationCount={UNREAD_NOTIFICATION_COUNT}
        isUserCurrentlyInLearn={isUserCurrentlyInLearn}
      />
      <Dialog
        open={mobileSearchDialogOpen}
        onClose={toggleSearchBarClose}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <Box m={2}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              autoFocus
              defaultValue={searchValue}
              placeholder='ค้นหา'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchValue(e?.target?.value ?? null)}
            />
          </div>
        </Box>
      </Dialog>
    </div>
  )
}
