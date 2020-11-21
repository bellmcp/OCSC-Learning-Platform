import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";
import amber from "@material-ui/core/colors/amber";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 300;
const footerHeight = 60;

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
      padding: theme.spacing(1),
      position: "relative",
      marginBottom: footerHeight,
    },
    bottom: {
      position: "sticky",
      bottom: 0,
      width: "100%",
    },
    timerContainer: {
      position: "fixed",
      height: footerHeight,
      bottom: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      backgroundColor: theme.palette.background.paper,
      marginLeft: drawerWidth,
      zIndex: 1201,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginLeft: "0",
      },
    },
  })
);

interface LectureProps {
  content: any;
  id: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="static"
        {...props}
        value={props.value * 1.66666666667}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textPrimary"
        >{`${Math.round(props.value)} s`}</Typography>
      </Box>
    </Box>
  );
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textPrimary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Lecture({ content, id }: LectureProps) {
  const classes = useStyles();
  const [timer, setTimer] = React.useState(1);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const round = setInterval(() => {
      setTimer((prevTimer) => (prevTimer >= 60 ? 0 : prevTimer + 1));
    }, 1000);
    return () => {
      clearInterval(round);
    };
  }, []);

  React.useEffect(() => {
    const sequence = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 15 ? 0 : prevProgress + 1
      );
    }, 60000);
    return () => {
      clearTimeout(sequence);
    };
  }, []);

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
        </main>
        <div className={classes.timerContainer}>
          <Box mx={2} mt={1}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <div>
                <CircularProgressWithLabel
                  value={timer}
                  style={{
                    backgroundColor: `${amber[500]}`,
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div>
                <Typography variant="h6" style={{ fontSize: "1rem" }}>
                  <Hidden only={["xs"]}>
                    <b>เวลาเข้าเรียน:</b>
                  </Hidden>{" "}
                  {progress}/15 นาที
                </Typography>
              </div>
              <div style={{ width: "100px" }}>
                <LinearProgressWithLabel
                  value={(progress / 15) * 100}
                  color="secondary"
                />
              </div>
            </Grid>
          </Box>
        </div>
      </div>
    </React.Fragment>
  );
}
