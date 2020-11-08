import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["", "", "", "", ""];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "สังคมศึกษา น่ารู้: ภูมิศาสตร์";
    case 1:
      return "สังคมศึกษา น่ารู้: เศรษฐศาสตร์";
    case 2:
      return "สังคมศึกษา น่ารู้: ประวัติศาสตร์";
    case 3:
      return "สังคมศึกษา น่ารู้: ศาสนาสากลและพระพุทธศาสนา";
    case 4:
      return "สังคมศึกษา น่ารู้: กฎหมายและสังคมวิทยา";
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
                    style={{ color: green[800], marginRight: 10 }}
                  />
                </Grid>
                <Grid item>เรียนจบแล้ว เมื่อวันที่ 1 พฤศจิกายน 2563</Grid>
              </Grid>
            </Typography>
            <Button variant="contained" color="secondary">
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
                    style={{ color: green[800], marginRight: 10 }}
                  />
                </Grid>
                <Grid item>เรียนจบแล้ว เมื่อวันที่ 8 พฤศจิกายน 2563</Grid>
              </Grid>
            </Typography>
            <Button variant="contained" color="secondary">
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
            <div style={{ width: "85%" }}>
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                gutterBottom
              >
                <Grid container alignItems="center">
                  <Grid item>
                    <PlayCircleFilledIcon
                      fontSize="small"
                      style={{ marginRight: 8 }}
                    />
                  </Grid>
                  <Grid item> บทที่ 1: ประวัติศาสตร์ไทย</Grid>
                </Grid>
              </Typography>
              <LinearProgress
                color="secondary"
                variant="determinate"
                value={33}
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PlayArrowIcon />}
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
            <Typography variant="body2" color="textSecondary" component="p">
              <Grid container alignItems="center">
                รายวิชานี้ ประกอบด้วย 2 บทเรียน ใช้เวลาเรียนประมาณ 16 ชม.
              </Grid>
            </Typography>
            <Button variant="contained" color="secondary">
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
            <Typography variant="body2" color="textSecondary" component="p">
              <Grid container alignItems="center">
                รายวิชานี้ ประกอบด้วย 3 บทเรียน ใช้เวลาเรียนประมาณ 28 ชม.
              </Grid>
            </Typography>
            <Button variant="contained" color="secondary">
              เริ่มเรียนเลย
            </Button>
          </Grid>
        </Box>
      );
    default:
      return <>Test</>;
  }
}

export default function ProgressStep() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6" component="h2">
            5 รายวิชา
          </Typography>
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Stepper nonLinear activeStep={activeStep}>
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
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Box my={2}>
              <Divider />
            </Box>
            <Typography variant="h6" component="h2">
              {getStepContent(activeStep)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {getStepDescription(activeStep)}
            </Typography>
            {getStepProgress(activeStep)}
            {/* <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
