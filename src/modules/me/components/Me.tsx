import React from "react";
import { useSelector } from "react-redux";
import Header from "modules/ui/components/Header";
import { Container, Typography, Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";
import { Person as PersonIcon } from "@material-ui/icons";

const TITLE = "โปรไฟล์";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5, 3),
    margin: theme.spacing(7, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: amber[500],
    color: "black",
  },
}));

export default function Me() {
  const classes = useStyles();
  const { data } = useSelector((state: any) => state.user);
  return (
    <>
      <Header
        title={TITLE}
        icon={<PersonIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container component="main" maxWidth="md">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography
            component="h2"
            variant="body1"
            gutterBottom
            color="textSecondary"
            style={{ marginTop: 20, fontWeight: 600 }}
          >
            {data.id}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            style={{ fontWeight: 600 }}
          >
            {data.firstName
              ? `${data.title} ${data.firstName} ${data.lastName}`
              : "คุณยังไม่ได้เข้าสู่ระบบ"}
          </Typography>
          <Typography component="h2" variant="body1" color="textSecondary">
            {data.gender && (data.gender === "m" ? "เพศชาย" : "เพศหญิง")}
          </Typography>
          <Typography component="h2" variant="body1" color="textSecondary">
            {data.email}
          </Typography>
          <Typography component="h2" variant="body1" color="textSecondary">
            {data.createDate}
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
