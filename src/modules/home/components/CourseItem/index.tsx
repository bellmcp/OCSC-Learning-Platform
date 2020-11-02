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
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      display: "flex",
      padding: "15px",
      paddingBottom: 0,
      flexDirection: "column",
      position: "relative",
      background: "none",
      boxShadow: "none",
    },
    actionArea: {
      borderRadius: theme.shape.borderRadius,
    },
    focusHighlight: {},
    cardMedia: {
      paddingTop: "75%", // 4:3
      borderRadius: theme.shape.borderRadius,
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    cardMediaStack: {
      paddingTop: "75%", // 4:3
      borderRadius: theme.shape.borderRadius,
      boxShadow:
        "0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12), 0 -1px 1px rgba(0,0,0,0.15), 0 -10px 0 -5px #eee, 0 -10px 1px -4px rgba(0,0,0,0.15), 0 -20px 0 -10px #eee, 0 -20px 1px -9px rgba(0,0,0,0.15)",
    },
    cardDetail: {
      position: "absolute",
      color: "white",
      textAlign: "center",
      bottom: "15px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    cardContent: {
      flexGrow: 1,
      padding: 0,
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
  isCurriculum,
}: CourseItemProps) {
  const classes = useStyles();

  return (
    <CardActionArea
      component={RouterLink}
      to="/courses/1"
      classes={{
        root: classes.actionArea,
        focusHighlight: classes.focusHighlight,
      }}
    >
      <Card className={classes.card}>
        {isCurriculum ? (
          <CardMedia
            key={id}
            className={classes.cardMediaStack}
            image={image}
            title={title}
            style={{
              background: `url('${image}')`,
              backgroundSize: "cover",
            }}
          />
        ) : (
          <CardMedia
            key={id}
            className={classes.cardMedia}
            image={image}
            title={title}
            style={{
              background: `url('${image}')`,
              backgroundSize: "cover",
            }}
          />
        )}
        <CardContent className={classes.cardContent}>
          <Box my={2}>
            {isCurriculum ? (
              <Typography
                className={classes.title}
                variant="caption"
                color="textSecondary"
              >
                หลักสูตร
              </Typography>
            ) : null}
            <Typography className={classes.title} variant="h6" component="h2">
              {title}
            </Typography>
            <Typography variant="body2">
              <div className={classes.genre}>
                OCSC000{id}
                {isCurriculum ? "C" : null}
              </div>
            </Typography>
            <Box my={1}>
              <Typography
                variant="body2"
                gutterBottom
                color="textSecondary"
                component="p"
              >
                <div className={classes.detail}>{detail}</div>
              </Typography>
            </Box>
            <Box mt={2} mb={1}>
              <Typography variant="body2">
                <div className={classes.genre}>
                  <CourseGenreIcon
                    style={{ color: blue[500], fontSize: 12, marginRight: 6 }}
                  />
                  {genre}
                </div>
              </Typography>
            </Box>
            {totalSeat && availableSeat ? (
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
            ) : null}
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
