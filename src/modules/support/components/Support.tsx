import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  Grid,
  TextField,
  CardContent,
  Card,
  Box,
  Divider,
  CardActions,
  Button,
  Badge,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import {
  Send as SendIcon,
  Check as CheckIcon,
  ChatBubbleOutlineOutlined as ChatBubbleIcon,
  ModeComment as ModeCommentIcon,
  AttachFile as AttachmentIcon,
  Help as HelpIcon,
} from "@material-ui/icons";
import Header from "modules/ui/components/Header";

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
        width: "calc(100% - 20px)",
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

const TITLE = "ช่วยเหลือ";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function Support() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    alert(
      `RESULT: ${JSON.stringify(
        data
      )}\nTIMESTAMP: {"CreateDate": ${moment().format("DD-MM-YYYY hh:mm:ss")}}`
    );
  };

  const onRead = () => {
    alert(`{"Id": 00002, "IsAcknowledged": true}`);
  };

  return (
    <>
      <Header
        title={TITLE}
        icon={<HelpIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={HERO_IMAGE_URL}
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
                <form
                  className={classes.root}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    name="Subject"
                    inputRef={register({ required: true })}
                    helperText={errors.Subject && "กรุณากรอกปัญหาที่พบ"}
                    error={!!errors.Subject}
                    id="Subject"
                    label="ปัญหาที่พบ"
                    placeholder="เช่น ลงทะเบียนเรียนไม่ได้"
                    required
                    multiline
                  />
                  <TextField
                    name="Message"
                    inputRef={register}
                    id="Message"
                    label="รายละเอียด (ถ้ามี)"
                    multiline
                  />
                  <TextField
                    name="Contact"
                    inputRef={register({ required: true })}
                    helperText={
                      errors.Contact
                        ? "กรุณากรอกช่องทางติดต่อกลับ"
                        : "เบอร์โทรศัพท์ หรือ อีเมล และเวลาที่สะดวกติดต่อกลับ (ถ้ามี)"
                    }
                    error={!!errors.Contact}
                    id="Contact"
                    label="ช่องทางติดต่อกลับ"
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
                        name="AttachFile"
                        id="AttachFile"
                        type="file"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
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
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          gutterBottom
                        >
                          ลงทะเบียนเรียน COURSE01 ไม่ได้ครับ
                          เนื่องจากเลยระยะเวลาที่กำหนดแล้ว
                        </Typography>
                        <Typography variant="caption" component="h2">
                          <em>7 พฤศจิกายน 21:05 น.</em>
                          <AttachmentIcon
                            style={{
                              fontSize: 14,
                              marginLeft: "10px",
                              marginRight: "5px",
                            }}
                          />
                          มีไฟล์แนบ
                        </Typography>
                      </Box>
                      <Divider />
                      <Box m={3}>
                        <Grid
                          container
                          alignItems="center"
                          justify="flex-start"
                        >
                          {/* <Badge color="error" variant="dot"> */}
                          <ModeCommentIcon />
                          {/* </Badge> */}
                          <Typography
                            variant="h6"
                            component="h1"
                            gutterBottom
                            style={{ marginLeft: "10px" }}
                          >
                            ข้อความตอบกลับ
                          </Typography>
                        </Grid>
                        <Typography
                          variant="body2"
                          component="p"
                          color="textSecondary"
                          gutterBottom
                        >
                          ขออภัยสำหรับความไม่สะดวกค่ะ
                          เจ้าหน้าที่ได้ดำเนินการลงทะเบียนให้เรียบร้อยแล้วค่ะ
                        </Typography>
                        <Typography variant="caption" component="h2">
                          <em>8 พฤศจิกายน 10:24 น.</em>
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={onRead}
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
                        <Typography
                          variant="body2"
                          component="p"
                          color="textSecondary"
                          gutterBottom
                        >
                          รายวิชาการงบประมาณภาครัฐ วิดีโอกระตุกมากครับ
                          รบกวนแก้ไขด้วยครับ
                        </Typography>
                        <Typography variant="caption" component="h2">
                          <em>9 พฤศจิกายน 12:59 น.</em>
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
    </>
  );
}
