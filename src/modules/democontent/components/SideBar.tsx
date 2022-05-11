// @ts-nocheck
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  ListSubheader,
  List,
  Typography,
  Divider,
  Box,
  Button,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { ArrowBackIos as ArrowBackIcon } from '@material-ui/icons'

import CourseContentList from './ContentList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
)

export default function SideBar() {
  const classes = useStyles()
  const history = useHistory()

  const goHome = () => {
    history.push('/learningspace')
  }

  return (
    <List
      component='nav'
      subheader={
        <ListSubheader component='div' style={{ zIndex: 2 }}>
          <Divider style={{ visibility: 'hidden' }} />
          <Box mt={1} mb={3}>
            <Button
              variant='text'
              color='default'
              size='small'
              startIcon={<ArrowBackIcon />}
              onClick={goHome}
            >
              กลับสู่หน้าหลัก
            </Button>
            <Box mt={1} mx={2}>
              <Typography
                color='textPrimary'
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
          </Box>
          <Divider />
        </ListSubheader>
      }
      className={classes.root}
      dense
    >
      <CourseContentList />
    </List>
  )
}
