// @ts-nocheck
import React from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    marginTop: "8px",
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
}));

export default function CurriculumItem({
  id,
  code,
  name,
  learningObjective,
  thumbnail,
}: any) {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <CardActionArea
      component={RouterLink}
      to={
        path === "/learning-platform/curriculums"
          ? `${path}/${id}`
          : `${path}/curriculums/${id}`
      }
      classes={{
        root: classes.actionArea,
        focusHighlight: classes.focusHighlight,
      }}
    >
      <Card className={classes.card}>
        <CardMedia
          key={id}
          className={classes.cardMediaStack}
          image={thumbnail}
          title={name}
          style={{
            background: `url('${thumbnail}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
        <CardContent className={classes.cardContent}>
          <Box my={2}>
            <Typography
              variant="body2"
              color="secondary"
              style={{ fontWeight: "bold" }}
            >
              หลักสูตร
            </Typography>
            <Typography className={classes.title} variant="h6" component="h2">
              {name}
            </Typography>
            <Typography variant="body2">
              <div className={classes.genre}>{code}</div>
            </Typography>
            <Box my={1}>
              <Typography
                variant="body2"
                gutterBottom
                color="textSecondary"
                component="p"
              >
                <div
                  className={classes.detail}
                  dangerouslySetInnerHTML={{
                    __html: learningObjective,
                  }}
                ></div>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
