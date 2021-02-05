import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardMedia,
  Grid,
  Box,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      height: "100px",
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
      width: "150px",
      borderRadius: "4 0 0 0",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

export default function RegistrationItem({
  id,
  keyId,
  thumbnail,
  name,
  code,
  registrations,
}: any) {
  const classes = useStyles();

  return (
    <Card>
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
              >
                <Grid item>
                  <Typography variant="h6" component="h2">
                    {name}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    color="textSecondary"
                    gutterBottom
                  >
                    {code}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                  >
                    {`รอบที่ ${registrations[keyId]?.courseRoundId} (${registrations[keyId]?.courseStart} ถึง ${registrations[keyId]?.courseEnd})`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginRight: 16 }}
                  >
                    {`ลงทะเบียนเมื่อ: ${registrations[keyId]?.registrationDate}`}
                  </Typography>
                  <Button variant="outlined" color="primary">
                    เข้าเรียน
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </div>
      </div>
    </Card>
  );
}
