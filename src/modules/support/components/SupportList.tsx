import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Badge, Grid, CircularProgress } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
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
  const [supports, setSupports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSupports = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/Supports`);
      setSupports(data);
      setIsLoading(false);
    };
    loadSupports();
  }, []);

  const UNREAD_NOTIFICATION_COUNT = supports.filter((support: any) => {
    return support.ReplyMessage !== null && support.IsAcknowledged === false;
  }).length;

  return (
    <>
      <Typography gutterBottom variant="h6" style={{ fontSize: "1.7rem" }}>
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
