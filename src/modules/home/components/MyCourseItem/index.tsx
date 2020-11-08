import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ProgressStep from "./components/ProgressStep";

import curriculum1 from "../../../../assets/images/curriculum/curriculum1.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(4),
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "25%",
    },
    controls: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default function MyCourseItem() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.root}>
        {/* <CardMedia
          className={classes.cover}
          image={curriculum1}
          title="Live from space album cover"
        /> */}
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="caption" color="textSecondary">
              หลักสูตร
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              style={{ fontSize: "1.4rem" }}
            >
              มหากาพย์ สังคมศึกษา น่ารู้
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              OCSC00001C
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <ProgressStep />
          </div>
        </div>
      </Card>
      {/* <Card>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h6" component="h2">
              สังคมศึกษา น่ารู้: ภูมิศาสตร์
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              OCSC00001C-01
            </Typography>
          </CardContent>
        </div>
      </Card> */}
    </React.Fragment>
  );
}
