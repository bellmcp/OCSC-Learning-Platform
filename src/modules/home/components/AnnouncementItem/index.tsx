import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import { AnnouncementItemProps } from "./types";

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
  })
);

export default function AnnouncementItem({
  id,
  image,
  detail,
}: AnnouncementItemProps) {
  const classes = useStyles();

  return (
    <Card className={classes.cardSmall} style={{ position: "relative" }}>
      <CardMedia
        key={id}
        className={classes.cardMediaSmall}
        image={image}
        title="Image title"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url('${image}')`,
          backgroundSize: "cover",
        }}
      />
      <div className={classes.cardDetail}>{detail}</div>
    </Card>
  );
}
