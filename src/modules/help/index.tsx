import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../root/components/NavigationBar";
import Header from "../root/components/Header";
import Footer from "../root/components/Footer";

import HelpIcon from "@material-ui/icons/Help";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
const heroImage = require("../../assets/images/hero.jpg");

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
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
  })
);

interface Props {
  window?: () => Window;
}

export default function Help(props: Props) {
  const classes = useStyles();
  const title = "ช่วยเหลือ";

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={2} />
      <Header
        title={title}
        icon={<HelpIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={heroImage}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              spacing={4}
            >
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "1.7rem" }}
                >
                  ติดต่อเจ้าหน้าที่
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="title"
                    label="ปัญหาที่พบ"
                    placeholder="เช่น ลงทะเบียนเรียนไม่ได้"
                    required
                    multiline
                    autoFocus
                  />
                  <TextField id="detail" label="รายละเอียด (ถ้ามี)" multiline />
                  <TextField
                    id="detail"
                    label="ช่องทางติดต่อกลับ"
                    helperText="เบอร์โทรศัพท์ หรือ อีเมล และเวลาที่สะดวกติดต่อกลับ (ถ้ามี)"
                    required
                    multiline
                  />
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: 20 }}>
                      <Typography variant="body1" color="textSecondary">
                        ไฟล์แนบ (ถ้ามี)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <input
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                      />
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "1.7rem" }}
                >
                  กล่องข้อความ
                </Typography>
              </Grid>
            </Grid>
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
