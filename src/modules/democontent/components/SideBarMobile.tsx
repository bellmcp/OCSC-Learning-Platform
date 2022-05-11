//@ts-nocheck
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
  List,
  ListSubheader,
  Divider,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import {
  KeyboardArrowDown as CloseIcon,
  ExitToApp as ArrowBackIcon,
} from '@material-ui/icons'

import CourseContentList from './ContentList'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function SideBarMobile({
  mobileDialogOpen,
  handleMobileDialogClose,
}) {
  const classes = useStyles()
  const history = useHistory()

  const backToHome = () => {
    history.push('/learningspace')
  }

  return (
    <Dialog
      fullScreen
      open={mobileDialogOpen}
      onClose={handleMobileDialogClose}
      TransitionComponent={Transition}
    >
      <AppBar
        className={classes.appBar}
        color='secondary'
        style={{ position: 'fixed' }}
      >
        <Toolbar>
          <Button
            autoFocus
            color='inherit'
            variant='outlined'
            startIcon={<ArrowBackIcon />}
            onClick={backToHome}
          >
            กลับสู่หน้าหลัก
          </Button>
          <div className={classes.grow} />
          <IconButton
            size='large'
            edge='end'
            color='inherit'
            onClick={handleMobileDialogClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List
        component='nav'
        subheader={
          <ListSubheader
            component='div'
            style={{
              zIndex: 2,
              backgroundColor: 'white',
              paddingTop: 54,
            }}
          >
            <Box mt={4} mb={3}>
              <Typography
                color='textPrimary'
                align='center'
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  lineHeight: '1.2',
                }}
                gutterBottom
              >
                ทดสอบการติดตั้งเนื้อหา
              </Typography>
            </Box>
            <Divider />
          </ListSubheader>
        }
        dense
      >
        <CourseContentList handleMobileDialogClose={handleMobileDialogClose} />
      </List>
    </Dialog>
  )
}
