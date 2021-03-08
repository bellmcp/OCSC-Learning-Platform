//@ts-nocheck
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";
import {
  MoreHoriz as QuestionIcon,
  Send as SendIcon,
} from "@material-ui/icons";

import * as learnActions from "modules/learn/actions";
import EvaluationItem from "./EvaluationItem";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  options: {
    padding: theme.spacing(1.5),
  },
  amber: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
  },
}));

export default function EvaluationList({ activeContentView }: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const evaluationId = activeContentView.evaluationId;
  const {
    isLoading: isEvaluationLoading,
    evaluation,
    evaluationItems,
  } = useSelector((state) => state.learn);

  useEffect(() => {
    const load_evaluation_action = learnActions.loadEvaluation(evaluationId);
    dispatch(load_evaluation_action);
  }, [dispatch, evaluationId]);

  useEffect(() => {
    const load_evaluation_items_action = learnActions.loadEvaluationItems(
      evaluationId
    );
    dispatch(load_evaluation_items_action);
  }, [dispatch, evaluationId]);

  console.log(evaluationItems);

  return (
    <>
      <Typography variant="body1" color="textSecondary">
        <b>แบบประเมิน</b> {evaluation?.name}
        <br />
        <b>คำชี้แจง</b> {evaluation?.instruction}
        <br />
      </Typography>
      {isEvaluationLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 380 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <>
          {evaluationItems.map((evaluationItem) => (
            <Paper
              key={evaluationItem.id}
              className={classes.paper}
              elevation={1}
            >
              <EvaluationItem {...evaluationItem} />
            </Paper>
          ))}
          <Paper className={classes.paper} elevation={1}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item>
                <Avatar className={classes.amber}>
                  <QuestionIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  ข้อคิดเห็น และ ข้อเสนอแนะ
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Box mt={3} mb={2}>
              <TextField
                label="แสดงความคิดเห็น"
                placeholder={evaluation?.opinion}
                variant="outlined"
                color="secondary"
                fullWidth
                multiline
                rows={6}
              />
            </Box>
          </Paper>
          <Box my={6}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              startIcon={<SendIcon />}
              fullWidth
              onClick={() => {
                alert("Submitted");
              }}
            >
              ส่งแบบประเมิน
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
