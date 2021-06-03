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
import { FiberManualRecord as CourseGenreIcon } from "@material-ui/icons";
import categoryColor from "utils/categoryColor";

interface CourseHeaderProps {
  title: string;
  code: string;
  imageUrl: string;
  category: string;
  categoryId: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.common.white,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      minHeight: "370px",
      padding: theme.spacing(14, 0, 8),
      textShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
    },
    subtitle: {
      marginTop: theme.spacing(4),
    },
  })
);

export default function CourseHeader({
  title,
  code,
  imageUrl,
  category,
  categoryId,
}: CourseHeaderProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Toolbar />
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
                component="h1"
                variant={matches ? "h3" : "h4"}
                align={matches ? "left" : "center"}
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
                gutterBottom
              >
                {code}
              </Typography>
              <Grid
                container
                justify={matches ? "flex-start" : "center"}
                alignItems="baseline"
                className={classes.subtitle}
                spacing={1}
              >
                <Grid item>
                  <CourseGenreIcon
                    style={{
                      color: categoryColor(categoryId),
                      fontSize: 12,
                      marginRight: 6,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="center">
                    {category}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}
