// @ts-nocheck
import React, { useEffect } from "react";
import { getCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import { useDispatch, useSelector } from "react-redux";
import {
  useMediaQuery,
  Typography,
  Badge,
  Grid,
  CircularProgress,
  Box,
} from "@material-ui/core";
import {
  createStyles,
  Theme,
  withStyles,
  useTheme,
} from "@material-ui/core/styles";

import * as actions from "../actions";
import SupportItem from "./SupportItem";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -18,
      top: 23,
      padding: "0 4px",
    },
  })
)(Badge);

export default function SupportList() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const token = getCookie("token");
  const userId = parseJwt(token).unique_name;
  const { isLoading, items: supports } = useSelector((state) => state.support);
  const mySupportList = supports.filter((support) => {
    return support.userId === userId;
  });

  useEffect(() => {
    const action = actions.loadSupports();
    dispatch(action);
  }, [dispatch]);

  const UNREAD_NOTIFICATION_COUNT = mySupportList.filter((support: any) => {
    return support.ReplyMessage !== null && support.IsAcknowledged === false;
  }).length;

  function renderSupportList() {
    if (isLoading) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 307 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      );
    } else if (mySupportList.length === 0) {
      return (
        <Grid container direction="row" justify="center" alignItems="center">
          <Box my={10}>
            <Typography variant="body2" color="textSecondary">
              ไม่พบประวัติการติดต่อเจ้าหน้าที่
            </Typography>
          </Box>
        </Grid>
      );
    } else {
      return (
        <>
          {mySupportList.reverse().map((support: any) => (
            <SupportItem key={support.id} {...support} />
          ))}
        </>
      );
    }
  }

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        style={{ fontSize: "1.7rem", fontWeight: 600 }}
        align={matches ? "left" : "center"}
      >
        <StyledBadge badgeContent={UNREAD_NOTIFICATION_COUNT} color="error">
          กล่องข้อความ
        </StyledBadge>
      </Typography>
      {renderSupportList()}
    </>
  );
}
