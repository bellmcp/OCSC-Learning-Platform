import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../root/components/NavigationBar";
import Header from "../root/components/Header";
import Footer from "../root/components/Footer";
import LearnIcon from "@material-ui/icons/PlayArrow";

import MyCourseItem from "../home/components/MyCourseItem";
import Typography from "@material-ui/core/Typography";

const heroImage = require("../../assets/images/root/hero-min.jpg");

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

interface Props {
  window?: () => Window;
}

export default function Learn(props: Props) {
  const classes = useStyles();
  const title = "เข้าเรียน";

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={1} />
      <Header
        title={title}
        icon={<LearnIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={heroImage}
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
      <Footer />
    </React.Fragment>
  );
}
