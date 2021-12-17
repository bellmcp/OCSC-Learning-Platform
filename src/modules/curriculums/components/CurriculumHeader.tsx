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
import { amber } from '@material-ui/core/colors';

interface CurriculumHeaderProps {
  title: string;
  code: string;
  imageUrl: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.common.white,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      minHeight: '370px',
      padding: theme.spacing(14, 0, 8),
      textShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)',
    },
    subtitle: {
      marginTop: theme.spacing(4),
    },
  })
);

export default function CurriculumHeader({
  title,
  code,
  imageUrl,
}: CurriculumHeaderProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Toolbar />
      <div
        className={classes.header}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'darken',
          borderLeft: `8px solid ${amber[500]}`,
        }}
      >
        <div style={{ position: 'relative' }}>
          <Container maxWidth="lg">
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems={matches ? 'flex-start' : 'center'}
            >
              <Typography
                component="h2"
                variant={matches ? 'h6' : 'body1'}
                align="center"
                gutterBottom
                style={{ color: amber[500] }}
              >
                หลักสูตร
              </Typography>
              <Typography
                component="h1"
                variant={matches ? 'h3' : 'h4'}
                align={matches ? 'left' : 'center'}
                color="inherit"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography
                component="h2"
                variant={matches ? 'h6' : 'body1'}
                align="center"
                color="inherit"
              >
                {code}
              </Typography>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}
