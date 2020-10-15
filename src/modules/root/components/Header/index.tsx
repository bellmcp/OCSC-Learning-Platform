import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.common.white,
      backgroundSize: "cover",
      padding: theme.spacing(16, 0, 8),
    },
    subtitle: {
      marginTop: theme.spacing(4),
      maxWidth: 500,
    },
  })
);

interface HeaderProps {
  window?: () => Window;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function Header(props: HeaderProps) {
  const classes = useStyles();

  return (
    <div
      className={classes.header}
      style={{ backgroundImage: `url(${props.imageUrl})` }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h3"
          align="left"
          color="inherit"
          gutterBottom
        >
          {props.title}
        </Typography>

        <Grid container justify="flex-start" className={classes.subtitle}>
          <Grid item>
            <Typography paragraph align="left" color="inherit">
              {props.subtitle}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
