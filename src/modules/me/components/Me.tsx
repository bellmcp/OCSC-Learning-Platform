import React from "react";
import { useSelector } from "react-redux";
import Header from "modules/ui/components/Header";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { amber } from "@material-ui/core/colors";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  FolderSpecial as FolderIcon,
} from "@material-ui/icons";

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
  const { items: users } = useSelector((state: any) => state.user);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const linkToCertificate = () => {
    alert(`Redirect to https://welearn.ocsc.go.th/learning-portal/history`);
  };

  const linkToEditProfile = () => {
    alert(`Redirect to https://welearn.ocsc.go.th/learning-portal/edit`);
  };

  const linkToChangePassword = () => {
    alert(`Redirect to https://welearn.ocsc.go.th/learning-portal/reset`);
  };

  return (
    <>
      <Header
        title={TITLE}
        icon={<PersonIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container component="main" maxWidth="md">
        <Paper className={classes.paper} style={{ textAlign: "center" }}>
          <Avatar className={classes.avatar} />
          <Typography
            component="h1"
            variant="h6"
            style={{ marginTop: 14, fontSize: "1.7rem", fontWeight: 600 }}
          >
            {users.firstName
              ? `${users.title} ${users.firstName} ${users.lastName}`
              : "คุณยังไม่ได้เข้าสู่ระบบ"}
          </Typography>
          <Typography
            component="h2"
            variant="body1"
            gutterBottom
            color="secondary"
            style={{ fontWeight: 800 }}
          >
            {users.id}
          </Typography>
          <Typography component="h2" variant="body1" color="textSecondary">
            <b>เพศ:</b>{" "}
            {users.gender && (users.gender === "m" ? "ชาย" : "หญิง")}
          </Typography>
          <Typography component="h2" variant="body1" color="textSecondary">
            <b>อีเมล:</b> {users.email}
          </Typography>
          <Typography component="h2" variant="body1" color="textSecondary">
            <b>เข้าร่วมเมื่อ:</b> {users.createDate}
          </Typography>
          <Box mt={6} style={{ width: !matches ? "100%" : "500px" }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FolderIcon />}
                  onClick={linkToCertificate}
                  fullWidth={!matches}
                >
                  ประกาศนียบัตร
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={linkToEditProfile}
                  fullWidth={!matches}
                >
                  แก้ไขโปรไฟล์
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<LockIcon />}
                  onClick={linkToChangePassword}
                  fullWidth={!matches}
                >
                  เปลี่ยนรหัสผ่าน
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
