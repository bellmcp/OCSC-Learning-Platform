// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DayJS from "react-dayjs";
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
  Divider,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { green } from "@material-ui/core/colors";
import { CheckCircle as CheckIcon } from "@material-ui/icons";

import MyCourseItem from "./MyCourseItem";
import * as registrationsActions from "../actions";

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
      width: "166px",
      borderRadius: "4 0 0 0",
    },
    stack: {
      boxShadow:
        "0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12), 0 -1px 1px rgba(0,0,0,0.15), 0 -10px 0 -5px #eee, 0 -10px 1px -4px rgba(0,0,0,0.15), 0 -20px 0 -10px #eee, 0 -20px 1px -9px rgba(0,0,0,0.15)",
    },
  })
);

export default function MyCurriculumItem({
  id,
  userId,
  curriculumId,
  registrationDate,
  satisfactionScore,
  isCompleted,
  completeDate,
  code,
  name,
  learningObjective,
  learningTopic,
  targetGroup,
  assessment,
  thumbnail,
  myCourses,
}: any) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(satisfactionScore);
  }, [satisfactionScore]);

  const updateSatisfactionScore = (newValue) => {
    const satisfaction_score_action = registrationsActions.updateCurriculumSatisfactionScore(
      id,
      newValue
    );
    dispatch(satisfaction_score_action);
    setValue(newValue);
  };

  return (
    <>
      <Card className={classes.stack}>
        <div className={classes.details}>
          <CardMedia
            image={thumbnail}
            style={{
              background: `url('${thumbnail}')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
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
                      variant="body2"
                      component="p"
                      color="secondary"
                      style={{
                        fontWeight: "bold",
                        lineHeight: "1.1",
                        marginBottom: 4,
                      }}
                    >
                      หลักสูตร
                    </Typography>
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
                              }}
                            />
                          </Grid>
                        )}
                        <Grid item>
                          <Typography
                            gutterBottom
                            component="p"
                            variant="body2"
                            align="center"
                            color="textSecondary"
                          >
                            โปรดให้คะแนนหลักสูตร
                          </Typography>
                          <Rating
                            name="size-large"
                            value={value}
                            size="large"
                            onChange={(event, newValue) => {
                              updateSatisfactionScore(newValue);
                            }}
                          />
                          {isCompleted && (
                            <Typography
                              variant="caption"
                              component="p"
                              color="textSecondary"
                              align="center"
                              style={{ lineHeight: "1.2", marginTop: 8 }}
                            >
                              <span style={{ color: green[800] }}>
                                <b>สำเร็จการศึกษา </b>
                                <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                                  {completeDate}
                                </DayJS>
                              </span>
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
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
                  <Typography
                    component="p"
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    โปรดให้คะแนนหลักสูตร
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="size-large"
                    value={value}
                    size="large"
                    onChange={(event, newValue) => {
                      updateSatisfactionScore(newValue);
                    }}
                  />
                </Grid>
              </Grid>
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
                    style={{
                      lineHeight: "1.2",
                    }}
                  >
                    <span style={{ color: green[800] }}>
                      <b>สำเร็จการศึกษา </b>
                      <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                        {completeDate}
                      </DayJS>
                    </span>
                  </Typography>
                </Grid>
              )}
            </Box>
          </>
        )}
      </Card>
      {myCourses.filter((myCourse) => myCourse.curriculumRegistrationId === id)
        .length !== 0 && (
        <Box mx={2} mt={2}>
          <Grid container direction="column" spacing={2}>
            {myCourses
              .filter((myCourse) => myCourse.curriculumRegistrationId === id)
              .map((childCourse) => (
                <Grid item key={childCourse.id}>
                  <MyCourseItem {...childCourse} />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
