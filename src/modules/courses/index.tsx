import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "../root/components/NavigationBar";
import Header from "../root/components/Header";
import Footer from "../root/components/Footer";
import CourseItem from "../home/components/CourseItem";

import { CourseModuleProps } from "./types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CourseGenreIcon from "@material-ui/icons/FiberManualRecord";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import blue from "@material-ui/core/colors/blue";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import CourseIcon from "@material-ui/icons/MenuBook";

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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
  })
);

export default function Courses({ courses }: CourseModuleProps) {
  const classes = useStyles();
  const title = "รายวิชา";

  const [genre, setGenre] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenre(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar active={0} />
      <Header
        title={title}
        icon={<CourseIcon fontSize="large" style={{ marginRight: "24px" }} />}
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
                  รายวิชาทั้งหมด
                </Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel id="genre-filter-label">หมวดหมู่</InputLabel>
                  <Select
                    labelId="genre-filter-label"
                    id="genre-filter"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={genre}
                    onChange={handleChange}
                  >
                    <MenuItem value={"all"}>
                      <em>ทั้งหมด</em>
                    </MenuItem>
                    <MenuItem value={"language"}>
                      <CourseGenreIcon
                        style={{
                          color: blue[500],
                          fontSize: 12,
                          marginRight: 6,
                        }}
                      />
                      ภาษา
                    </MenuItem>
                    <MenuItem value={"technology"}>
                      <CourseGenreIcon
                        style={{
                          color: blue[500],
                          fontSize: 12,
                          marginRight: 6,
                        }}
                      />
                      เทคโนโลยี
                    </MenuItem>
                    <MenuItem value={"management"}>
                      <CourseGenreIcon
                        style={{
                          color: blue[500],
                          fontSize: 12,
                          marginRight: 6,
                        }}
                      />
                      การจัดการ
                    </MenuItem>
                    <MenuItem value={"art_selfdev"}>
                      <CourseGenreIcon
                        style={{
                          color: blue[500],
                          fontSize: 12,
                          marginRight: 6,
                        }}
                      />
                      ศิลปะและการพัฒนาตนเอง
                    </MenuItem>
                    <MenuItem value={"health"}>
                      <CourseGenreIcon
                        style={{
                          color: blue[500],
                          fontSize: 12,
                          marginRight: 6,
                        }}
                      />
                      สุขภาพ
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Box>
            <Grid container spacing={1}>
              {courses.map((item, index) => (
                <React.Fragment key={index}>
                  {item.courses.map((item, index) => (
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
