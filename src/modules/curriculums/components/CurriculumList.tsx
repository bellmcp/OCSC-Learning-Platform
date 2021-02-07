// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  useMediaQuery,
  Typography,
  Box,
  Button,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardArrowDownRounded as ArrowDownIcon } from "@material-ui/icons";
import CurriculumItem from "./CurriculumItem";
import { CollectionsBookmark as CurriculumIcon } from "@material-ui/icons";

import * as curriculumsActions from "../actions";
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

const TITLE = "หลักสูตร";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function CurriculumList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { isLoading, items: curriculums } = useSelector(
    (state) => state.curriculums
  );

  useEffect(() => {
    const curriculums_action = curriculumsActions.loadCurriculums();
    dispatch(curriculums_action);
  }, [dispatch]);

  return (
    <>
      <Header
        title={TITLE}
        icon={
          <CurriculumIcon fontSize="large" style={{ marginRight: "24px" }} />
        }
        imageUrl={HERO_IMAGE_URL}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mb={2}>
              <Grid
                container
                direction={matches ? "row" : "column"}
                justify={matches ? "space-between" : "center"}
                alignItems={matches ? "flex-end" : "center"}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "1.7rem", fontWeight: 600 }}
                >
                  หลักสูตรทั้งหมด
                </Typography>
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
                {curriculums.map((curriculum) => (
                  <Grid item key={curriculum.id} xs={12} sm={4} md={3}>
                    <CurriculumItem {...curriculum} />
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
