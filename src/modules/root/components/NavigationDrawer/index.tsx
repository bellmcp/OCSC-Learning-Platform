import React from "react";
import { Link as RouterLink } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import CourseIcon from "@material-ui/icons/CollectionsBookmark";
import SubjectIcon from "@material-ui/icons/MenuBook";
import HelpIcon from "@material-ui/icons/Help";
import CloseIcon from "@material-ui/icons/CloseRounded";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        // width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        zIndex: theme.zIndex.drawer + 1,
      },
    },
    listItem: {
      paddingLeft: theme.spacing(1),
    },
    listTitle: {
      marginBlockEnd: 0,
      color: theme.palette.grey[500],
      paddingLeft: theme.spacing(3),
    },
    listItemIcon: {
      minWidth: 20,
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
    // // necessary for content to be below app bar
    // toolbar: {
    //   ...theme.mixins.toolbar,
    // },
    drawerPaper: {
      width: drawerWidth,
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
    title: "คอร์สเรียน",
    url: "/courses",
    icon: <SubjectIcon />,
    notification: 0,
  },
  {
    id: 2,
    title: "หลักสูตร",
    url: "/curriculum",
    icon: <CourseIcon />,
    notification: 0,
  },
  {
    id: 3,
    title: "ช่วยเหลือ",
    url: "/help",
    icon: <HelpIcon />,
    notification: 1,
  },
];

interface Props {
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  active: number;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <IconButton
        edge="start"
        className={classes.closeButton}
        aria-label="close drawer"
        onClick={props.handleDrawerToggle}
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
              selected={index === props.active ? true : false}
              component={RouterLink}
              to={item.url}
              onClick={props.handleDrawerToggle}
            >
              <ListItem className={classes.listItem} key={index} dense>
                <ListItemIcon className={classes.listItemIcon}>
                  {item.icon}
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
