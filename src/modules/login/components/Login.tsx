import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import Aside from "modules/ui/components/Aside";
import LoginForm from "./LoginForm";

export default function Login({ title }: any) {
  return (
    <Grid container>
      <Hidden smDown>
        <Grid item xs={12} md={6}>
          <Aside title={title} />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}
