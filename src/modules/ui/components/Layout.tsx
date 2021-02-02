import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { grey, amber } from "@material-ui/core/colors";
import NavigationBar from "./NavigationBar";
import Routes from "./Routes";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    const setInitialActivePage = () => {
      switch (pathname) {
        case "/":
          setActivePage(0);
          break;
        case "/learn":
          setActivePage(1);
          break;
        case "/support":
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
      <NavigationBar active={activePage} setActivePage={setActivePage} />
      <Routes />
      <Footer />
    </ThemeProvider>
  );
}
