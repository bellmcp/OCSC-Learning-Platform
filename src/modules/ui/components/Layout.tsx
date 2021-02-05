// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CssBaseline, Snackbar, IconButton } from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import { grey, amber } from "@material-ui/core/colors";

import * as actions from "../actions";
import NavBar from "./NavBar";
import Routes from "./Routes";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const path = "/learning-platform";
  const dispatch = useDispatch();
  const flashMessage = useSelector((state) => state.ui.flashMessage);

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
        xs: 0,
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
      />
      {!pathname.includes(`${path}/learn/demo`) && <Footer />}
    </ThemeProvider>
  );
}
