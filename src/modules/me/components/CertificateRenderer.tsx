//@ts-nocheck
import * as React from "react";
import DayJS from "react-dayjs";
import { Typography, Grid, Paper, Container } from "@material-ui/core";

import image from "assets/images/logo.png";
import signature from "assets/images/signature.svg";
import garuda from "assets/images/garuda.svg";

export default class CertificateRenderer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Container maxWidth="md">
        <Paper elevation={0} style={{ padding: "50px 0" }}>
          <Grid
            container
            spacing={6}
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
            wrap="nowrap"
          >
            <Grid item style={{ display: "flex" }} direction="column">
              <img
                alt="Garuda"
                src={garuda}
                style={{
                  width: 100,
                  height: "auto",
                  alignSelf: "center",
                  marginBottom: 16,
                }}
              />
              <img
                alt="OCSC Logo"
                src={image}
                style={{ width: 200, height: "auto", alignSelf: "center" }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                color="textPrimary"
                align="center"
                style={{ fontWeight: 600 }}
              >
                สำนักงานคณะกรรมการข้าราชการพลเรือน
              </Typography>
              <Typography variant="h6" color="textPrimary" align="center">
                ขอมอบประกาศนียบัตรฉบับนี้ให้เพื่อแสดงว่า
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                color="secondary"
                align="center"
                style={{ fontWeight: 600 }}
              >
                {this.props.title}
                {this.props.firstName} {this.props.lastName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textPrimary" align="center">
                ได้ผ่านการพัฒนาทางไกลด้วยระบบอิเล็กทรอนิกส์
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="textPrimary" align="center">
                วิชา {this.props.courseName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textPrimary" align="center">
                {"["}รวมระยะเวลาทั้งสิ้น{" "}
                {this.props.hour ? this.props.hour : "0"} ชั่วโมง{"]"}
              </Typography>
              <Typography variant="body1" color="textPrimary" align="center">
                ให้ไว้ ณ วันที่ <DayJS format="D">{this.props.endDate}</DayJS>{" "}
                เดือน{" "}
                {new Date(this.props.endDate).toLocaleDateString("th-TH", {
                  month: "long",
                })}{" "}
                พ.ศ.{" "}
                <DayJS format="YYYY" add={{ years: 543 }}>
                  {this.props.endDate}
                </DayJS>
              </Typography>
            </Grid>
            <Grid item>
              <img
                alt="Signature"
                src={signature}
                style={{ width: 180, height: "auto", marginLeft: 20 }}
              />
              <Typography variant="body2" color="textPrimary" align="center">
                (หน่อมหลวงพัชรภากร เทวกุล)
              </Typography>
              <Typography variant="body2" color="textPrimary" align="center">
                เลขาธิการคณะกรรมการข้าราชการพลเรือน
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}
