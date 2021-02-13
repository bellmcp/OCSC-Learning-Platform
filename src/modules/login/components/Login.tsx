import React from "react";
import { Container, Grid } from "@material-ui/core";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} md={8} lg={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
}
