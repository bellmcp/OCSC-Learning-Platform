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
  Container,
  Grid,
} from "@material-ui/core";
import CurriculumItem from "./CurriculumItem";
import { CollectionsBookmark as CurriculumIcon } from "@material-ui/icons";

import * as curriculumsActions from "../actions";
import Header from "modules/ui/components/Header";
import Loading from "modules/ui/components/Loading";

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

export default function CurriculumList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { isLoading, items: curriculums } = useSelector(
    (state) => state.curriculums
  );

  useEffect(() => {
    const curriculums_action = curriculumsActions.loadCurriculums("");
    dispatch(curriculums_action);
  }, [dispatch]);

  return (
    <>
      <Header
        title="หลักสูตร"
        icon={
          <CurriculumIcon fontSize="large" style={{ marginRight: "24px" }} />
        }
      />
      <Container>
        <div className={classes.main}>
          <div className={classes.content}>
            <Box mt={3} mb={2}>
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
              <Loading height={407} />
            ) : (
              <Grid container spacing={1}>
                {curriculums.map((curriculum) => (
                  <Grid item key={curriculum.id} xs={12} sm={4} md={3}>
                    <CurriculumItem {...curriculum} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
