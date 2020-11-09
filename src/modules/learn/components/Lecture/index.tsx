import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React from "react";
import NavigationBar from "../NavigationBar";
import Player from "../Player";
import SideBar from "../SideBar";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      display: "unset",
      width: drawerWidth,
      flexShrink: 0,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    playerWrapper: { position: "relative", paddingTop: "56.25%" },
    reactPlayer: { position: "absolute", top: 0, left: 0 },
  })
);

export default function Lecture() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={1} />
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <SideBar />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="md">
            <Box my={4}>
              <Player />
            </Box>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
