import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../root/components/NavigationBar";
import Header from "../root/components/Header";
import Footer from "../root/components/Footer";

import HelpIcon from "@material-ui/icons/Help";
const heroImage = require("../../assets/images/hero.jpg");

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

export default function Help(props: Props) {
  const classes = useStyles();
  const title = "ช่วยเหลือ";

  return (
    <>
      <Header
        title={title}
        icon={<HelpIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={heroImage}
      />
      <Container>
        <div className={classes.main}>
          <CssBaseline />
          <NavigationBar active={3} />
          <main className={classes.content}></main>
        </div>
      </Container>
      <Footer />
    </>
  );
}
