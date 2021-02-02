import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CurriculumIcon from "@material-ui/icons/CollectionsBookmark";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDownRounded";
// import CourseFilter from "../courses/components/CourseFilter";
import CourseItem from "../home/components/CourseItem";
import Footer from "modules/ui/components/Footer";
import Header from "modules/ui/components/Header";
import NavBar from "modules/ui/components/NavBar";
import { CurriculumModuleProps } from "./types";

const heroImage = require("../../assets/images/root/hero-min.jpg");

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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  })
);

export default function Curriculum({ curriculum }: CurriculumModuleProps) {
  const classes = useStyles();
  const title = "หลักสูตร";

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar
        active={0}
        setActivePage={() => {
          console.log("mock");
        }}
      />
      <Header
        title={title}
        icon={
          <CurriculumIcon fontSize="large" style={{ marginRight: "24px" }} />
        }
        imageUrl={heroImage}
      />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mb={2}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: "1.7rem" }}
                >
                  หลักสูตรทั้งหมด
                </Typography>
                {/* <CourseFilter /> */}
              </Grid>
            </Box>
            <Grid container spacing={1}>
              {curriculum.map((item, index) => (
                <React.Fragment key={index}>
                  {item.curricula.map((item, index) => (
                    <Grid item xs={12} sm={4} md={3}>
                      <CourseItem
                        key={index}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        genre={item.genre}
                        detail={item.detail}
                        availableSeat={item.availableSeat}
                        totalSeat={item.totalSeat}
                        isCurriculum
                      />
                    </Grid>
                  ))}
                </React.Fragment>
              ))}
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Box mt={6} mb={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ArrowDownIcon />}
                  style={{ borderRadius: 25 }}
                >
                  ดูเพิ่มเติม
                </Button>
              </Box>
            </Grid>
          </main>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
