import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  FolderSpecial as FolderIcon,
  Print as PrintIcon,
} from "@material-ui/icons";

import Header from "modules/ui/components/Header";

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
  buttonGroupWrapper: {
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export default function Me() {
  const classes = useStyles();
  const path = "/learning-platform";
  const history = useHistory();
  const { items: users } = useSelector((state: any) => state.user);

  const linkToCertificate = () => {
    window.open(
      "https://learningspace.ocsc.go.th/learning-portal/history",
      "_blank"
    );
  };

  const linkToEditProfile = () => {
    window.open(
      "https://learningspace.ocsc.go.th/learning-portal/edit",
      "_blank"
    );
  };

  const linkToChangePassword = () => {
    window.open(
      "https://learningspace.ocsc.go.th/learning-portal/reset",
      "_blank"
    );
  };

  const linkToPrintCertificate = () => {
    history.push(`${path}/me/certificate`);
  };

  return (
    <>
      <Header
        title="โปรไฟล์"
        icon={<PersonIcon fontSize="large" style={{ marginRight: "24px" }} />}
      />
      <Container component="main" maxWidth="md">
        <Paper className={classes.paper} style={{ textAlign: "center" }}>
          <Avatar className={classes.avatar} />
          <Typography
            component="h1"
            variant="h6"
            gutterBottom
            style={{
              marginTop: 14,
              fontSize: "1.7rem",
              fontWeight: 600,
              lineHeight: "1.2",
            }}
          >
            {users.firstname
              ? `${users.title}${users.firstname} ${users.lastname}`
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
          <Box mt={3} className={classes.buttonGroupWrapper}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FolderIcon />}
                  onClick={linkToCertificate}
                  fullWidth
                >
                  ประกาศนียบัตรทั้งหมด
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PrintIcon />}
                  onClick={linkToPrintCertificate}
                  fullWidth
                >
                  พิมพ์ประกาศนียบัตร ก.พ.
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              ></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={linkToEditProfile}
                  fullWidth
                >
                  แก้ไขโปรไฟล์
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LockIcon />}
                  onClick={linkToChangePassword}
                  fullWidth
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
