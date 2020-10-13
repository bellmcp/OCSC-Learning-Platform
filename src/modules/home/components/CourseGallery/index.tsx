import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import CourseGenreIcon from "@material-ui/icons/FiberManualRecord";
import LinearProgress from "@material-ui/core/LinearProgress";
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(4),
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  card: {
    display: "flex",
  },
  courseTitle: {
    lineHeight: 1.2,
  },
  cardDetails: {
    flex: 1,
  },
  cardContent: {
    padding: theme.spacing(4),
  },
  cardMedia: {
    width: 320,
    marginLeft: theme.spacing(3),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  cardSmall: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMediaSmall: {
    paddingTop: "75%", // 4:3
    //paddingTop: "56.25%", // 16:9
  },
  cardContentSmall: {
    flexGrow: 1,
  },
}));

export default function Announcement() {
  const classes = useStyles();
  const cards = [1, 2, 3, 4];
  const course = require("../../../../assets/images/course.png");

  return (
    <Fragment>
      <CssBaseline />
      <Typography gutterBottom variant="h6">
        คอร์สของฉัน
      </Typography>
      <Grid className={classes.container} container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <Card className={classes.cardSmall}>
              <CardMedia
                className={classes.cardMediaSmall}
                image={course}
                title="Image title"
              />
              <CardContent className={classes.cardContentSmall}>
                {/* Course Detail */}
                <Typography
                  className={classes.courseTitle}
                  variant="h6"
                  component="h2"
                >
                  การงบประมาณภาครัฐ
                </Typography>
                <Typography gutterBottom>
                  <CourseGenreIcon
                    style={{ color: blue[500], fontSize: 12, marginRight: 6 }}
                  />
                  การจัดการ
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  color="textSecondary"
                  component="p"
                >
                  เนื้อหาวิชาจะนำเสนอเกี่ยวกับการวางแผนงบประมาณ
                  การให้ความเห็นชอบ การนำแผนไปปฏิบัติ...
                </Typography>

                {/* ProgressBar */}
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress
                      variant="determinate"
                      value={84}
                      color="secondary"
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${Math.round(84.256)}%`}</Typography>
                  </Box>
                </Box>
              </CardContent>

              {/* Resume Button */}
              <CardActions>
                <Button size="small" color="primary">
                  เข้าสู่บทเรียน
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}
