// @ts-nocheck
import React from "react";
import DayJS from "react-dayjs";
import { useHistory } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  useMediaQuery,
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  Button,
  Divider,
} from "@material-ui/core";
import {
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
} from "@material-ui/icons/";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(0),
    },
    controls: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    cardImage: {
      width: "150px",
      borderRadius: "4 0 0 0",
    },
  })
);

const path = "/learning-platform";

export default function MyCourseItem({
  id,
  userId,
  curriculumRegistrationId,
  courseRoundId,
  courseStart,
  courseEnd,
  registrationDate,
  satisfactionScore,
  isCompleted,
  completeDate,
  courseId,
  code,
  name,
  categoryId,
  learningObjective,
  learningTopic,
  targetGroup,
  thumbnail,
  seqFlow,
}: any) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const history = useHistory();

  const linkToLecture = () => {
    history.push(`${path}/learn/courses/${courseId}`);
  };

  return (
    <Card>
      <div className={classes.details}>
        <CardMedia
          image={thumbnail}
          style={{
            background: `url('${thumbnail}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className={classes.cardImage}
        />
        <div className={classes.controls}>
          <Grid container direction="column" justify="center">
            <Box
              my={2}
              mx={3}
              flex
              style={{
                display: "flex",
              }}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
                spacing={2}
              >
                <Grid item>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ lineHeight: "1.1", marginBottom: 4 }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {code}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    color="textSecondary"
                    gutterBottom
                  >
                    รอบที่ {courseRoundId}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                    style={{ lineHeight: "1.2" }}
                    gutterBottom
                  >
                    <b>ลงทะเบียน </b>
                    <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                      {registrationDate}
                    </DayJS>
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                    style={{ lineHeight: "1.2" }}
                  >
                    <b>เข้าเรียนได้ </b>
                    <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                      {courseStart}
                    </DayJS>{" "}
                    ถึง{" "}
                    <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                      {courseEnd}
                    </DayJS>
                  </Typography>
                </Grid>
                {!matches && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<PlayIcon />}
                      onClick={linkToLecture}
                    >
                      เข้าเรียน
                    </Button>
                    {isCompleted && (
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                        align="center"
                        style={{ lineHeight: "1.2", marginTop: 16 }}
                      >
                        <span style={{ color: theme.palette.success.main }}>
                          <b>ผ่านเกณฑ์แล้ว</b> <br />
                          <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                            {completeDate}
                          </DayJS>
                        </span>
                      </Typography>
                    )}
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </div>
      </div>
      {matches && (
        <>
          <Divider />
          <Box m={1}>
            <Button
              variant="text"
              color="primary"
              startIcon={<PlayIcon />}
              fullWidth
              onClick={linkToLecture}
            >
              เข้าเรียน
            </Button>
            {isCompleted && (
              <Typography
                variant="caption"
                component="p"
                color="textSecondary"
                align="center"
                style={{ lineHeight: "1.2", marginTop: 8, marginBottom: 16 }}
              >
                <span style={{ color: theme.palette.success.main }}>
                  <b>ผ่านเกณฑ์แล้ว</b>{" "}
                  <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                    {completeDate}
                  </DayJS>
                </span>
              </Typography>
            )}
          </Box>
        </>
      )}
    </Card>
  );
}
