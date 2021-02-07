// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Badge, Grid, CircularProgress } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

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
  const dispatch = useDispatch();
  const { isLoading, items: supports } = useSelector((state) => state.support);

  useEffect(() => {
    const action = actions.loadSupports();
    dispatch(action);
  }, [dispatch]);

  const UNREAD_NOTIFICATION_COUNT = supports.filter((support: any) => {
    return support.ReplyMessage !== null && support.IsAcknowledged === false;
  }).length;

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        style={{ fontSize: "1.7rem", fontWeight: 600 }}
      >
        <StyledBadge badgeContent={UNREAD_NOTIFICATION_COUNT} color="error">
          กล่องข้อความ
        </StyledBadge>
      </Typography>
      {isLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: 307 }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <>
          {supports
            .slice(0)
            .reverse()
            .map((support: any) => (
              <SupportItem key={support.id} {...support} />
            ))}
        </>
      )}
    </>
  );
}
