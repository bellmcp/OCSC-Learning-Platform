import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Toolbar,
} from "@material-ui/core";

const HeroImage = require("assets/images/hero.jpg");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.common.white,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      minHeight: "370px",
      textShadow: "0px 3px 3px rgba(0, 0, 0, 0.4)",
    },
    subtitle: {
      marginTop: theme.spacing(4),
    },
  })
);

export default function Header({ title, subtitle, icon }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.header}
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <Toolbar />
      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems={matches ? "center" : "flex-start"}
        >
          <Grid
            container
            justify={matches ? "center" : "flex-start"}
            alignItems="center"
          >
            <Grid item style={{ marginTop: 8 }}>
              {icon}
            </Grid>
            <Grid item>
              <Typography
                component="h1"
                variant={matches ? "h4" : "h3"}
                align={matches ? "center" : "left"}
                color="inherit"
              >
                {title}
              </Typography>
            </Grid>
          </Grid>
          {subtitle && (
            <Grid
              container
              justify="flex-start"
              className={classes.subtitle}
              style={{ maxWidth: matches ? 300 : 480 }}
            >
              <Grid item>
                <Typography
                  component="p"
                  variant={matches ? "body2" : "body1"}
                  align={matches ? "center" : "left"}
                  color="inherit"
                >
                  {subtitle}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Grid>
  );
}
