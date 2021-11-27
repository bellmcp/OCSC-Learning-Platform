//@ts-nocheck
import * as React from 'react';
import DayJS from 'react-dayjs';
import { Typography, Grid, Container } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import getSignature from 'utils/getSignature';

import logo from 'assets/images/cert-logo.png';
import garuda from 'assets/images/cert-garuda.png';
import background from 'assets/images/cert-background.svg';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Athiti"', 'sans-serif'].join(','),
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

export default class CertificateRenderer extends React.PureComponent<Props> {
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
            background: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            display: 'flex',
          }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid
              item
              style={{ display: 'flex', padding: '0 50px' }}
              direction="column"
            >
              <img
                alt="Garuda"
                src={garuda}
                style={{
                  width: 160,
                  height: 'auto',
                  alignSelf: 'center',
                  marginBottom: 25,
                }}
              />
              <img
                alt="OCSC Logo"
                src={logo}
                style={{
                  width: 180,
                  height: 'auto',
                  alignSelf: 'center',
                  marginBottom: 25,
                }}
              />
              <Typography
                variant="h5"
                color="textPrimary"
                align="center"
                style={{
                  fontSize: 30,
                  marginBottom: this.props.text2 ? 10 : 5,
                  lineHeight: '1.1',
                }}
              >
                {this.props.text1}
                {this.props.text2 && <br />}
                <span style={{ fontSize: 26 }}>{this.props.text2}</span>
              </Typography>
              <Typography
                variant="h6"
                color="textPrimary"
                align="center"
                style={{ fontSize: 22, marginBottom: 6 }}
              >
                {this.props.text3}
              </Typography>
              <hr
                style={{
                  border: 'none',
                  height: 1,
                  width: 470,
                  color: '#BCBEC0',
                  backgroundColor: '#BCBEC0',
                  marginBottom: 50,
                }}
              />

              {/* NAME */}
              <Typography
                variant="caption"
                color="secondary"
                align="center"
                style={{
                  fontSize: 37,
                  fontWeight: 500,
                  marginBottom: 40,
                  lineHeight: 1,
                }}
              >
                {this.props.title}
                {this.props.firstName} {this.props.lastName}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="center"
                style={{ fontSize: 20, marginBottom: 38 }}
              >
                {this.props.text4}
              </Typography>
              <Typography
                variant="h6"
                color="textPrimary"
                align="center"
                style={{ fontSize: 28, marginBottom: 38, lineHeight: '1.2' }}
              >
                {this.props.isCurriculum ? 'หลักสูตร' : 'วิชา'}{' '}
                {this.props.contentName}
              </Typography>

              {/* LENGTH AND DATE */}
              <Typography
                variant="body1"
                color="textPrimary"
                align="center"
                style={{ fontSize: 20 }}
              >
                {'('}รวมระยะเวลาทั้งสิ้น{' '}
                {this.props.hour ? this.props.hour : '-'} ชั่วโมง{')'}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                align="center"
                style={{ fontSize: 20, marginBottom: 25 }}
              >
                ให้ไว้ ณ วันที่ <DayJS format="D">{this.props.endDate}</DayJS>{' '}
                {new Date(this.props.endDate).toLocaleDateString('th-TH', {
                  month: 'long',
                })}{' '}
                พ.ศ.{' '}
                <DayJS format="YYYY" add={{ years: 543 }}>
                  {this.props.endDate}
                </DayJS>
              </Typography>

              {/* SIGNATURE */}
              <img
                alt="Signature"
                src={getSignature(this.props.signature)}
                style={{
                  width: 180,
                  height: 'auto',
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
              <Typography
                variant="body2"
                color="textPrimary"
                align="center"
                style={{ fontSize: 15, marginBottom: 0, lineHeight: '1.2' }}
              >
                {this.props.signer}
                <br />
                {this.props.position1}
                {this.props.position2 && <br />}
                {this.props.position2}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
