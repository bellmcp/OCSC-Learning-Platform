import React from "react";
import Button from "@material-ui/core/Button";
import amber from "@material-ui/core/colors/amber";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Slider from "@material-ui/core/Slider";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import ReactPlayer from "react-player";

const drawerWidth = 240;

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
    controlWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      zIndex: 1,
    },
    controlIcons: {
      color: "#777",
      fontSize: 50,
      transform: "scale(0.9)",
      "&:hover": {
        color: "#fff",
        transform: "scale(1)",
      },
    },
    bottomIcons: {
      color: "#999",
      "&:hover": {
        color: "#fff",
      },
    },
    volumeSlider: {
      width: 100,
    },
    typography: {
      padding: theme.spacing(2),
    },
  })
);

interface ValueLabelComponentProps {
  children: any;
  open: any;
  value: any;
}

const PrettoSlider = withStyles({
  root: {
    color: amber[500],
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function Player() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;

  return (
    <React.Fragment>
      <div className={classes.playerWrapper}>
        <ReactPlayer
          className={classes.reactPlayer}
          url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
          width="100%"
          height="100%"
          muted={true}
          playing={true}
        />
        <div className={classes.controlWrapper}>
          {/* Top Controls */}
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            style={{ padding: 16 }}
          >
            <Grid item>
              <Typography variant="h5" style={{ color: "white" }}>
                Video Title
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<BookmarkIcon />}
              >
                Bookmark
              </Button>
            </Grid>
          </Grid>

          {/* Middle Controls */}
          <Grid container direction="row" alignItems="center" justify="center">
            <IconButton className={classes.controlIcons} aria-label="reqind">
              <FastRewindIcon fontSize="inherit" />
            </IconButton>

            <IconButton className={classes.controlIcons} aria-label="reqind">
              <PlayArrowIcon fontSize="inherit" />
            </IconButton>

            <IconButton className={classes.controlIcons} aria-label="reqind">
              <FastForwardIcon fontSize="inherit" />
            </IconButton>
          </Grid>

          {/* Bottom Controls */}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ padding: 16 }}
          >
            <Grid item xs={12}>
              <PrettoSlider
                min={0}
                max={100}
                defaultValue={20}
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item>
              <Grid container alignItems="center" direction="row">
                <IconButton className={classes.bottomIcons}>
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
                <IconButton className={classes.bottomIcons}>
                  <VolumeUpIcon fontSize="large" />
                </IconButton>
                <Slider
                  color="secondary"
                  min={0}
                  max={100}
                  defaultValue={100}
                  className={classes.volumeSlider}
                />
                <Button
                  variant="text"
                  style={{ color: "#fff", marginLeft: 16 }}
                >
                  <Typography>05:05</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                onClick={handlePopover}
                variant="text"
                className={classes.bottomIcons}
              >
                <Typography>1X</Typography>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <Button variant="text">
                      <Typography color="secondary">{rate}</Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>
              <IconButton className={classes.bottomIcons}>
                <FullScreenIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
}
