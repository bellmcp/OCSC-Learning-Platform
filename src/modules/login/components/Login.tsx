import React from "react";
import { Grid } from "@material-ui/core";
import Aside from "modules/ui/components/Aside";
import LoginForm from "./LoginForm";

export default function Login({ title }: any) {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Aside title={title} />
      </Grid>
      <Grid item xs={12} md={6}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}
