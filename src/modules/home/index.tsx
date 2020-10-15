import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NavigationBar from "../root/components/NavigationBar";
import CourseGallery from "./components/CourseGallery";
import amber from "@material-ui/core/colors/amber";
import Grid from "@material-ui/core/Grid";
import Footer from "../root/components/Footer";

const hero = require("../../assets/images/hero.jpg");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    toolbar: {
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    heroContent: {
      color: theme.palette.common.white,
      backgroundImage: `url(${hero})`,
      backgroundSize: "cover",
      padding: theme.spacing(16, 0, 8),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    text: {
      marginTop: theme.spacing(4),
      maxWidth: 500,
    },
  })
);

interface Props {
  window?: () => Window;
}

export default function Home(props: Props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h3"
            align="left"
            color="inherit"
            gutterBottom
          >
            <span style={{ color: amber[500] }}>OCSC</span> Learning Platform
          </Typography>

          <Grid container justify="flex-start" className={classes.text}>
            <Grid item>
              <Typography paragraph align="left" color="inherit">
                คอร์สเรียนออนไลน์ฟรี ที่สำนักงาน ก.พ.
                เพราะเราเชื่อว่าทุกคนมีสิทธิที่จะเรียนรู้
                มาร่วมกันฝึกทักษะทางความคิด ความสามารถ และสติปัญญา
                เพื่อพัฒนาศักยภาพ ของตนเองได้ที่ OCSC Learning Platform
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container>
        <div className={classes.root}>
          <CssBaseline />
          <NavigationBar />
          <main className={classes.content}>
            {/* <div className={classes.toolbar} /> />*/}
            {/* <Carousel /> */}
            {/* <Announcement />*/}
            <CourseGallery />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </main>
        </div>
      </Container>

      <Footer />
    </>
  );
}
