// @ts-nocheck
import React from "react";
import {
  Typography,
  Box,
  Grid,
  LinearProgress,
  Button,
} from "@material-ui/core";
import { ArrowForwardIos as ArrowForwardIcon } from "@material-ui/icons";

export default function CourseRound({
  id,
  name,
  courseId,
  registrationStart,
  registrationEnd,
  registrationCondition,
  courseStart,
  courseEnd,
  maxStudents,
  numStudents,
  course,
}: any) {
  const roundInfos = [
    {
      title: "เปิดให้ลงทะเบียน",
      detail: `${registrationStart} ถึง ${registrationEnd}`,
    },
    {
      title: "เงื่อนไขการลงทะเบียน",
      detail: registrationCondition,
    },
    { title: "เข้าเรียนได้ตั้งแต่", detail: `${courseStart} ถึง ${courseEnd}` },
    { title: "จำนวนผู้เรียนที่รับได้สูงสุด", detail: `${maxStudents} คน` },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={7}>
        <Typography
          style={{
            fontSize: "1.7rem",
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
        <Box mb={3}>
          <Box display="flex" alignItems="center">
            <Box width="100%">
              <Typography variant="body2" color="primary" align="right">
                {numStudents} / {maxStudents} คน
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(numStudents / maxStudents) * 100}
                color="secondary"
              />
            </Box>
            <Box></Box>
          </Box>
        </Box>
        <Box my={3}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => alert("Register")}
          >
            ลงทะเบียนเรียน
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        {roundInfos.map((roundInfo, index) => (
          <Grid container spacing={3} key={index} alignItems="baseline">
            <Grid item xs={6}>
              <Typography variant="h6">{roundInfo.title}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <div
                  dangerouslySetInnerHTML={{
                    __html: roundInfo.detail ? roundInfo.detail : "ไม่มีข้อมูล",
                  }}
                ></div>
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
