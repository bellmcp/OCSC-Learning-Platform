//@ts-nocheck
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Breadcrumbs,
  Grid,
  Box,
  Link,
  Divider,
  Button,
  Toolbar,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  NavigateNext as NavigateNextIcon,
  Print as PrintIcon,
} from "@material-ui/icons";

import CertificateRenderer from "./CertificateRenderer";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  content: {
    width: "100%",
    marginBottom: 50,
  },
}));

export default function CertificateView() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const path = "/learning-platform";

  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef<(() => void) | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("old boring text");
  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);
  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);
  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setLoading(true);
    setText("Loading new text...");

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  return (
    <>
      <Toolbar />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mt={4} mb={3}>
              <Grid
                container
                direction="row"
                justify={matches ? "flex-start" : "center"}
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
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={`${path}/me/certificate`}
                  >
                    พิมพ์ประกาศนียบัตร ก.พ.
                  </Link>
                  <Typography color="textPrimary">ประกาศนียบัตร</Typography>
                </Breadcrumbs>
              </Grid>
            </Box>
            <Divider />
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h6"
                style={{
                  fontSize: "1.7rem",
                  marginBottom: 0,
                  fontWeight: 600,
                }}
              >
                วิชา กระบวนการวิเคราะห์ปัญหา และการแก้ปัญหา
              </Typography>
            </Box>
            <Box my={3}>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                <b>ผู้สำเร็จการศึกษา</b> นายรักเรียน ขยันเรียน
                <br />
                <b>วันที่สำเร็จการศึกษา</b> 1 เดือน เมษายน พ.ศ. 2556
              </Typography>
            </Box>
            <Box my={6}>
              <CertificateRenderer ref={componentRef} text={text} />
            </Box>
            <Box my={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                size="large"
                fullWidth
              >
                {loading ? "กำลังโหลด..." : "สั่งพิมพ์"}
              </Button>
            </Box>
          </main>
        </div>
      </Container>
    </>
  );
}
