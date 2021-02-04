import React from "react";
// import Helmet from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./common/utils/ScrollToTop";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import Home from "./modules/home";
import Learn from "./modules/learn";
import Lecture from "./modules/learn/components/Lecture";
import Video from "./modules/learn/components/Video";
import Read from "./modules/learn/components/Read";
import Exam from "./modules/learn/components/Exam";
import Survey from "./modules/learn/components/Survey";
import File from "./modules/learn/components/File";
import Courses from "./modules/courses";
import Curriculum from "./modules/curriculum";
import CourseDetail from "./modules/courses/components/CourseDetail";
import CurriculumDetail from "./modules/curriculum/components/CurriculumDetail";
import Help from "./modules/help";

import { ANNOUNCEMENTS } from "./shared/announcements";
import { COURSES } from "./shared/courses";
import { CURRICULUM } from "./shared/curriculum";

import meta from "./meta.jpg";

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
      <ScrollToTop />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          {/* <Route
            exact
            path="/"
            component={() => (
              // <Home
              //   announcements={ANNOUNCEMENTS}
              //   courses={COURSES}
              //   curriculum={CURRICULUM}
              // />
              <h1>
                Please Go To
                <a href="https://ocsc-learning-platform.vercel.app/">
                  https://ocsc-learning-platform.vercel.app
                </a>
              </h1>
            )}
          /> */}
          <Route
            path="/"
            component={() => {
              window.location.href =
                "https://ocsc-learning-platform.vercel.app/";
              return null;
            }}
          />
          {/* <Route exact path="/learn" component={Learn} />
          <Route
            exact
            path="/learn/epic-social-studies/"
            component={() => <Lecture content={<Video />} id={3} />}
          />
          <Route
            exact
            path="/learn/epic-social-studies/read"
            component={() => <Lecture content={<Read />} id={4} />}
          />
          <Route
            exact
            path="/learn/epic-social-studies/exam"
            component={() => <Lecture content={<Exam />} id={5} />}
          />
          <Route
            exact
            path="/learn/epic-social-studies/survey"
            component={() => <Lecture content={<Survey />} id={6} />}
          />
          <Route
            exact
            path="/learn/epic-social-studies/file"
            component={() => <Lecture content={<File />} id={7} />}
          />
          <Route
            exact
            path="/courses"
            component={() => <Courses courses={COURSES} />}
          />
          <Route
            path="/courses/:courseId"
            component={() => <CourseDetail course={COURSES[0].courses[0]} />}
          />
          <Route
            exact
            path="/curriculum"
            component={() => <Curriculum curriculum={CURRICULUM} />}
          />
          <Route
            exact
            path="/curriculum/:curriculumId"
            component={() => <CurriculumDetail />}
          />
          <Route exact path="/help" component={Help} />
          <Redirect to="/" /> */}
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
