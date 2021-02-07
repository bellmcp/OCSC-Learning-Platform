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
  Button,
  Hidden,
  Divider,
} from "@material-ui/core";

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
      width: "150px",
      borderRadius: "4 0 0 0",
      // [theme.breakpoints.down("xs")]: {
      //   display: "none",
      // },
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

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
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ lineHeight: "1.1" }}
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <Typography variant="body2" component="p" gutterBottom>
                    {code}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                  >
                    {`รอบที่ ${registrations[keyId]?.courseRoundId} (${registrations[keyId]?.courseStart} ถึง ${registrations[keyId]?.courseEnd})`}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginRight: 16 }}
                  >
                    {`ลงทะเบียนเมื่อ: ${registrations[keyId]?.registrationDate}`}
                  </Typography>
                </Grid>
                {!matches && (
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      เข้าเรียน
                    </Button>
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
            <Button variant="text" color="primary" fullWidth>
              เข้าเรียน
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
}
