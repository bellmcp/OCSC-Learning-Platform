// @ts-nocheck
import React from 'react';
import { getCookie } from 'utils/cookies';
import parseJwt from 'utils/parseJwt';
import { useSelector } from 'react-redux';
import { useMediaQuery, Typography, Badge, Grid, Box } from '@material-ui/core';
import {
  createStyles,
  Theme,
  withStyles,
  useTheme,
} from '@material-ui/core/styles';
import { Inbox as InboxIcon } from '@material-ui/icons';

import SupportItem from './SupportItem';
import Loading from 'modules/ui/components/Loading';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -18,
      top: 23,
      padding: '0 4px',
    },
  })
)(Badge);

export default function SupportList() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const token = getCookie('token');
  const userId = parseJwt(token).unique_name;
  const { isLoading, items: supports } = useSelector((state) => state.support);
  const mySupportList = supports.filter((support) => {
    return support.userId === userId;
  });

  const UNREAD_NOTIFICATION_COUNT = mySupportList.filter((support: any) => {
    return support.replyMessage !== null && support.isAcknowledged === false;
  }).length;

  function renderSupportList() {
    if (isLoading) {
      return <Loading height={307} />;
    } else if (mySupportList.length === 0) {
      return (
        <Grid container direction="row" justify="center" alignItems="center">
          <Box my={10}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <InboxIcon
                color="disabled"
                style={{ fontSize: 54, marginBottom: 14 }}
              />
              <Typography variant="body2" color="textSecondary">
                ไม่พบประวัติการติดต่อเจ้าหน้าที่
              </Typography>
            </Grid>
          </Box>
        </Grid>
      );
    } else {
      return (
        <>
          {mySupportList.map((support: any) => (
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
        component="h2"
        variant="h6"
        style={{ fontSize: '1.7rem', fontWeight: 600 }}
        align={matches ? 'left' : 'center'}
      >
        <StyledBadge badgeContent={UNREAD_NOTIFICATION_COUNT} color="error">
          กล่องข้อความ
        </StyledBadge>
      </Typography>
      {renderSupportList()}
    </>
  );
}
