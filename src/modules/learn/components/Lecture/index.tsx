import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NavigationBar from "../NavigationBar";
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
      position: "relative",
    },
    bottom: {
      position: "sticky",
      bottom: 0,
      width: "100%",
    },
    playerWrapper: { position: "relative", paddingTop: "56.25%" },
    reactPlayer: { position: "absolute", top: 0, left: 0 },
  })
);

interface LectureProps {
  content: any;
  id: number;
}

export default function Lecture({ content, id }: LectureProps) {
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
          <SideBar id={id} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {content}
          {/* <div className={classes.bottom}>
            <Divider />
            <Typography variant="h6" color="initial">
              เวลาเข้าเรียน 18/30 นาที
            </Typography>
          </div> */}
        </main>
      </div>
    </React.Fragment>
  );
}
