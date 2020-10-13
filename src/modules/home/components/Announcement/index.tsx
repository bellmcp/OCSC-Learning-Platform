import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import amber from "@material-ui/core/colors/amber";
const hero = require("../../../../assets/images/hero.jpg");

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  link: {
    color: `${amber[500]}`,
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function Announcement() {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <Paper className={classes.mainFeaturedPost}>
        {<img style={{ display: "none" }} src={hero} alt="Hero Image" />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                gutterBottom
              >
                OCSC Learning Platform
              </Typography>
              <Typography paragraph color="inherit">
                โลกแห่งการเรียนรู้ ไม่มีวันจบสิ้น ยิ่งเรียนยิ่งรู้
                ยิ่งเพิ่มพลังทางปัญญา
              </Typography>
              <Link className={classes.link} variant="subtitle1" href="#">
                เริ่มต้นเลย
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
}
