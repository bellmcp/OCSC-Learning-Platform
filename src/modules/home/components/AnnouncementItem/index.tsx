import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

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
      bottom: 15,
      left: "50%",
      transform: "translateX(-50%)",
    },
  })
);

export default function AnnouncementItem() {
  const classes = useStyles();
  const course = require("../../../../assets/images/course.png");

  return (
    <Card className={classes.cardSmall} style={{ position: "relative" }}>
      <CardMedia
        className={classes.cardMediaSmall}
        image={course}
        title="Image title"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url('${course}')`,
          backgroundSize: "cover",
        }}
      />
      <div className={classes.cardDetail}>
        พร้อมรบ พร้อมรับ กับสถานการณ์ COVID-19
      </div>
    </Card>
  );
}
