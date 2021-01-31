import React from "react";
import Helmet from "react-helmet";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "modules/ui/components/Layout";

import { Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./common/utils/ScrollToTop";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import Lecture from "./modules/learn/components/Lecture";
import Video from "./modules/learn/components/Video";
import Read from "./modules/learn/components/Read";
import Exam from "./modules/learn/components/Exam";
import Survey from "./modules/learn/components/Survey";
import File from "./modules/learn/components/File";
import Curriculum from "./modules/curriculum";
import CurriculumDetail from "./modules/curriculum/components/CurriculumDetail";

import { ANNOUNCEMENTS } from "./shared/announcements";
import { COURSES } from "./shared/courses";
import { CURRICULUM } from "./shared/curriculum";

import meta from "./meta.jpg";

const TITLE = "OCSC Learning Platform";
const URL = "http://ocsc-learning-platform.herokuapp.com/";
const DESCRIPTION =
  "เรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

function App() {
  return (
    //   <MuiThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <Switch>
    //       <Route
    //         exact
    //         path="/"
    //         component={() => (
    //           <Home
    //             announcements={ANNOUNCEMENTS}
    //             courses={COURSES}
    //             curriculum={CURRICULUM}
    //           />
    //         )}
    //       />
    //       <Route exact path="/learn" component={Learn} />
    //       <Route
    //         exact
    //         path="/learn/epic-social-studies/"
    //         component={() => <Lecture content={<Video />} id={3} />}
    //       />
    //       <Route
    //         exact
    //         path="/learn/epic-social-studies/read"
    //         component={() => <Lecture content={<Read />} id={4} />}
    //       />
    //       <Route
    //         exact
    //         path="/learn/epic-social-studies/exam"
    //         component={() => <Lecture content={<Exam />} id={5} />}
    //       />
    //       <Route
    //         exact
    //         path="/learn/epic-social-studies/survey"
    //         component={() => <Lecture content={<Survey />} id={6} />}
    //       />
    //       <Route
    //         exact
    //         path="/learn/epic-social-studies/file"
    //         component={() => <Lecture content={<File />} id={7} />}
    //       />
    //       <Route
    //         exact
    //         path="/courses"
    //         component={() => <Courses courses={COURSES} />}
    //       />
    //       <Route
    //         path="/courses/:courseId"
    //         component={() => <CourseDetail course={COURSES[0].courses[0]} />}
    //       />
    //       <Route
    //         exact
    //         path="/curriculum"
    //         component={() => <Curriculum curriculum={CURRICULUM} />}
    //       />
    //       <Route
    //         exact
    //         path="/curriculum/:curriculumId"
    //         component={() => <CurriculumDetail />}
    //       />
    //       <Route exact path="/help" component={Help} />
    //       <Redirect to="/" />
    //     </Switch>
    //   </MuiThemeProvider>
    <Router>
      <ScrollToTop />
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{TITLE}</title>
        <meta name="title" content={TITLE} />
        <meta name="description" content={DESCRIPTION} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={meta} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={URL} />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta property="twitter:image" content={meta} />
      </Helmet>
      <Layout />
    </Router>
  );
}

export default App;
