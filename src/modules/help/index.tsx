import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import NavigationBar from "../root/components/NavigationBar";
import Header from "../root/components/Header";
import Footer from "../root/components/Footer";
import HelpIcon from "@material-ui/icons/Help";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import Box from "@material-ui/core/Box/Box";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import SendIcon from "@material-ui/icons/Send";
import Badge from "@material-ui/core/Badge/Badge";
import CheckIcon from "@material-ui/icons/Check";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ModeCommentIcon from "@material-ui/icons/ModeComment";

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

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -18,
      top: 23,
      padding: "0 4px",
    },
  })
)(Badge);

export default function Help() {
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
              spacing={10}
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
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<SendIcon />}
                    style={{ marginTop: 34 }}
                  >
                    ส่ง
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "1.7rem" }}
                >
                  <StyledBadge badgeContent={1} color="error">
                    กล่องข้อความ
                  </StyledBadge>
                </Typography>
                <Box my={3}>
                  <Card elevation={4}>
                    <CardContent>
                      <Box m={3}>
                        <Typography
                          variant="caption"
                          color="secondary"
                          component="p"
                          style={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          เลขที่อ้างอิง: 00002
                        </Typography>
                        <Grid container alignItems="center">
                          <ChatBubbleIcon style={{ marginRight: 10 }} />
                          <Typography variant="h6" component="h1" gutterBottom>
                            ลงทะเบียนเรียนไม่ได้
                          </Typography>
                        </Grid>
                        <Typography variant="body2" component="p" gutterBottom>
                          ลงทะเบียนเรียนวิชา OCSC00001 ไม่ได้ครับ
                          เนื่องจากเลยระยะเวลาที่กำหนดแล้ว
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          component="h2"
                        >
                          7 พฤศจิกายน 21:05 น.
                        </Typography>
                      </Box>
                      <Divider />
                      <Box m={3}>
                        <Grid container alignItems="center" justify="flex-end">
                          <ModeCommentIcon style={{ marginRight: 10 }} />
                          <Typography
                            variant="h6"
                            component="h1"
                            align="right"
                            gutterBottom
                          >
                            ข้อความตอบกลับ
                          </Typography>
                        </Grid>
                        <Typography
                          variant="body2"
                          component="p"
                          align="right"
                          gutterBottom
                        >
                          ขออภัยสำหรับความไม่สะดวกค่ะ
                          เจ้าหน้าที่ได้ดำเนินการลงทะเบียนรายวิชา OCSC00001
                          การประชาสัมพันธ์ผ่านวิทยุและโทรทัศน์ ให้คุณ วุฒิภัทร
                          เรียบร้อยแล้วค่ะ
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          align="right"
                          component="h2"
                        >
                          8 พฤศจิกายน 10:24 น.
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<CheckIcon />}
                        fullWidth
                      >
                        ทำเครื่องหมายว่าอ่านแล้ว
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
                <Box my={3}>
                  <Card elevation={2}>
                    <CardContent>
                      <Box m={3}>
                        <Typography
                          variant="caption"
                          color="secondary"
                          component="p"
                          style={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          เลขที่อ้างอิง: 00003
                        </Typography>
                        <Grid container alignItems="center">
                          <ChatBubbleIcon style={{ marginRight: 10 }} />
                          <Typography variant="h6" component="h1" gutterBottom>
                            วิดีโอกระตุก
                          </Typography>
                        </Grid>
                        <Typography variant="body2" component="p" gutterBottom>
                          รายวิชาการงบประมาณภาครัฐ วิดีโอกระตุกมากครับ
                          รบกวนแก้ไขด้วยครับ
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          component="h2"
                        >
                          9 พฤศจิกายน 12:59 น.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
