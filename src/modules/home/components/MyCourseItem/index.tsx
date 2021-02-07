import React from "react";

import { NavLink } from "react-router-dom";
import {
  useMediaQuery,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { green, amber } from "@material-ui/core/colors";
import {
  CheckCircle as CheckIcon,
  PlayArrow as PlayArrowIcon,
} from "@material-ui/icons";

const path = "/learning-platform";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(0),
    },
    content: {
      width: "100%",
    },
    cover: {
      width: "25%",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    cardImage: {
      // [theme.breakpoints.down("xs")]: {
      //   display: "none",
      // },
    },
  })
);

const myCourses = [
  {
    title: "รายวิชา 01",
    id: "COURSE01",
    image: "https://welearn.ocsc.go.th/images/courses/ocsc/004.jpg",
    isCompleted: true,
  },
  {
    title: "รายวิชา 02 (ทดสอบห้องเรียน)",
    id: "COURSE02",
    image: "https://welearn.ocsc.go.th/images/courses/ocsc/005.jpg",
    isLatest: true,
  },
  {
    title: "รายวิชา 03",
    id: "COURSE03",
    image: "https://welearn.ocsc.go.th/images/courses/ocsc/011.jpg",
  },
];

export default function MyCourseItem({ isHome }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      <Box mt={2} mb={4}>
        <Card
          style={{
            boxShadow:
              "0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12), 0 -1px 1px rgba(0,0,0,0.15), 0 -10px 0 -5px #eee, 0 -10px 1px -4px rgba(0,0,0,0.15), 0 -20px 0 -10px #eee, 0 -20px 1px -9px rgba(0,0,0,0.15)",
          }}
        >
          <div className={classes.details}>
            <CardMedia
              image="https://welearn.ocsc.go.th/images/courses/ocsc/006.jpg"
              style={{
                width: "150px",
                borderRadius: "4 0 0 0",
                borderLeft: `10px solid ${amber[500]}`,
              }}
              className={classes.cardImage}
            />
            <div className={classes.controls}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Box my={2} mx={3}>
                    <Typography
                      variant="body2"
                      color="secondary"
                      style={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      หลักสูตร
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h2"
                      style={{ fontSize: "1.4rem", lineHeight: "1.2" }}
                      gutterBottom
                    >
                      หลักสูตรฝึกอบรมข้าราชการบรรจุใหม่
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      CURRICULUM01
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box my={3} mx={3}>
                    <Grid
                      container
                      justify="center"
                      direction="column"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          style={{
                            fontSize: "0.8rem",
                          }}
                          gutterBottom
                        >
                          โปรดให้คะแนนหลักสูตรนี้
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Rating
                          name="size-large"
                          defaultValue={0}
                          size="large"
                          onChange={(event, newValue) => {
                            alert(`Voted: ${newValue} stars`);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>
          {myCourses.map((item, index) => (
            <div key={index}>
              <Divider />
              <div className={classes.details}>
                <CardMedia
                  image={item.image}
                  style={{
                    width: "150px",
                    borderRadius: "4 0 0 0",
                    borderLeft: `10px solid ${amber[500]}`,
                  }}
                  className={classes.cardImage}
                />
                <div className={classes.controls}>
                  <Grid container direction="column">
                    <Box my={2} mx={3}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography
                            variant="h6"
                            component="h2"
                            style={{ fontSize: "1.1rem" }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.id}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {item.isLatest ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<PlayArrowIcon />}
                              component={NavLink}
                              to={`${path}/learn/demo`}
                            >
                              เข้าเรียนต่อ
                            </Button>
                          ) : (
                            <>
                              <Grid
                                container
                                spacing={1}
                                direction="row"
                                justify="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="nowrap"
                              >
                                {item.isCompleted ? (
                                  <Grid item>
                                    <CheckIcon
                                      style={{
                                        color: green[800],
                                        marginRight: 2,
                                      }}
                                    />
                                  </Grid>
                                ) : null}
                                <Grid item>
                                  <Button variant="outlined" color="primary">
                                    เข้าเรียน
                                  </Button>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </Box>
    </>
  );
}
