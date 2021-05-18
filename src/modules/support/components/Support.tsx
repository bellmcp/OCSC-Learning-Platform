import React from "react";
import { useMediaQuery, Container, Grid, Divider } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { Help as HelpIcon } from "@material-ui/icons";
import Header from "modules/ui/components/Header";
import SupportForm from "./SupportForm";
import SupportList from "./SupportList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
    },
  })
);

export default function Support() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Header
        title="ช่วยเหลือ"
        icon={<HelpIcon fontSize="large" style={{ marginRight: "24px" }} />}
      />
      <Container>
        <div className={classes.main}>
          <div className={classes.content}>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              spacing={4}
            >
              <Grid item xs={12} md={6}>
                <SupportForm />
              </Grid>
              {!matches && (
                <Grid item xs={12} md={6}>
                  <Divider />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <SupportList />
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </>
  );
}
