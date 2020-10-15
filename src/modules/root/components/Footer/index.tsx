import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="inherit">
      {"Copyright © "}
      <Link color="secondary" href="https://material-ui.com/">
        Office of the Civil Service Commission (OCSC)
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    color: theme.palette.common.white,
    padding: theme.spacing(6, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.grey[900],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="body1" color="inherit">
          สำนักงานคณะกรรมการข้าราชการพลเรือน (สำนักงาน ก.พ.)
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
