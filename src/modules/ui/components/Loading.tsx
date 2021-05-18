import React from "react";
import { Grid, CircularProgress } from "@material-ui/core/";

export default function Loading({ height }: any) {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: height }}
    >
      <CircularProgress color="secondary" />
    </Grid>
  );
}
