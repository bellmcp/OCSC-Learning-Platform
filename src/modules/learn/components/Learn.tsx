import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import { PlayArrow as LearnIcon } from "@material-ui/icons";
import MyCourseItem from "modules/home/components/MyCourseItem";
import Header from "modules/ui/components/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  })
);

const TITLE = "เข้าเรียน";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function Learn() {
  const classes = useStyles();

  return (
    <>
      <Header
        title={TITLE}
        icon={<LearnIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Typography
              gutterBottom
              variant="h6"
              style={{ fontSize: "1.7rem" }}
            >
              หลักสูตรของฉัน
            </Typography>
            <MyCourseItem />
          </main>
        </div>
      </Container>
    </>
  );
}
