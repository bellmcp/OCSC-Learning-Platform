import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import green from "@material-ui/core/colors/green";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/CheckCircle";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Rating from "@material-ui/lab/Rating";
import amber from "@material-ui/core/colors/amber";

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
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

const myCourses = [
  {
    title: "ทดสอบรายวิชา 00",
    id: "COURSE00",
    image: "https://via.placeholder.com/150?text=COURSE00",
    isCompleted: true,
  },
  {
    title: "ทดสอบรายวิชา 01 *** ทดสอบระบบห้องเรียน ***",
    id: "COURSE01",
    image: "https://via.placeholder.com/150?text=COURSE01",
    isLatest: true,
  },
  {
    title: "ทดสอบรายวิชา 02",
    id: "COURSE02",
    image: "https://via.placeholder.com/150?text=COURSE02",
  },
];

interface MyCourseItemProps {
  isHome?: boolean;
}

export default function MyCourseItem({ isHome }: MyCourseItemProps) {
  const classes = useStyles();
  return (
    <>
      <Box mt={2} mb={4}>
        <Card>
          <div className={classes.details}>
            <CardMedia
              image="https://via.placeholder.com/300?text=CURRICULUM01"
              style={{
                width: "200px",
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
                    >
                      หลักสูตร
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h2"
                      style={{ fontSize: "1.4rem" }}
                    >
                      ทดสอบหลักสูตร 01
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
          <Divider />
          <Divider />
          {myCourses.map((item, index) => (
            <div key={index}>
              <Divider />
              <div className={classes.details}>
                <CardMedia
                  image={item.image}
                  title="Live from space album cover"
                  style={{
                    width: "200px",
                    borderRadius: "4 0 0 0",
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
