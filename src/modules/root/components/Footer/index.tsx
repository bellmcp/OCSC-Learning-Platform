import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

const OCSC_NAME_TH = "สำนักงานคณะกรรมการข้าราชการพลเรือน (สำนักงาน ก.พ.)";
const OCSC_NAME_EN = "Office of the Civil Service Commission (OCSC)";
const OCSC_URL = "https://www.ocsc.go.th/";
const OCSC_ADDRESS =
  "47/111 หมู่ 4 ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000";
const OCSC_EMAIL = "ocsc.hrd@gmail.com";
const OCSC_PHONE = "โทร. 02-547-1795 , 02-547-1807 (ภายในเวลาราชการ)";

export default function Footer() {
  const classes = useStyles();
  const isFhdUp = useMediaQuery("(min-width:1080px)");

  function DesktopFooter() {
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography variant="h6" color="inherit" align="left">
            {OCSC_NAME_TH}
          </Typography>
          <Typography variant="body2" color="inherit" align="left">
            {"Copyright © "} {new Date().getFullYear()}{" "}
            <Link color="secondary" href={OCSC_URL}>
              {OCSC_NAME_EN}
            </Link>
          </Typography>
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
    );
  }

  function MobileFooter() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Box
            lineHeight={1.2}
            fontSize="h6.fontSize"
            fontWeight="fontWeightMedium"
            textAlign="center"
            mb={3}
          >
            {OCSC_NAME_TH}
          </Box>
        </Grid>
        <Grid item>
          <Box lineHeight={1.2} fontSize={16} textAlign="center" mb={1}>
            {OCSC_ADDRESS}
          </Box>
          <Box lineHeight={1.2} fontSize={16} textAlign="center" mb={1}>
            <Link href="mailto:ocsc.hrd@gmail.com" color="secondary">
              {OCSC_EMAIL}
            </Link>
          </Box>
          <Box lineHeight={1.2} fontSize={16} textAlign="center">
            {OCSC_PHONE}
          </Box>
        </Grid>
        <Grid item>
          <Box mt={3}>
            <Typography variant="body2" color="inherit" align="center">
              {"Copyright © "} {new Date().getFullYear()} {OCSC_NAME_EN}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        {isFhdUp ? <DesktopFooter /> : <MobileFooter />}
      </Container>
    </footer>
  );
}
