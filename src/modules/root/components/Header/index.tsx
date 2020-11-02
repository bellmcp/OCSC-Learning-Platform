import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";
import CourseGenreIcon from "@material-ui/icons/FiberManualRecord";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.common.white,
      backgroundSize: "cover",
      maxHeight: "500px",
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
  isCourse?: boolean;
  courseId?: number;
  courseInstructor?: string;
  courseGenre?: string;
}

export default function Header(props: HeaderProps) {
  const classes = useStyles();

  return (
    <div
      className={classes.header}
      style={{
        backgroundImage: `url(${props.imageUrl})`,
      }}
    >
      {/* {props.isCourse ? (
        <div
          style={{
            backgroundImage: `url(${props.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "brightness(70%) blur(10px)",
            transform: "scale(1.1)",
            width: "100%",
            height: "350px",
            position: "absolute",
            top: 0,
            margin: 0,
          }}
        ></div>
      ) : null} */}

      <div style={{ position: "relative" }}>
        {props.isCourse ? (
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h4"
              align="left"
              color="inherit"
              gutterBottom
            >
              {props.title}
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              align="left"
              color="inherit"
              gutterBottom
            >
              OCSC000{props.courseId}
            </Typography>
            <Grid container justify="flex-start" className={classes.subtitle}>
              <Grid item>
                <Typography variant="body2">
                  <div>
                    <CourseGenreIcon
                      style={{ color: blue[500], fontSize: 12, marginRight: 6 }}
                    />
                    {props.courseGenre}
                  </div>
                </Typography>
                <Typography paragraph align="left" color="inherit">
                  {props.courseInstructor}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        ) : (
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
        )}
      </div>
    </div>
  );
}
