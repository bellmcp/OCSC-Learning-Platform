import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "pure-react-carousel/dist/react-carousel.es.css";
import React from "react";
import Footer from "../root/components/Footer";
import Header from "../root/components/Header";
import NavigationBar from "../root/components/NavigationBar";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import CourseCarousel from "./components/CourseCarousel";

import { AnnouncementItemProps } from "./components/AnnouncementItem/types";
import { CourseItemProps } from "./components/CourseItem/types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

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
    carousel: {
      padding: "0 10px",
    },
    cardSmall: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMediaSmall: {
      paddingTop: "75%", // 4:3
      //paddingTop: "56.25%", // 16:9
    },
  })
);

interface Props {
  window?: () => Window;
}

export default function Home(props: Props) {
  const classes = useStyles();
  const title = "OCSC Learning Platform";
  const subtitle =
    "คอร์สเรียนออนไลน์ฟรี ที่สำนักงาน ก.พ. เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้ มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform";

  const announcement1 = require("../../assets/images/announcements/announcement1.png");
  const announcement2 = require("../../assets/images/announcements/announcement2.png");
  const announcement3 = require("../../assets/images/announcements/announcement3.png");
  const announcement4 = require("../../assets/images/announcements/announcement4.png");
  const announcements: AnnouncementItemProps[] = [
    {
      id: 1,
      image: announcement1,
      detail:
        "คอร์สเรียน OCSC ประจำเดือนตุลาคม พร้อมเปิดให้ลงทะเบียนเรียนแล้ว!",
    },
    {
      id: 2,
      image: announcement2,
      detail: "พร้อมรบ พร้อมรับ กับสถานการณ์ COVID-19",
    },
    {
      id: 3,
      image: announcement3,
      detail: "อัพเดทข่าวสารกับเพจ OCSC",
    },
    {
      id: 4,
      image: announcement4,
      detail:
        "ฉลองครบรอบ 3 ปี OCSC กับ 'มหากาพย์ อังกฤษ อัพเกรด' ที่กลับมาเปิดให้ลงทะเบียนอีกครั้ง!",
    },
  ];

  const course1 = require("../../assets/images/courses/course1.png");
  const course2 = require("../../assets/images/courses/course2.png");
  const course3 = require("../../assets/images/courses/course3.png");
  const course4 = require("../../assets/images/courses/course4.png");
  const course5 = require("../../assets/images/courses/course5.png");
  const courses: CourseItemProps[] = [
    {
      id: 1,
      title: "การประชาสัมพันธ์ผ่านวิทยุและโทรทัศน์",
      image: course1,
      genre: "ศิลปะและการพัฒนาตนเอง",
      detail:
        "รายวิชาการประชาสัมพันธ์ผ่านวิทยุและโทรทัศน์ จะเป็นการนำเสนอเนื้อหาเกี่ยวกับการประชาสัมพันธ์ผ่านสื่อวิทยุ และสื่อโทรทัศน์  โดยผู้สอนจะกล่าวถึงความรู้พื้นฐาน  ประวัติความเป็นมา ประเภทของรายการวิทยุ และโทรทัศน์  รูปแบบการประชาสัมพันธ์  วิธีการเขียนบทวิทยุ และการเขียนบทโทรทัศน์  พร้อมทั้งนำเสนอเทคนิคการผลิตสื่อประชาสัมพันธ์  นักประชาสัมพันธ์ที่ดีจะต้องรู้จักพัฒนากลยุทธ์การประชาสัมพันธ์ให้สอดคล้องกับสิ่งที่องค์กรต้องการ และเผยแพร่สื่อที่ดีเพื่อให้สื่อสามารถเข้าถึงมวลชนได้ตรงตามวัตถุประสงค์",
      availableSeat: 25,
      totalSeat: 50,
    },
    {
      id: 2,
      title: "การงบประมาณภาครัฐ",
      image: course2,
      genre: "การจัดการ",
      detail:
        "วิชาการงบประมาณภาครัฐ  เนื้อหาวิชาจะนำเสนอเกี่ยวกับกาวางแผนงบประมาณ การให้ความเห็นชอบ การนำแผนไปปฏิบัติ การบริหารแผนงบประมาณ และการติดตามประเมินผล บทเรียนทั้ง 5 ตอน จัดทำขึ้นเพื่อให้ผู้เรียนได้เข้าใจบทบาท หน้าที่ ของผู้บริหาร และผู้ปฏิบัติงานในภาครัฐในกระบวนการการงบประมาณ และสามารถนำไปปรับใช้กับหน่วยงานตนเอง เพื่อให้การดำเนินงานด้านการงบประมาณมีประสิทธิภาพมากยิ่งขึ้น",
      availableSeat: 3000,
      totalSeat: 4000,
    },
    {
      id: 3,
      title: "มหากาพย์ สังคมศึกษา น่ารู้: ภูมิศาสตร์",
      image: course3,
      genre: "ศิลปะและการพัฒนาตนเอง",
      detail:
        "สำหรับคอร์สวิชานี้จะมีชื่อว่า มหากาพย์ สังคมศึกษา น่ารู้ โดยจะมีทั้งหมด 5 เรื่อง ได้แก่ กฎหมายและสังคมวิทยา ศาสนาสากลและพระพุทธศาสนา เศรษฐศาสตร์ ภูมิศาสตร์ และประวัติศาสตร์ วิชานี้จะเป็นเป็นการนำเสนอความรู้เรื่องสังคมศึกษาที่จำเป็นต่อนักเรียน นิสิต นักศึกษา และประชาชนทั่วไป ผู้เรียนสามารถนำความรู้ที่ได้ไปใช้กับการสอบเข้าศึกษาต่อในมหาวิทยาลัย และนำไปใช้ในชีวิตประจำวัน",
      availableSeat: 1250,
      totalSeat: 5000,
    },
    {
      id: 4,
      title: "อาหารสุขภาพ รู้ทัน รู้จริง",
      image: course4,
      genre: "สุขภาพ",
      detail:
        "วิชาอาหารสุขภาพ รู้ทัน รู้จริง จะมีเนื้อหาเกี่ยวกับการดูแลตนเองให้มีสุขภาพดีห่างไกลจากโรค ด้วยข้อแนะนำการกินอาหารที่ถูกต้อง  สำหรับกรใช้ชีวิตในสังคมยุคดิจิทัล และสื่อโซเชียลที่มีการเผยแพร่ข้อมูลข่าวสารมากมาย ทำอย่างไรจึงจะรู้เท่าทัน  ทำอย่างไรจึงจะไม่ตกเป็นเหยื่อ  ข่าวลวงมากมายที่ทำให้ผู้คนไขว้เขว สับสน กับข้อมูลอาหารที่ทำให้มีสุขภาพดี ซึ่งนำไปสู่การแชร์จนมีการปฏิบัติตาม และสามารถนำไปสู่ผลเสียต่อสุขภาพได้",
      availableSeat: 2500,
      totalSeat: 8000,
    },
    {
      id: 5,
      title: "ประกันสังคมนั้นสำคัญไฉน (Why Social Security is Vital to Us.)",
      image: course5,
      genre: "ศิลปะและการพัฒนาตนเอง",
      detail:
        "วิชาประกันสังคมนั้นสำคัญไฉน (Why Social Security is Vital to Us.)  เป็นวิชาที่จุฬาลงกรณ์มหาวิทยาลัยได้ร่วมกับสำนักงานประกันสังคม เพื่อให้ผู้เรียนเข้าใจภาพรวมเกี่ยวกับเรื่องการประกันตนเองที่จะได้รับจากกองทุนประกันสังคม  โดยจะกล่าวถึง ประวัติความเป็นมา หลักการ แนวความคิดการประกันสังคม รวมถึงการได้รับสิทธิประโยชน์ของผู้ประกันตนตามแต่ละมาตราอย่างละเอียด เพื่อให้ลูกจ้าง นายจ้าง และผู้ประกอบอาชีพอิสระ นำความรู้ที่ได้ไปใช้ประโยชน์แก่ตนเองได้อย่างเหมาะสม",
      availableSeat: 3888,
      totalSeat: 4888,
    },
  ];

  const course6 = require("../../assets/images/courses/course6.png");
  const course7 = require("../../assets/images/courses/course7.png");
  const course8 = require("../../assets/images/courses/course8.png");
  const course9 = require("../../assets/images/courses/course9.png");
  const course10 = require("../../assets/images/courses/course10.png");
  const course11 = require("../../assets/images/courses/course11.png");
  const course12 = require("../../assets/images/courses/course12.png");
  const courses2: CourseItemProps[] = [
    {
      id: 6,
      title: "การพัฒนาทักษะชีวิต",
      image: course6,
      genre: "ศิลปะและการพัฒนาตนเอง",
      detail:
        "วิชาการพัฒนาทักษะชีวิต จะมีเนื้อหาเพื่อส่งเสริมกิจกรรมการเรียนรู้ตลอดชีวิตของผู้บริหาร คณาจารย์ บุคลากรทางการศึกษา ตลอดจนประชาชนทั่วไปที่มีความสนใจพัฒนาตนเองในด้าน ทักษะชีวิต ผ่านการสื่อสารภายในตนเองและการแนะแนว สำหรับเนื้อหาทั้งหมด ประกอบด้วย 3 ส่วน คือ การสื่อสารภายในตนเอง การแนะแนวเบื้องต้น และการทำสมุดแปลนชีวิต",
    },
    {
      id: 7,
      title: "ก่อนจะมาเป็นยา: การทดลองทางเภสัชจลนศาสตร์พรีคลินิก",
      image: course7,
      genre: "สุขภาพ",
      detail:
        "วิชา ก่อนมาจะเป็นยา: การทดลองทางเภสัชจลนศาสตร์พรีคลินิก จะมีเนื้อหาเกี่ยวกับการความรู้เรื่องกระบวนการทดลองทางเภสัชจลนศาสตร์พรีคลินิก จะเป็นการนำเสนอกระบวนการพัฒนายา การเตรียมยาสำหรับสัตว์ทดลอง การออกแบบกระบวนการทดลอง เช่น การคัดเลือกสัตว์ทดลองที่เหมาะสม การเก็บตัวอย่าง การวิเคราะห์ตัวอย่าง  รวมไปถึงการวิเคราะห์ผลการทดลอง เพื่อให้การคำนวณหาค่าและการนำไปใช้ได้อย่างมีประสิทธิภาพ",
    },
    {
      id: 8,
      title: "คณิตศาสตร์การเงินในชีวิตประจำวัน",
      image: course8,
      genre: "การจัดการ",
      detail:
        "วิชาคณิตศาสตร์การเงินในชีวิตประจำวัน จะมีเนื้อหาเกี่ยวกับการนำสื่อความรู้พื้นฐานทางคณิตศาสตร์ง่าย ๆ ที่เกี่ยวข้องกับชีวิตประจำวันของผู้เรียน เป็นการประยุกต์ใช้คณิตศาสตร์เข้ากับ 2 เรื่องได้แก่ บัตรเครดิต การคิดดอกเบี้ยบัตรเครดิต การคิดดอกเบี้ยจากการกดเงินสดจากบัตรเครดิต และการเสียภาษีเงินได้บุคคลธรรม",
    },
    {
      id: 9,
      title: "เรื่องสิ่งแวดล้อมเรื่องของเรา: What (Love) is in the air?",
      image: course9,
      genre: "เทคโนโลยี",
      detail:
        "รายวิชาเรื่องสิ่งแวดล้อมเรื่องของเรา: what (Love) is in the air? จะมีเนื้อหาเกี่ยวกับการเผยแพร่ความรู้เรื่อง สิ่งแวดล้อมเป็นเรื่องสำคัญเพราะปัจจุบันสภาพภูมิอากาศของโลกได้มีการเปลี่ยนแปลงไปในทางที่ร้ายแรงขึ้นทำให้เกิดปรากฎการณ์ที่แปลกประหลาดมากมาย ไม่ว่าจะเป็นอากาศที่ร้อนขึ้น ฝนไม่ตกเกิดภาวะน้ำแห้งแล้ง และที่เห็นได้ชัดที่สุดคือเมื่อต้นปีที่ผ่านมาประเทศไทยก็ประสบกับปัญหาเกี่ยวกับฝุ่น PM2.5 ซึ่งทำให้ประชาชนคนไทยทุกคนได้รับผลกระทบโดยตรงทำให้รัฐบาลต้องประกาศหยุดเรียน  สำหรับเนื้อหาวิชานี้จะกล่าวถึงความเชื่อมโยงของสภาพภูมิอากาศที่เปลี่ยนแปลงไป ภาวะโลกร้อน และมลพิษทางอากาศ เพื่อสร้างความเข้าใจและตระหนักถึงความสำคัญของสภาพแวดล้อมตลอดจนแนวทางการมีส่วนร่วมในการจัดการเพื่อสิ่งแวดล้อมที่ดีขึ้น",
    },
    {
      id: 10,
      title: "พลศาสตร์กระบวนการและการควบคุม",
      image: course10,
      genre: "เทคโนโลยี",
      detail:
        "พลศาสตร์กระบวนการและการควบคุม :Process Dynamics & Control เนื้อหาจะเป็นการสร้างและใช้แบบจำลองคณิตศาสตร์มาอธิบายพฤติกรรมกระบวนการในอุตสาหกรรมเคมี และนำข้อมูลพฤติกรรมของกระบวนการเหล่านั้นไปใช้ในการออกแบบระบบควบคุมกระบวนการนั้นๆ เพื่อให้ตอบสนองตามเป้าหมายที่กำหนดไว้ โดยมีวัตถุประสงค์เพื่อต้องการให้นิสิตและผู้เรียนสามารถสร้างแบบจำลองคณิตศาสตร์และสร้างระบบควบคุมอย่างง่ายได้อย่างมีประสิทธิภาพ",
    },
    {
      id: 11,
      title: "การตลาดในศตวรรษที่ 21",
      image: course11,
      genre: "การจัดการ",
      detail:
        "รายวิชาการตลาดในศตวรรษที่ 21 จะเป็นการศึกษาเกี่ยวกับนิยามของการตลาด แนวคิดหลักเกี่ยวกับการตลาดตั้งแต่อดีตจนถึงปัจจุบัน และการตลาดแบบองค์รวม (Holistic Marketing) ซึ่งเป็นสิ่งที่สำคัญสำหรับการตลาดในศตวรรษที่ 21",
    },
    {
      id: 12,
      title: "มหากาพย์ สังคมศึกษา น่ารู้ : ประวัติศาสตร์",
      image: course12,
      genre: "ศิลปะและการพัฒนาตนเอง",
      detail:
        "สำหรับคอร์สวิชานี้จะมีชื่อว่า มหากาพย์ สังคมศึกษา น่ารู้ โดยจะมีทั้งหมด 5 เรื่อง ได้แก่ กฎหมายและสังคมวิทยา   ศาสนาสากลและพระพุทธศาสนา   เศรษฐศาสตร์   ภูมิศาสตร์  และประวัติศาสตร์   วิชานี้จะเป็นเป็นการนำเสนอความรู้เรื่องสังคมศึกษาที่จำเป็นต่อนักเรียน นิสิต นักศึกษา และประชาชนทั่วไป  ผู้เรียนสามารถนำความรู้ที่ได้ไปใช้กับการสอบเข้าศึกษาต่อในมหาวิทยาลัย และนำไปใช้ในชีวิตประจำวัน",
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={0} />
      <Header title={title} subtitle={subtitle} imageUrl={heroImage} />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <AnnouncementCarousel announcements={announcements} />
            <Box my={3}>
              <Divider />
            </Box>
            <Typography gutterBottom variant="h6">
              คอร์สใหม่
            </Typography>
            <CourseCarousel courses={courses} />
            <Box my={3}>
              <Divider />
            </Box>
            <Typography gutterBottom variant="h6">
              เรียนได้ทั้งปี
            </Typography>
            <CourseCarousel courses={courses2} />
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
