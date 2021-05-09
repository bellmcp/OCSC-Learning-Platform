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
} from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

import isBetween from "utils/isBetween";

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
  courseRoundId,
  courseStart,
  courseEnd,
  registrationDate,
  isCompleted,
  completeDate,
  courseId,
  code,
  name,
  thumbnail,
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
            borderLeft: isCompleted ? `6px solid ${green[800]}` : "",
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
                    {name ? name : "รายวิชา"}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    {code ? code : "รหัสรายวิชา"}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    color="textSecondary"
                    gutterBottom
                  >
                    รอบที่ {courseRoundId ? courseRoundId : "ไม่มีข้อมูล"}
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
                      {registrationDate ? registrationDate : "ไม่มีข้อมูล"}
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
                      {courseStart ? courseStart : "ไม่มีข้อมูล"}
                    </DayJS>{" "}
                    ถึง{" "}
                    <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                      {courseEnd ? courseEnd : "ไม่มีข้อมูล"}
                    </DayJS>
                  </Typography>
                </Grid>
                {!matches && (
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="center"
                      wrap="nowrap"
                    >
                      {isCompleted && (
                        <Grid item>
                          <CheckIcon
                            style={{
                              color: green[800],
                              marginTop: 6,
                              marginRight: 4,
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item>
                        <Button
                          disabled={!isBetween(courseStart, courseEnd)}
                          variant="outlined"
                          color="secondary"
                          startIcon={<PlayIcon />}
                          onClick={linkToLecture}
                          fullWidth
                        >
                          เข้าเรียน
                        </Button>
                      </Grid>
                    </Grid>
                    {isCompleted && (
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                        align="center"
                        style={{ lineHeight: "1.2", marginTop: 16 }}
                      >
                        <span style={{ color: green[800] }}>
                          <b>สำเร็จการศึกษา </b>
                          <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                            {completeDate ? completeDate : "ไม่มีข้อมูล"}
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
              disabled={!isBetween(courseStart, courseEnd)}
              variant="text"
              color="secondary"
              startIcon={<PlayIcon />}
              fullWidth
              onClick={linkToLecture}
            >
              เข้าเรียน
            </Button>
            {isCompleted && (
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                style={{ marginTop: 8, marginBottom: 16 }}
              >
                <CheckIcon
                  style={{
                    color: green[800],
                    fontSize: 16,
                    marginRight: 8,
                  }}
                />
                <Typography
                  variant="caption"
                  component="p"
                  color="textSecondary"
                  align="center"
                  style={{ lineHeight: "1.2" }}
                >
                  <span style={{ color: green[800] }}>
                    <b>สำเร็จการศึกษา </b>
                    <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                      {completeDate ? completeDate : "ไม่มีข้อมูล"}
                    </DayJS>
                  </span>
                </Typography>
              </Grid>
            )}
          </Box>
        </>
      )}
    </Card>
  );
}
