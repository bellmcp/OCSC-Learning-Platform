// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import {
  CssBaseline,
  Snackbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import * as actions from "../actions";
import NavBar from "./NavBar";
import Routes from "./Routes";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const history = useHistory();
  const path = "/learning-platform";
  const dispatch = useDispatch();
  const { isSnackbarOpen, isDialogOpen, flashMessage, alertType } = useSelector(
    (state) => state.ui
  );

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
        case `${path}/support`:
          setActivePage(2);
          break;
        default:
          setActivePage(99);
          break;
      }
      if (pathname.includes("/learn/courses")) {
        setActivePage(1);
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
        main: "#2e9ab6",
      },
      secondary: {
        main: "#183A7C",
      },
    },
  });

  const handleDialogClose = () => {
    dispatch(actions.setLearnExitDialog(false));
  };
  const linkToLearn = () => {
    handleDialogClose();
    history.push(`${path}/learn`);
    dispatch(
      actions.setFlashMessage("บันทึกเวลาเรียนสะสมเรียบร้อยแล้ว", "success")
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingBar
        maxProgress={100}
        updateTime={100}
        style={{
          zIndex: 9999999999,
          height: 2,
          backgroundColor: theme.palette.primary.main,
          transition: "all 5s ease 3s",
        }}
      />
      <NavBar active={activePage} setActivePage={setActivePage} />
      <Routes />
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ออกจากห้องเรียน?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            เซสชันปัจจุบันจะจบลง และเวลาเรียนสะสมของคุณจะถูกบันทึก
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            ยกเลิก
          </Button>
          <Button
            color="secondary"
            autoFocus
            variant="contained"
            disableElevation
            onClick={linkToLearn}
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
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
        style={{
          marginBottom: pathname.includes(`${path}/learn/courses`)
            ? 60
            : "unset",
        }}
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
      {!pathname.includes(`${path}/learn/courses`) && <Footer />}
    </ThemeProvider>
  );
}
