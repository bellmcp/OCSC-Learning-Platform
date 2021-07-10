//@ts-nocheck
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  Divider,
  Drawer,
  Hidden,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  IconButton,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  PlayArrow as LearnIcon,
  Help as HelpIcon,
  CloseRounded as CloseIcon,
} from '@material-ui/icons';

import * as uiActions from 'modules/ui/actions';

const DRAWER_WIDTH = 200;
const PATH = process.env.REACT_APP_BASE_PATH;

interface NavigationDrawerProps {
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  active: number;
  unreadNotificationCount: number;
  isUserCurrentlyInLearn: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        zIndex: theme.zIndex.drawer + 1,
      },
    },
    listItem: {
      padding: 0,
      paddingLeft: 4,
    },
    listTitle: {
      marginBlockEnd: 0,
      color: theme.palette.grey[500],
      paddingLeft: theme.spacing(3),
    },
    listItemIcon: {
      minWidth: 40,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    closeButton: {
      margin: theme.spacing(1, 1),
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    copyright: {
      fontSize: '12px',
      color: theme.palette.grey[500],
      padding: theme.spacing(2, 3),
    },
    title: {
      fontSize: '24px',
      fontWeight: 600,
      padding: theme.spacing(0, 3),
      marginTop: 0,
    },
  })
);

export default function NavDrawer({
  window,
  handleDrawerToggle,
  mobileOpen,
  active,
  unreadNotificationCount,
  isUserCurrentlyInLearn,
}: NavigationDrawerProps) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const navigationItems = [
    {
      id: 0,
      title: 'หน้าหลัก',
      url: `${PATH}`,
      icon: <HomeIcon />,
      notification: 0,
    },
    {
      id: 1,
      title: 'เข้าเรียน',
      url: `${PATH}/learn`,
      icon: <LearnIcon />,
      notification: 0,
    },
    {
      id: 2,
      title: 'ช่วยเหลือ',
      url: `${PATH}/support`,
      icon: <HelpIcon />,
      notification: unreadNotificationCount,
    },
  ];

  function MobileDrawer() {
    return (
      <div>
        <IconButton
          edge="start"
          className={classes.closeButton}
          aria-label="close drawer"
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
        <p className={classes.title}>Learning Space</p>
        <List>
          {navigationItems.map((navigationItem, index) => (
            <React.Fragment>
              {navigationItem.id === 0 ? <Divider /> : null}
              <MenuItem
                button
                selected={index === active ? true : false}
                onClick={() => {
                  if (!isUserCurrentlyInLearn) {
                    history.push(`${navigationItem.url}`);
                    handleDrawerToggle();
                  } else {
                    dispatch(uiActions.setLearnExitDialog(true));
                    handleDrawerToggle();
                  }
                }}
              >
                <ListItem className={classes.listItem} key={index} dense>
                  <ListItemIcon className={classes.listItemIcon}>
                    {navigationItem.notification !== 0 ? (
                      <Badge variant="dot" color="error">
                        {navigationItem.icon}
                      </Badge>
                    ) : (
                      navigationItem.icon
                    )}
                  </ListItemIcon>
                  <ListItemText primary={navigationItem.title} />
                </ListItem>
              </MenuItem>
              {navigationItem.id === navigationItems.length - 1 ? (
                <Divider />
              ) : null}
            </React.Fragment>
          ))}
        </List>
        <p className={classes.copyright}>
          © {new Date().getFullYear()} สำนักงาน ก.พ.
        </p>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <MobileDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
