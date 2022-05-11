// @ts-nocheck
import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import {
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  MenuItem,
  Badge,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import {
  getContentType,
  getContentTypeText,
  getContentTypeIcon,
  getContentTypeTitle,
} from 'utils/contentType'
import { FormatLineSpacing } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    completed: {
      paddingLeft: 26,
      borderLeft: `6px solid ${green[800]}`,
    },
  })
)

export default function ContentList({ handleMobileDialogClose }: any) {
  const classes = useStyles()

  return (
    <List component='div'>
      <MenuItem
        button
        selected
        className={clsx({
          [classes.nested]: true,
          [classes.completed]: true,
        })}
        component={RouterLink}
        to='#'
        onClick={handleMobileDialogClose && handleMobileDialogClose}
        style={{ whiteSpace: 'normal' }}
      >
        <ListItemIcon>
          <Badge
            badgeContent={
              <CheckCircleIcon
                style={{ color: green[800], fontSize: '16px' }}
              />
            }
          >
            {getContentTypeIcon('x', 'xxxx')}
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant='body1'
              color='textPrimary'
              style={{ lineHeight: '1.4' }}
            >
              ทดสอบเนื้อหา
            </Typography>
          }
          secondary={
            <Typography
              variant='body2'
              color='textSecondary'
              style={{ marginTop: 2 }}
            >
              0 นาที
            </Typography>
          }
        />
      </MenuItem>
    </List>
  )
}
