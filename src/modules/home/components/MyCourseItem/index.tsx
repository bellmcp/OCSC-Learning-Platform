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
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import course6 from "../../../../assets/images/courses/course2.png";
import curriculum1 from "../../../../assets/images/curriculum/curriculum1.png";
import course1 from "../../../../assets/images/curriculum/curriculum1/course1.png";
import course2 from "../../../../assets/images/curriculum/curriculum1/course2.png";
import course3 from "../../../../assets/images/curriculum/curriculum1/course3.png";
import course4 from "../../../../assets/images/curriculum/curriculum1/course4.png";
import course5 from "../../../../assets/images/curriculum/curriculum1/course5.png";

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

function getSteps() {
  return ["", "", "", "", ""];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "1. สังคมศึกษา น่ารู้: ภูมิศาสตร์";
    case 1:
      return "2. สังคมศึกษา น่ารู้: เศรษฐศาสตร์";
    case 2:
      return "3. สังคมศึกษา น่ารู้: ประวัติศาสตร์";
    case 3:
      return "4. สังคมศึกษา น่ารู้: ศาสนาสากลและพระพุทธศาสนา";
    case 4:
      return "5. สังคมศึกษา น่ารู้: กฎหมายและสังคมวิทยา";
    default:
      return "Unknown step";
  }
}

function getStepDescription(step: number) {
  switch (step) {
    case 0:
      return "OCSC00001C-01";
    case 1:
      return "OCSC00001C-02";
    case 2:
      return "OCSC00001C-03";
    case 3:
      return "OCSC00001C-04";
    case 4:
      return "OCSC00001C-05";
    default:
      return "Unknown step";
  }
}

function getStepImage(step: number) {
  switch (step) {
    case 0:
      return course1;
    case 1:
      return course2;
    case 2:
      return course3;
    case 3:
      return course4;
    case 4:
      return course5;
    default:
      return "./";
  }
}

function getStepProgress(step: number) {
  switch (step) {
    case 0:
      return (
        <Box my={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textPrimary" component="p">
              <Grid container alignItems="center">
                <Grid item>
                  <CheckCircleIcon
                    style={{ color: green[800], marginRight: "10px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    เรียนจบแล้ว เมื่อ 1 พฤศจิกายน 2563
                  </Typography>
                </Grid>
              </Grid>
            </Typography>
            <Button variant="outlined" color="primary">
              ดูเกียรติบัตร
            </Button>
          </Grid>
        </Box>
      );
    case 1:
      return (
        <Box my={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textPrimary" component="p">
              <Grid container alignItems="center">
                <Grid item>
                  <CheckCircleIcon
                    style={{ color: green[800], marginRight: "10px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2" gutterBottom>
                    เรียนจบแล้ว เมื่อ 8 พฤศจิกายน 2563
                  </Typography>
                </Grid>
              </Grid>
            </Typography>
            <Button variant="outlined" color="primary">
              ดูเกียรติบัตร
            </Button>
          </Grid>
        </Box>
      );
    case 2:
      return (
        <Box my={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textPrimary" component="p">
              <Grid container alignItems="center">
                <Grid item>
                  <PlayCircleFilledIcon style={{ marginRight: 10 }} />
                </Grid>
                <Grid item>บทที่ 1: ประวัติศาสตร์สากล</Grid>
              </Grid>
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PlayArrowIcon />}
              component={NavLink}
              to="/learn/epic-social-studies"
            >
              เข้าเรียนต่อ
            </Button>
          </Grid>
        </Box>
      );
    case 3:
      return (
        <Box my={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textPrimary" component="p">
              <Grid container alignItems="center">
                <Typography variant="body2" gutterBottom>
                  รายวิชานี้ ประกอบด้วย 2 บทเรียน
                </Typography>
              </Grid>
            </Typography>
            <Button variant="contained" color="primary">
              เริ่มเรียนเลย
            </Button>
          </Grid>
        </Box>
      );
    case 4:
      return (
        <Box my={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textPrimary" component="p">
              <Grid container alignItems="center">
                <Typography variant="body2" gutterBottom>
                  รายวิชานี้ ประกอบด้วย 3 บทเรียน
                </Typography>
              </Grid>
            </Typography>
            <Button variant="contained" color="primary">
              เริ่มเรียนเลย
            </Button>
          </Grid>
        </Box>
      );
    default:
      return <>Test</>;
  }
}

// const ColorlibConnector = withStyles({
//   alternativeLabel: {
//     top: 22,
//   },
//   active: {
//     "& $line": {
//       backgroundColor: green[800],
//     },
//   },
//   completed: {
//     "& $line": {
//       backgroundColor: green[800],
//     },
//   },
//   line: {
//     height: 3,
//     border: 0,
//     backgroundColor: "#eaeaf0",
//     borderRadius: 1,
//   },
// })(StepConnector);

interface MyCourseItemProps {
  isHome?: boolean;
}

export default function MyCourseItem({ isHome }: MyCourseItemProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({
    [0]: true,
    [1]: true,
  });
  const steps = getSteps();

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      <Box mt={2} mb={6}>
        <Card elevation={4}>
          <div className={classes.details}>
            <CardMedia
              image={curriculum1}
              title="Live from space album cover"
              style={{
                width: "200px",
                borderRadius: "4 0 0 0",
              }}
              className={classes.cardImage}
            />
            <div className={classes.controls}>
              <Grid container direction="column">
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
                  <Box ml={3} mr={0}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Box>
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            component="h2"
                            style={{ fontSize: "1rem" }}
                          >
                            5 รายวิชา
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Stepper
                          nonLinear
                          activeStep={activeStep}
                          // connector={<ColorlibConnector />}
                        >
                          {steps.map((label, index) => (
                            <Step key={label}>
                              <StepButton
                                onClick={handleStep(index)}
                                completed={completed[index]}
                              >
                                {label}
                              </StepButton>
                            </Step>
                          ))}
                        </Stepper>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>

          <Divider />
          <div className={classes.details}>
            <CardMedia
              image={getStepImage(activeStep)}
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
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    style={{ fontSize: "1.1rem" }}
                  >
                    {getStepContent(activeStep)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {getStepDescription(activeStep)}
                  </Typography>
                  {getStepProgress(activeStep)}
                </Box>
              </Grid>
            </div>
          </div>
        </Card>
      </Box>

      {isHome ? null : (
        <React.Fragment>
          <Typography gutterBottom variant="h6" style={{ fontSize: "1.7rem" }}>
            รายวิชาของฉัน
          </Typography>
          <Box mt={4} mb={6}>
            <Card elevation={2}>
              <div className={classes.details}>
                <CardMedia
                  image={course6}
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
