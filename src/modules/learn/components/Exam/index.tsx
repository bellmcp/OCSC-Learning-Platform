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

export default function Exam() {
  const classes = useStyles();

  const items: ItemProps[] = [
    {
      id: 1,
      question: "ศาสนาแบบ “เทวนิยม” หมายถึงศาสนาที่มีลักษณ์แบบใด",
      options: [
        "ให้ความสำคัญแก่เทพยดา",
        "เชื่อในอำนาจเทพเจ้าสูงสุด",
        "เชื่อในอำนาจไสยศาสตร์ ",
        "เชื่อในศักยภาพของมนุษย์",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "“วันอัฏฐมีบูชา” มีความสำคัญอย่างไร",
      options: [
        "เป็นวันที่พระพุทธเจ้าเสด็จปรินิพพาน",
        "เป็นวันที่พระพุทธเจ้าแสดงธรรมให้แก่พระบิดา",
        "เป็นวันถวายพระเพลิงพระพุทธเจ้า",
        "เป็นวันแรม 8 ค่ำ เดือน 8",
      ],
      answer: 2,
    },
    {
      id: 3,
      question: "บุคคลใดที่ได้รับการแสดงปฐมเทศนาจากพระพุทธเจ้า",
      options: [
        "ปัญจวัคคีย์ทั้ง 5",
        "พระอุทกดาบส พระอาฬารดาบส",
        "พระเจ้าพิมพิสาร องคุลีมาลย์",
        "พระอสิตดาบส พระโมคคัลลานะ",
      ],
      answer: 0,
    },
    {
      id: 4,
      question: "ข้อใดไม่ใช่หลักคำสอนของคริสต์ศานาในคัมภีร์ไบเบิล",
      options: [
        "ห้ามรับประทานสัตว์ที่ไม่ได้เชือด",
        "อย่าฆ่ามนุษย์",
        "อย่าลักทรัพย์ผู้อื่น",
        "อย่ากล่าวเท็จต่อเพื่อนบ้าน",
      ],
      answer: 0,
    },
    {
      id: 5,
      question: "ข้อห้ามของศาสนาอิสลามคือข้อใด",
      options: [
        "การถือศีลอด ",
        "การเล่นการพนันทุกชนิด",
        "ศรัทธาต่อมลาอีกกะห์ (เทวฑูต)",
        "ศรัทธาในพระเจ้าคือพระอัลเลาะฮ์",
        "ถูกทุกข้อ",
      ],
      answer: 1,
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
              แบบทดสอบหลังเรียน
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
