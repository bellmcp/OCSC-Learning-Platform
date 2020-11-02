import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import Home from "./modules/home";
import Courses from "./modules/courses";
import CourseDetail from "./modules/courses/components/CourseDetail";
import Help from "./modules/help";

import { announcements } from "./shared/announcements";
import { coursesData } from "./shared/courses";
import { curriculumData } from "./shared/curriculum";

function App() {
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

  // const getCourseData = ({ match }: any) => {
  //   return (
  //     <CourseDetail
  //       course={coursesData.map(
  //         (item) =>
  //           item.courses.filter(
  //             (course) => course.id === parseInt(match.params.courseId, 10)
  //           )[0] //TODO: FIX bugs array out of range
  //       )}
  //     />
  //   );
  // };

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                announcements={announcements}
                courses={coursesData}
                curriculum={curriculumData}
              />
            )}
          />
          <Route
            exact
            path="/courses"
            component={() => <Courses data={coursesData} />}
          />
          <Route
            path="/courses/:courseId"
            component={() => (
              <CourseDetail course={coursesData[0].courses[0]} />
            )}
          />
          <Route exact path="/help" component={Help} />
          <Redirect to="/" />
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
