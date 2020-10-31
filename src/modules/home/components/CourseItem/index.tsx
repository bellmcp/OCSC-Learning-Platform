import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import { CourseItemProps } from "./types";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CourseGenreIcon from "@material-ui/icons/FiberManualRecord";
import blue from "@material-ui/core/colors/blue";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardSmall: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMediaSmall: {
      paddingTop: "75%", // 4:3
    },
    cardDetail: {
      position: "absolute",
      color: "white",
      textAlign: "center",
      bottom: "15px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    cardContentSmall: {
      flexGrow: 1,
    },
    title: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
    },
    genre: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
    },
    detail: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
    },
  })
);

export default function CourseItem({
  id,
  title,
  image,
  genre,
  detail,
  availableSeat,
  totalSeat,
}: CourseItemProps) {
  const classes = useStyles();

  return (
    <Card className={classes.cardSmall} style={{ position: "relative" }}>
      <CardMedia
        key={id}
        className={classes.cardMediaSmall}
        image={image}
        title={title}
        style={{
          background: `url('${image}')`,
          backgroundSize: "cover",
        }}
      />
      <CardContent className={classes.cardContentSmall}>
        <Typography className={classes.title} variant="h6" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom>
          <div className={classes.genre}>
            <CourseGenreIcon
              style={{ color: blue[500], fontSize: 12, marginRight: 6 }}
            />
            {genre}
          </div>
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          color="textSecondary"
          component="p"
        >
          <div className={classes.detail}>{detail}</div>
        </Typography>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress
              variant="determinate"
              value={((totalSeat - availableSeat) / totalSeat) * 100}
              color="secondary"
            />
          </Box>
          <Box minWidth={75}>
            <Typography variant="body2" color="primary" align="right">
              {availableSeat} ที่ว่าง
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
