import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import { AnnouncementItemProps } from "./types";
import Link from "@material-ui/core/Link";

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
  ImageUrl,
  Headline,
  TargetUrl,
}: AnnouncementItemProps) {
  const classes = useStyles();

  return (
    <Link href={TargetUrl}>
      <Card className={classes.cardSmall} style={{ position: "relative" }}>
        <CardMedia
          key={id}
          className={classes.cardMediaSmall}
          image={ImageUrl}
          title={Headline}
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url('${ImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className={classes.cardDetail}>{Headline}</div>
      </Card>
    </Link>
  );
}
