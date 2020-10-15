import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import Home from "./modules/home";
import Courses from "./modules/courses";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Prompt", "sans-serif"].join(","),
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
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          {/* TODO: 404 page */}
          <Redirect to="/" />
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
