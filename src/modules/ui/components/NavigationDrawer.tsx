import React from "react";
import { Link as RouterLink } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
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
} from "@material-ui/core";
import {
  Home as HomeIcon,
  PlayArrow as LearnIcon,
  Help as HelpIcon,
  CloseRounded as CloseIcon,
} from "@material-ui/icons";

import { NavigationDrawerProps } from "./types";

const DRAWER_WIDTH = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
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
      [theme.breakpoints.up("sm")]: {
        display: "none",
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
      fontSize: "12px",
      color: theme.palette.grey[500],
      padding: theme.spacing(2, 3),
    },
    title: {
      fontSize: "24px",
      fontWeight: 600,
      padding: theme.spacing(0, 3),
      marginTop: 0,
    },
  })
);

const navigationItem = [
  {
    id: 0,
    title: "หน้าหลัก",
    url: "/",
    icon: <HomeIcon />,
    notification: 0,
  },
  {
    id: 1,
    title: "เข้าเรียน",
    url: "/learn",
    icon: <LearnIcon />,
    notification: 0,
  },
  {
    id: 2,
    title: "ช่วยเหลือ",
    url: "/help",
    icon: <HelpIcon />,
    notification: 1,
  },
];

export default function NavigationDrawer({
  window,
  handleDrawerToggle,
  mobileOpen,
  active,
}: NavigationDrawerProps) {
  const classes = useStyles();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

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
        <p className={classes.title}>Learning Platform</p>
        <List>
          {navigationItem.map((item, index) => (
            <React.Fragment>
              {item.id === 0 ? <Divider /> : null}
              <MenuItem
                button
                selected={index === active ? true : false}
                component={RouterLink}
                to={item.url}
                onClick={handleDrawerToggle}
              >
                <ListItem className={classes.listItem} key={index} dense>
                  <ListItemIcon className={classes.listItemIcon}>
                    {item.notification !== 0 ? (
                      <Badge variant="dot" color="error">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </MenuItem>
              {item.id === navigationItem.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </List>
        <p className={classes.copyright}>© 2020 สำนักงาน ก.พ.</p>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <MobileDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
