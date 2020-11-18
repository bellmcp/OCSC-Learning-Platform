import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ItemProps } from "./components/ItemComponent/types";
import TestComponent from "./components/TestComponent";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  layout: {
    width: "100%",
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function Survey() {
  const classes = useStyles();

  const items: ItemProps[] = [
    {
      id: 1,
      question: "คุณภาพของสื่อการเรียนการสอน",
      options: ["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"],
      answer: 0,
    },
    {
      id: 2,
      question: "การจัดการเรียนการสอนเป็นไปตามประมวลรายวิชา",
      options: ["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"],
      answer: 0,
    },
    {
      id: 3,
      question: "อาจารย์ผู้สอนมีความสามารถในการถ่ายทอดความรู้",
      options: ["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"],
      answer: 0,
    },
    {
      id: 4,
      question: "อาจารย์ผู้สอนจัดเตรียมสื่อการเรียนการสอนไว้อย่างเหมาะสม",
      options: ["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"],
      answer: 0,
    },
    {
      id: 5,
      question: "ความเห็นและข้อเสนอแนะเพิ่มเติมสำหรับรายวิชานี้",
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={2}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color="initial"
              gutterBottom
              style={{ fontSize: "1.4rem", fontWeight: 600 }}
            >
              แบบประเมินรายวิชา
            </Typography>
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>
          <main className={classes.layout}>
            <TestComponent items={items} />
          </main>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
            wrap="nowrap"
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ChevronRightIcon />}
              >
                บันทึกและส่งคำตอบ
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
