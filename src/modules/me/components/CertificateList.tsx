import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "modules/ui/components/Header";
import {
  Container,
  Typography,
  Breadcrumbs,
  Grid,
  Box,
  Link,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  LocalActivity as CertificateIcon,
  NavigateNext as NavigateNextIcon,
  Inbox as InboxIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  content: {
    width: "100%",
    marginBottom: 50,
  },
}));

export default function CertificateList() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const path = "/learning-platform";
  const { items: users } = useSelector((state: any) => state.user);

  return (
    <>
      <Header
        title="ประกาศนียบัตร"
        icon={
          <CertificateIcon fontSize="large" style={{ marginRight: "24px" }} />
        }
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mt={4} mb={2}>
              <Grid
                container
                direction="row"
                justify={!matches ? "center" : "flex-start"}
                alignItems="center"
              >
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={`${path}/me`}
                  >
                    โปรไฟล์
                  </Link>
                  <Typography color="textPrimary">
                    พิมพ์ประกาศนียบัตร ก.พ.
                  </Typography>
                </Breadcrumbs>
              </Grid>
            </Box>
            <Typography
              gutterBottom
              component="h2"
              variant="h6"
              style={{ fontSize: "1.7rem", fontWeight: 600 }}
              align={matches ? "left" : "center"}
            >
              ประกาศนียบัตรสำนักงาน ก.พ.
            </Typography>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ height: 295 }}
            >
              <InboxIcon
                color="disabled"
                style={{ fontSize: 54, marginBottom: 14 }}
              />
              <Typography component="h2" variant="body1" color="textSecondary">
                ไม่มีรายการ
              </Typography>
            </Grid>
          </main>
        </div>
      </Container>
    </>
  );
}
