// @ts-nocheck
import React from "react";
import { Typography, Grid, Box, CircularProgress } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import MyCourseItem from "./MyCourseItem";

export default function MyCourseList({
  isRegistrationsLoading,
  isRegisteredCoursesLoading,
  registeredCourses,
  registrations,
}: any) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return <></>;
}
