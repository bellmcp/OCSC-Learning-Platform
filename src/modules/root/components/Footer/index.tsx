import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="inherit" align="left">
      {"Copyright © "} {new Date().getFullYear()}{" "}
      <Link color="secondary" href="https://material-ui.com/">
        Office of the Civil Service Commission (OCSC)
      </Link>
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
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6" color="inherit" align="left">
              สำนักงานคณะกรรมการข้าราชการพลเรือน (สำนักงาน ก.พ.)
            </Typography>
            <Copyright />
          </Box>
          <Box>
            <Typography variant="body2" color="inherit" align="right">
              47/111 หมู่ 4 ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี
              11000
            </Typography>
            <Typography variant="body2" color="inherit" align="right">
              E-mail:{" "}
              <Link href="mailto:ocsc.hrd@gmail.com" color="secondary">
                ocsc.hrd@gmail.com
              </Link>
            </Typography>
            <Typography variant="body2" color="inherit" align="right">
              โทร. 02-547-1795 , 02-547-1807 (ภายในเวลาราชการ)
            </Typography>
          </Box>
        </Grid>
      </Container>
    </footer>
  );
}
