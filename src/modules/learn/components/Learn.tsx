import React from "react";
import { useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import { PlayArrow as LearnIcon } from "@material-ui/icons";
import MyCourseItem from "modules/home/components/MyCourseItem";
import Header from "modules/ui/components/Header";
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

const TITLE = "เข้าเรียน";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function Learn() {
  const classes = useStyles();
  const { data: user } = useSelector((state: any) => state.user);

  return (
    <>
      {user.length !== 0 ? (
        <>
          <Header
            title={TITLE}
            icon={
              <LearnIcon fontSize="large" style={{ marginRight: "24px" }} />
            }
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
      ) : (
        <Login title="คุณยังไม่ได้เข้าสู่ระบบ" />
      )}
    </>
  );
}
