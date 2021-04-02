// @ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import DayJS from "react-dayjs";
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
  Grid,
  Box,
  Button,
  Divider,
} from "@material-ui/core";
import { Print as PrintIcon } from "@material-ui/icons/";
import { green, grey } from "@material-ui/core/colors";

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
  })
);

export default function CurriculumCertificateItem({
  id,
  curriculumid,
  curriculum,
  startdate,
  enddate,
  pass,
  note,
  title,
  firstname,
  lastname,
}: any) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const path = "/learning-platform";

  const linkToLecture = () => {
    history.push(`${path}/me/certificate/curriculum/${curriculumid}`);
  };

  return (
    <Card>
      <div
        className={classes.details}
        style={{
          borderLeft: pass
            ? `6px solid ${green[800]}`
            : `6px solid ${grey[500]}`,
        }}
      >
        <div className={classes.controls}>
          <Grid container direction="column" justify="center">
            <Box
              my={2}
              mx={3}
              flex
              style={{
                display: "flex",
              }}
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
                spacing={2}
              >
                <Grid item>
                  <Typography
                    variant="h6"
                    component="h2"
                    style={{ lineHeight: "1.1", marginBottom: 4 }}
                  >
                    {curriculum}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    หลักสูตร {curriculumid}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    color="textSecondary"
                    gutterBottom
                    style={{ marginBottom: 8, fontWeight: 600 }}
                  >
                    {pass ? (
                      <span style={{ color: green[800] }}>
                        ยินดีด้วย คุณผ่านเกณฑ์แล้ว
                      </span>
                    ) : (
                      "ไม่ผ่านเกณฑ์"
                    )}
                  </Typography>
                  {pass ? (
                    <Typography
                      variant="caption"
                      component="p"
                      color="textSecondary"
                      style={{ lineHeight: "1.2" }}
                      gutterBottom
                    >
                      <b>สำเร็จการศึกษา </b>
                      <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                        {enddate}
                      </DayJS>
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      component="p"
                      color="textSecondary"
                      style={{ lineHeight: "1.2" }}
                      gutterBottom
                    >
                      <b>หมายเหตุ </b>
                      {note}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                    style={{ lineHeight: "1.2" }}
                    gutterBottom
                  >
                    <b>ระยะเวลาเข้าเรียน </b>
                    <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                      {startdate}
                    </DayJS>{" "}
                    ถึง{" "}
                    <DayJS format="D/M/YYYY" add={{ years: 543 }}>
                      {enddate}
                    </DayJS>
                  </Typography>
                </Grid>
                {!matches && (
                  <Grid item>
                    <Button
                      disabled={!pass}
                      variant="outlined"
                      color="primary"
                      startIcon={<PrintIcon />}
                      onClick={linkToLecture}
                    >
                      พิมพ์ประกาศนียบัตร
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
            <Button
              disabled={!pass}
              variant="text"
              color="primary"
              startIcon={<PrintIcon />}
              fullWidth
              onClick={linkToLecture}
            >
              พิมพ์ประกาศนียบัตร
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
}
