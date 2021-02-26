// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { CssBaseline, Snackbar, IconButton } from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import { grey, amber } from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";

import * as actions from "../actions";
import NavBar from "./NavBar";
import Routes from "./Routes";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const path = "/learning-platform";
  const dispatch = useDispatch();
  const { flashMessage, alertType } = useSelector((state) => state.ui);

  const closeFlashMessage = () => dispatch(actions.clearFlashMessage());

  useEffect(() => {
    const setInitialActivePage = () => {
      switch (pathname) {
        case `${path}`:
          setActivePage(0);
          break;
        case `${path}/learn`:
          setActivePage(1);
          break;
        case `${path}/learn/demo`:
        case `${path}/learn/demo/read`:
        case `${path}/learn/demo/exam`:
        case `${path}/learn/demo/survey`:
        case `${path}/learn/demo/file`:
          setActivePage(1);
          break;
        case `${path}/support`:
          setActivePage(2);
          break;
        default:
          setActivePage(99);
          break;
      }
    };
    setInitialActivePage();
  }, [pathname]);

  const [activePage, setActivePage] = useState(0);

  const defaultTheme = createMuiTheme();

  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Prompt", "sans-serif"].join(","),
    },
    overrides: {
      MuiToolbar: {
        gutters: {
          [defaultTheme.breakpoints.up("xs")]: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
      MuiCardContent: {
        root: {
          padding: 0,
          "&:last-child": {
            paddingBottom: 0,
          },
        },
      },
    },
    breakpoints: {
      values: {
        sm: 670,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        main: `${grey[900]}`,
      },
      secondary: {
        main: `${amber[500]}`,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingBar
        maxProgress={100}
        updateTime={100}
        style={{
          zIndex: 9999999999,
          height: 2,
          backgroundColor: theme.palette.secondary.main,
          transition: "all 5s ease 3s",
        }}
      />
      <NavBar active={activePage} setActivePage={setActivePage} />
      <Routes />
      <Snackbar
        open={flashMessage}
        onClose={closeFlashMessage}
        message={flashMessage}
        autoHideDuration={6000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeFlashMessage}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={closeFlashMessage}
          severity={alertType ? alertType : "info"}
          elevation={6}
          variant="filled"
        >
          {flashMessage}
        </Alert>
      </Snackbar>
      {!pathname.includes(`${path}/learn/demo`) && <Footer />}
    </ThemeProvider>
  );
}
