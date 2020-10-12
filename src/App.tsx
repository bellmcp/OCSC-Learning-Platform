import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationBar from "./modules/root/components/NavigationBar/";
import grey from "@material-ui/core/colors/grey";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Prompt", "sans-serif"].join(","),
    },
    palette: {
      primary: {
        main: `${grey[900]}`,
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar />
    </MuiThemeProvider>
  );
}

export default App;
