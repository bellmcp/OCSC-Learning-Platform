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
    header: {
      color: theme.palette.common.white,
      minHeight: '400px',
      textShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
    },
    subtitle: {
      marginBottom: theme.spacing(5),
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
        direction="column"
        justify="flex-end"
        alignItems="center"
        className={classes.header}
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), url(${HeroImage}) no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginBottom: subtitle ? 8 : 48 }}
            >
              <Grid item style={{ marginTop: 8 }}>
                {icon}
              </Grid>
              <Grid item>
                <Typography
                  component="h1"
                  variant={matches ? 'h5' : 'h4'}
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
                style={{ maxWidth: matches ? 300 : 'unset' }}
              >
                <Grid item>
                  <Typography
                    component="p"
                    variant={matches ? 'body2' : 'body1'}
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
