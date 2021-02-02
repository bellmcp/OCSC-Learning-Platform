import React from "react";
import {
  Grid,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { amber } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      width: "100%",
      height: "100%",
      backgroundImage:
        "url('https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    container: {
      padding: theme.spacing(16, 12),
    },
    text: {
      color: theme.palette.common.white,
      textShadow: "0px 3px 3px rgba(0, 0, 0, 0.4)",
    },
    amber: {
      color: amber[500],
      textShadow: "0px 3px 3px rgba(0, 0, 0, 0.4)",
    },
  })
);

export default function Aside({ title }: any) {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Toolbar />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        className={classes.container}
      >
        <Grid item>
          <Typography
            component="h1"
            variant="h3"
            align="left"
            gutterBottom
            className={classes.text}
            style={{ marginBottom: 36 }}
          >
            {title ? title : "ยินดีต้อนรับ"}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            paragraph
            align="left"
            gutterBottom
            className={classes.text}
          >
            เข้าสู่ระบบเพื่อใช้งาน
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon className={classes.amber} />
              </ListItemIcon>
              <ListItemText primary="ลงทะเบียนเรียน" className={classes.text} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon className={classes.amber} />
              </ListItemIcon>
              <ListItemText primary="เข้าเรียน" className={classes.text} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon className={classes.amber} />
              </ListItemIcon>
              <ListItemText
                primary="ขอความช่วยเหลือ"
                className={classes.text}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
