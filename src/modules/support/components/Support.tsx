import React from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Help as HelpIcon } from "@material-ui/icons";
import Header from "modules/ui/components/Header";
import SupportForm from "./SupportForm";
import SupportList from "./SupportList";
import Login from "modules/login/components/Login";

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

const TITLE = "ช่วยเหลือ";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function Support() {
  const classes = useStyles();
  const { items: users } = useSelector((state: any) => state.user);

  return (
    <>
      {users.length !== 0 ? (
        <>
          <Header
            title={TITLE}
            icon={<HelpIcon fontSize="large" style={{ marginRight: "24px" }} />}
            imageUrl={HERO_IMAGE_URL}
          />
          <Container>
            <div className={classes.main}>
              <main className={classes.content}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="flex-start"
                  spacing={4}
                >
                  <Grid item xs={12} md={6}>
                    <SupportForm />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SupportList />
                  </Grid>
                </Grid>
              </main>
            </div>
          </Container>
        </>
      ) : (
        <Login title="คุณยังไม่ได้เข้าสู่ระบบ" />
      )}
    </>
  );
}
