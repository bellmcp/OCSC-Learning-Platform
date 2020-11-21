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
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Rating from "@material-ui/lab/Rating";
import amber from "@material-ui/core/colors/amber";
import course55555 from "../../../../assets/images/courses/course2.png";
import curriculum1 from "../../../../assets/images/curriculum/curriculum1.png";
import curriculum2 from "../../../../assets/images/curriculum/curriculum7.png";
import course1 from "../../../../assets/images/curriculum/curriculum1/course1.png";
import course2 from "../../../../assets/images/curriculum/curriculum1/course2.png";
import course3 from "../../../../assets/images/curriculum/curriculum1/course3.png";
import course4 from "../../../../assets/images/curriculum/curriculum1/course4.png";
import course5 from "../../../../assets/images/curriculum/curriculum1/course5.png";

import course6 from "../../../../assets/images/curriculum/curriculum2/course1.png";
import course7 from "../../../../assets/images/curriculum/curriculum2/course2.png";
import course8 from "../../../../assets/images/curriculum/curriculum2/course3.png";

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
    title: "1. สังคมศึกษา น่ารู้: ภูมิศาสตร์",
    id: "OCSC00001C-01",
    image: course1,
  },
  {
    title: "2. สังคมศึกษา น่ารู้: เศรษฐศาสตร์",
    id: "OCSC00001C-02",
    image: course2,
  },
  {
    title: "3. สังคมศึกษา น่ารู้: ประวัติศาสตร์",
    id: "OCSC00001C-03",
    image: course3,
    isLatest: true,
  },
  {
    title: "4. สังคมศึกษา น่ารู้: ศาสนาสากลและพระพุทธศาสนา",
    id: "OCSC00001C-04",
    image: course4,
  },
  {
    title: "5. สังคมศึกษา น่ารู้: กฎหมายและสังคมวิทยา",
    id: "OCSC00001C-05",
    image: course5,
  },
];

const myCourses2 = [
  {
    title: "1. อังกฤษ อัพเกรด: ไวยากรณ์พร้อมรบ",
    id: "OCSC00006C-01",
    image: course6,
    isLatest: true,
  },
  {
    title: "2. อังกฤษ อัพเกรด: Conversation มั่นใจ",
    id: "OCSC00006C-02",
    image: course7,
  },
  {
    title: "3. อังกฤษ อัพเกรด : ศัพท์ทะลุ อ่านทะลวง",
    id: "OCSC00006C-03",
    image: course8,
  },
];

interface MyCourseItemProps {
  isHome?: boolean;
}

export default function MyCourseItem({ isHome }: MyCourseItemProps) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box mt={2} mb={4}>
        <Card elevation={4}>
          <div className={classes.details}>
            <CardMedia
              image={curriculum1}
              title="Live from space album cover"
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
                      มหากาพย์ สังคมศึกษา น่ารู้
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      OCSC00001C
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
                          defaultValue={2}
                          size="large"
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
                    <Box my={2} ml={5} mr={3}>
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
                            gutterBottom
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
                              to="/learn/epic-social-studies"
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
                                <Grid item>
                                  <CheckIcon
                                    style={{
                                      color: green[800],
                                      marginRight: 2,
                                    }}
                                  />
                                </Grid>
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

      {!isHome ? (
        <Box mt={2} mb={6}>
          <Card elevation={4}>
            <div className={classes.details}>
              <CardMedia
                image={curriculum2}
                title="Live from space album cover"
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
                        มหากาพย์ อังกฤษ อัพเกรด
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        OCSC00006C
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
                            defaultValue={4}
                            size="large"
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
            {myCourses2.map((item, index) => (
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
                      <Box my={2} ml={5} mr={3}>
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
                              gutterBottom
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
                            <Button variant="outlined" color="primary">
                              เข้าเรียน
                            </Button>
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
      ) : null}

      {isHome ? null : (
        <React.Fragment>
          <Typography gutterBottom variant="h6" style={{ fontSize: "1.7rem" }}>
            รายวิชาของฉัน
          </Typography>
          <Box mt={4} mb={6}>
            <Card elevation={2}>
              <div className={classes.details}>
                <CardMedia
                  image={course55555}
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
                      <Typography variant="h6" component="h2">
                        การงบประมาณภาครัฐ
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        OCSC0002
                      </Typography>
                      <Box my={1}>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="body2"
                            color="textPrimary"
                            component="p"
                          >
                            <Grid container alignItems="center">
                              <Grid item>
                                <PlayCircleFilledIcon
                                  style={{ marginRight: 10 }}
                                />
                              </Grid>
                              <Grid item>บทที่ 2: วางแผนงบประมาณภาครัฐ</Grid>
                            </Grid>
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<PlayArrowIcon />}
                          >
                            เข้าเรียนต่อ
                          </Button>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </div>
              </div>
            </Card>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
