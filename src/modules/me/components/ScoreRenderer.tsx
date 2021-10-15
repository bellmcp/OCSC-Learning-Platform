//@ts-nocheck
import * as React from 'react';
import { get } from 'lodash';
import { Typography, Grid, Container } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import ScoreTableRow from './ScoreTableRow';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Sarabun"', 'sans-serif'].join(','),
    caption: {
      fontFamily: 'Prompt', // Change a specific variant
    },
  },
  palette: {
    primary: {
      main: '#414042',
    },
    secondary: {
      main: '#EFAA1F',
    },
  },
});

export default class ScoreRenderer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    const tableData = [
      {
        title: 'หมวดที่ 1: ปลูกฝังปรัชญาการเป็นข้าราชการที่ดี',
        isHeader: true,
      },
      {
        title: 'ชุดวิชาที่ 1: การเป็นข้าราชการ',
        value: this.props.s1,
      },
      {
        title: 'ชุดวิชาที่ 2: การเรียนรู้ตามรอยพระยุคลบาท',
        value: this.props.s2,
      },
      {
        title: 'หมวดที่ 2: ระบบราชการและการบริหารภาครัฐแนวใหม่',
      },
      {
        title: 'ชุดวิชาที่ 1: ระบบราชการไทย',
        value: this.props.s3,
      },
      {
        title: 'ชุดวิชาที่ 2: การบริหารงานภาครัฐแนวใหม่',
        value: this.props.s4,
      },
      {
        title: 'ชุดวิชาที่ 3: การบริหารกิจการบ้านเมืองที่ดี',
        value: this.props.s5,
      },
      {
        title: 'หมวดที่ 3: ความรู้พื้นฐานสำหรับข้าราชการ',
      },
      {
        title: 'ชุดวิชาที่ 1: วินัยและจรรยาข้าราชการ',
        value: this.props.s6,
      },
      {
        title: 'ชุดวิชาที่ 2: ระเบียบแบบแผนของทางราชการ',
        value: this.props.s7,
      },
      {
        title: 'ชุดวิชาที่ 3: กฎหมายพื้นฐานสำหรับข้าราชการ',
        value: this.props.s8,
      },
      {
        title: 'หมวดที่ 4: เสริมสร้างสมรรถนะหลักและทักษะที่จำเป็น',
      },
      {
        title: 'ชุดวิชาที่ 1: การพัฒนาการคิด',
        value: this.props.s9,
      },
      {
        title: 'ชุดวิชาที่ 2: การสื่อสารที่มีประสิทธิภาพ',
        value: this.props.s10,
      },
      {
        title: 'ชุดวิชาที่ 3: มนุษยสัมพันธ์ในการทำงาน',
        value: this.props.s11,
      },
      {
        title: 'ชุดวิชาที่ 4: สมรรถนะหลักสำหรับข้าราชการพลเรือน',
        value: this.props.s12,
      },
      {
        title: 'ชุดวิชาที่ 5: การวางแผนปฏิบัติงานโครงการ และการดำเนินการตามแผน',
        value: this.props.s13,
      },
    ];

    const getTotalItem = () => {
      let sum = 0;
      for (let i = 0; i <= 13; i++) {
        sum += parseInt(get(this.props, `s${i}`, 0));
      }
      return sum;
    };

    const getPassStatus = () => {
      if (this.props.pass) return <span style={{ color: 'green' }}>ผ่าน</span>;
      else return <span style={{ color: 'red' }}>ไม่ผ่าน</span>;
    };

    return (
      <ThemeProvider theme={theme}>
        <Container
          style={{
            width: '210mm',
            minHeight: '297mm',
            display: 'flex',
            background: '#fff',
          }}
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid
              item
              style={{ display: 'flex', width: '97%' }}
              direction="column"
            >
              <Typography
                variant="h5"
                color="textPrimary"
                align="center"
                style={{ fontSize: 15, marginTop: 50, marginBottom: 10 }}
              >
                <b>
                  ผลการเรียนรู้ด้วยตนเอง หลักสูตรฝึกอบรมข้าราชการบรรจุใหม่
                  (e-Learning)
                </b>
              </Typography>
              <hr
                style={{
                  border: 'none',
                  height: 1,
                  width: '100%',
                  color: '#BCBEC0',
                  backgroundColor: '#BCBEC0',
                  margin: '5px 0',
                }}
              />
              <Grid container justify="space-between">
                <Typography
                  variant="h5"
                  color="textPrimary"
                  align="left"
                  style={{ fontSize: 13, marginTop: 10, marginBottom: 10 }}
                >
                  <b style={{ marginRight: 20 }}>ชื่อ - สกุล</b> :{' '}
                  {this.props.title}
                  {this.props.firstName} {this.props.lastName}
                </Typography>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  align="left"
                  style={{ fontSize: 13, marginTop: 10, marginBottom: 10 }}
                >
                  <b>เลขประจำตัวประชาชน</b> : {this.props.id}
                </Typography>
              </Grid>
              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginBottom: 10 }}
              >
                <b style={{ marginRight: 25 }}>ตำแหน่ง</b> :{' '}
                {this.props.jobTitle} {this.props.jobLevel}
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginBottom: 10 }}
              >
                <b style={{ marginRight: 18 }}>หน่วยงาน</b> :{' '}
                {this.props.department} {this.props.ministry}
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                align="right"
                style={{ fontSize: 13, marginBottom: 10 }}
              >
                <b>วันที่จบหลักสูตร</b> :{' '}
                {new Date(this.props.date).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
              <hr
                style={{
                  border: 'none',
                  height: 1,
                  width: '100%',
                  color: '#BCBEC0',
                  backgroundColor: '#BCBEC0',
                  margin: '10px 0 20px',
                }}
              />
              <table
                style={{
                  border: '1px solid #000',
                  fontFamily: `'Sarabun', 'sans-serif'`,
                  fontSize: 13,
                  textAlign: 'center',
                  borderSpacing: 0,
                }}
              >
                {tableData.map((item: any) => (
                  <ScoreTableRow {...item} />
                ))}
                <tr>
                  <td
                    style={{
                      padding: 6,
                      borderBottom: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    -รวม-
                  </td>
                  <td
                    style={{
                      borderBottom: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    {getTotalItem()}
                  </td>
                  <td
                    style={{
                      borderBottom: '1px solid #000',
                    }}
                  ></td>
                  <td
                    style={{
                      borderBottom: '1px solid #000',
                    }}
                  ></td>
                  <td
                    style={{
                      borderBottom: '1px solid #000',
                    }}
                  ></td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style={{ padding: 6, borderRight: '1px solid #000' }}
                  >
                    สรุปผลการเรียนรู้
                  </td>
                  <td colspan="2">{getPassStatus()}</td>
                </tr>
              </table>
              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginTop: 20, marginBottom: 5 }}
              >
                <b>ผู้บันทึกคะแนน</b> : สำนักงาน ก.พ.
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginTop: 5 }}
              >
                * หมายเหตุ ​: คะแนน Post-test ที่ผู้เรียนทำได้ในแต่ละวิชา
                จะต้องไม่ต่ำกว่า 60% ของคะแนนเต็มในวิชานั้น
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
