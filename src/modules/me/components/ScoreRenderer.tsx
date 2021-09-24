//@ts-nocheck
import * as React from 'react';
import { Typography, Grid, Container } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
    return (
      <ThemeProvider theme={theme}>
        <Container
          style={{
            width: '210mm',
            minHeight: '297mm',
            border: `1px solid lightgrey`,
            display: 'flex',
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
              style={{ display: 'flex', width: '100%' }}
              direction="column"
            >
              <Typography
                variant="h5"
                color="textPrimary"
                align="center"
                style={{ fontSize: 18, marginBottom: 5 }}
              >
                <b>
                  คะแนนการเรียนรู้ด้วยตนเองหลักสูตรฝึกอบรมข้าราชการบรรจุใหม่
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
                  margin: '10px 0',
                }}
              />
              <Grid container justify="space-between">
                <Typography
                  variant="h5"
                  color="textPrimary"
                  align="left"
                  style={{ fontSize: 13, marginBottom: 5 }}
                >
                  <b>ชื่อ - สกุล :</b> {this.props.title}
                  {this.props.firstName} {this.props.lastName}
                </Typography>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  align="left"
                  style={{ fontSize: 13, marginBottom: 5 }}
                >
                  <b>เลขประจำตัวประชาชน :</b> {this.props.citizenId}
                </Typography>
              </Grid>

              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginBottom: 5 }}
              >
                <b>ตำแหน่ง :</b> {this.props.jobTitle} {this.props.jobLevel}
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginBottom: 5 }}
              >
                <b>หน่วยงาน :</b> {this.props.division} {this.props.department}
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                align="right"
                style={{ fontSize: 13, marginBottom: 5 }}
              >
                <b>วันที่สำเร็จการศึกษาหลักสูตร</b>{' '}
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
                  margin: '10px 0',
                }}
              />
              <table
                style={{
                  border: '1px solid #000',
                  fontFamily: `'Sarabun', 'sans-serif'`,
                  fontSize: 13,
                  textAlign: 'left',
                  padding: 4,
                }}
              >
                <tr style={{ fontWeight: 'bold' }}>
                  <td>หมวดที่ 1: ปลูกฝังปรัชญาการเป็นข้าราชการที่ดี</td>
                  <td>จำนวนข้อ</td>
                  <td>60%</td>
                  <td>คะแนน Pre-test</td>
                  <td>คะแนน Post-test</td>
                </tr>
                <tr>
                  <td>ชุดวิชาที่ 1: การเป็นข้าราชการ</td>
                  <td>{this.props.s1}</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>ชุดวิชาที่ 2: การเรียนรู้ตามรอยพระยุคลบาท</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
                <tr>
                  <td>
                    <b>หมวดที่ 2: ระบบราชการและการบริหารภาครัฐแนวใหม่</b>
                  </td>
                </tr>
                <tr>
                  <td>ชุดวิชาที่ 1: ระบบราชการไทย</td>
                </tr>
                <tr>
                  <td>ชุดวิชาที่ 2: การบริหารงานภาครัฐแนวใหม่</td>
                </tr>
                <tr>
                  <td>ชุดวิชาที่ 3: การบริหารกิจการบ้านเมืองที่ดี</td>
                </tr>
              </table>
              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginTop: 10, marginBottom: 5 }}
              >
                ผู้บันทึกคะแนน
                ........................................................................................................
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                align="left"
                style={{ fontSize: 13, marginTop: 5 }}
              >
                * หมายเหตุ ​: คะแนน Post-test
                ที่ผู้รับการฝึกอบรมทำได้ในแต่ละชุดวิชา จำต้องไม่ต่ำกว่า 60%
                ของคะแนนเต็มในแต่ละชุดวิชานั้น ๆ
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
