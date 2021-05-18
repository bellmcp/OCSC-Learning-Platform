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

const HeroImage = require("assets/images/hero.svg");

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.common.white,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      minHeight: "370px",
      textShadow: "0px 3px 3px rgba(0, 0, 0, 0.1)",
    },
    subtitle: {
      marginTop: theme.spacing(4),
    },
  })
);

export default function Header({ title, subtitle, icon }: HeaderProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Toolbar />
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
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid container justify="center" alignItems="center">
              <Grid item style={{ marginTop: 8 }}>
                {icon}
              </Grid>
              <Grid item>
                <Typography
                  component="h1"
                  variant={matches ? "h4" : "h3"}
                  align="center"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
            {subtitle && (
              <Grid
                container
                justify="center"
                className={classes.subtitle}
                style={{ maxWidth: matches ? 300 : "unset" }}
              >
                <Grid item>
                  <Typography
                    component="p"
                    variant={matches ? "body2" : "body1"}
                    align="center"
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
    </>
  );
}
