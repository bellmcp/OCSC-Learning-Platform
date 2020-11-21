import Container from "@material-ui/core/Container";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";
import purple from "@material-ui/core/colors/purple";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CourseGenreIcon from "@material-ui/icons/FiberManualRecord";

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
      maxWidth: 500,
    },
  })
);

interface HeaderProps {
  window?: () => Window;
  title: string;
  subtitle?: string;
  icon?: any;
  imageUrl: string;
  isCourse?: boolean;
  courseId?: number;
  courseGenre?: string;
}

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  function DesktopHeader() {
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
                {props.courseGenre ? (
                  <Grid item>
                    <Typography variant="body2">
                      <div>
                        <CourseGenreIcon
                          style={{
                            color: purple[500],
                            fontSize: 12,
                            marginRight: 6,
                          }}
                        />
                        {props.courseGenre}
                      </div>
                    </Typography>
                  </Grid>
                ) : null}
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
                style={{ marginTop: props.icon ? 50 : 0 }}
              >
                {props.icon}
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

  function MobileHeader() {
    return (
      <div
        className={classes.header}
        style={{
          backgroundImage: `url(${props.imageUrl})`,
        }}
      >
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
                        style={{
                          color: purple[500],
                          fontSize: 12,
                          marginRight: 6,
                        }}
                      />
                      {props.courseGenre}
                    </div>
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="inherit"
                gutterBottom
                style={{
                  fontSize: "2.2rem",
                  marginTop: props.icon ? 50 : 0,
                  marginBottom: 50,
                }}
              >
                {props.icon}
                {props.title}
              </Typography>
              <Grid container justify="center">
                <Grid item>
                  <Typography
                    paragraph
                    align="center"
                    color="inherit"
                    style={{ margin: "0 20px", maxWidth: "500px" }}
                  >
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

  return (
    <React.Fragment>
      {isSmDown ? <MobileHeader /> : <DesktopHeader />}
    </React.Fragment>
  );
}
