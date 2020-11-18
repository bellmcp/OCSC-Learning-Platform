import React from "react";
import Helmet from "react-helmet";
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
      <Helmet>
        {/* Primary Meta Tags */}
        <title>OCSC Learning Platform</title>
        <meta name="title" content="OCSC Learning Platform" />
        <meta
          name="description"
          content="เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://ocsc-learning-platform.herokuapp.com/"
        />
        <meta property="og:title" content="OCSC Learning Platform" />
        <meta
          property="og:description"
          content="เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform"
        />
        <meta property="og:image" content={meta} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="http://ocsc-learning-platform.herokuapp.com/"
        />
        <meta property="twitter:title" content="OCSC Learning Platform" />
        <meta
          property="twitter:description"
          content="เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform"
        />
        <meta property="twitter:image" content={meta} />
      </Helmet>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                announcements={ANNOUNCEMENTS}
                courses={COURSES}
                curriculum={CURRICULUM}
              />
            )}
          />
          <Route exact path="/learn" component={Learn} />
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
          <Redirect to="/" />
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
