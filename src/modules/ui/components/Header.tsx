import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import {
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Toolbar,
} from '@material-ui/core';

const HeroImage = require('assets/images/hero.jpg');

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '24px 0',
      minHeight: 57,
    },
    background: {
      paddingBottom: '25%',
    },
    icon: {
      marginTop: 8,
      color: process.env.REACT_APP_SECONDARY_COLOR_HEX,
    },
    title: {
      color: process.env.REACT_APP_SECONDARY_COLOR_HEX,
      fontSize: '1.7rem',
      fontWeight: 600,
    },
  })
);

export default function Header({ title, subtitle, icon }: HeaderProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Toolbar />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
        className={classes.container}
      >
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid container justify="center" alignItems="center">
              <Grid item className={classes.icon}>
                {icon}
              </Grid>
              <Grid item>
                <Typography
                  component="h1"
                  variant={matches ? 'h5' : 'h4'}
                  align="center"
                  className={classes.title}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
            {subtitle && (
              <Grid
                container
                justify="center"
                style={{
                  maxWidth: matches ? 300 : 'unset',
                  marginTop: 4,
                }}
              >
                <Grid item>
                  <Typography
                    component="p"
                    variant={matches ? 'caption' : 'body2'}
                    align="center"
                    color="textPrimary"
                  >
                    {subtitle}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="center"
        className={classes.background}
        style={{
          background: `url(${HeroImage}) no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      ></Grid>
    </>
  );
}
