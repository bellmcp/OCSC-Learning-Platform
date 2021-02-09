// @ts-nocheck
import React from "react";
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
import Rating from "@material-ui/lab/Rating";

import MyCourseItem from "./MyCourseItem";

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
  keyId,
  thumbnail,
  name,
  code,
  registrations,
  childCourses,
  myCoursesRegistrations,
}: any) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

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
                  wrap="nowrap"
                  spacing={2}
                >
                  <Grid item>
                    <Typography
                      variant="body2"
                      component="p"
                      color="secondary"
                      style={{ fontWeight: "bold" }}
                    >
                      หลักสูตร
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h2"
                      style={{ lineHeight: "1.1" }}
                      gutterBottom
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
                      <b>ลงทะเบียนเมื่อ: </b>
                      {`${registrations[keyId]?.registrationDate}`}
                    </Typography>
                  </Grid>
                  {!matches && (
                    <Grid item>
                      <Typography
                        gutterBottom
                        component="p"
                        variant="body2"
                        align="center"
                      >
                        ให้คะแนนหลักสูตรนี้
                      </Typography>
                      <Rating
                        name="size-large"
                        defaultValue={registrations[keyId]?.satisfactionScore}
                        size="large"
                        onChange={(event, newValue) => {
                          alert(`Voted: ${newValue} stars`);
                        }}
                      />
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
                  <Typography component="p" variant="body2" align="center">
                    ให้คะแนนหลักสูตรนี้
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="size-large"
                    defaultValue={registrations[keyId]?.satisfactionScore}
                    size="large"
                    onChange={(event, newValue) => {
                      alert(`Voted: ${newValue} stars`);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Card>
      <Box mx={2} mt={2}>
        <Grid container direction="column" spacing={2}>
          {childCourses.map((myCourse, id) => (
            <Grid item key={myCourse.id}>
              <MyCourseItem
                {...myCourse}
                keyId={id}
                registrations={myCoursesRegistrations}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
