// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardArrowDownRounded as ArrowDownIcon } from "@material-ui/icons";
import CourseItem from "modules/home/components/CourseItem";
import CategoryFilter from "./CategoryFilter";
import { MenuBook as CourseIcon } from "@material-ui/icons";
import Header from "modules/ui/components/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  })
);

const TITLE = "รายวิชา";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function CourseList() {
  const classes = useStyles();
  const { search } = useLocation();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/Courses${search}`);
      setCourses(data);
      setIsLoading(false);
    };
    loadCourses();
  }, [search]);

  return (
    <>
      <Header
        title={TITLE}
        icon={<CourseIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mb={2}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "1.7rem" }}
                >
                  รายวิชาทั้งหมด
                </Typography>
                <CategoryFilter />
              </Grid>
            </Box>
            {isLoading ? (
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: 407 }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <Grid container spacing={1}>
                {courses.map((course) => (
                  <Grid item key={course.id} xs={12} sm={4} md={3}>
                    <CourseItem {...course} />
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Box mt={6} mb={4}>
                <Button
                  disabled
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ArrowDownIcon />}
                  style={{ borderRadius: 25 }}
                >
                  ดูเพิ่มเติม
                </Button>
              </Box>
            </Grid>
          </main>
        </div>
      </Container>
    </>
  );
}
