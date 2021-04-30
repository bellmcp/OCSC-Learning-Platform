import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { useMediaQuery, Container, Typography, Grid } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.common.white,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      minHeight: "370px",
      padding: theme.spacing(16, 0, 8),
      textShadow: "0px 3px 3px rgba(0, 0, 0, 0.4)",
    },
    subtitle: {
      marginTop: theme.spacing(4),
    },
  })
);

export default function CurriculumHeader({ title, code, imageUrl }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div
      className={classes.header}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
      }}
    >
      <div style={{ position: "relative" }}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems={matches ? "flex-start" : "center"}
          >
            <Typography
              component="h2"
              variant={matches ? "h6" : "body1"}
              align="center"
              gutterBottom
              style={{ color: amber[500] }}
            >
              หลักสูตร
            </Typography>
            <Typography
              component="h1"
              variant={matches ? "h3" : "h4"}
              align="center"
              color="inherit"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              component="h2"
              variant={matches ? "h6" : "body1"}
              align="center"
              color="inherit"
            >
              {code}
            </Typography>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
