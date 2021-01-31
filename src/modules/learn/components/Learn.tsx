import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import MyCourseItem from "modules/home/components/MyCourseItem";

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
  })
);

interface Props {
  window?: () => Window;
}

export default function Learn(props: Props) {
  const classes = useStyles();

  return (
    <>
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Typography
              gutterBottom
              variant="h6"
              style={{ fontSize: "1.7rem" }}
            >
              หลักสูตรของฉัน
            </Typography>
            <MyCourseItem />
          </main>
        </div>
      </Container>
    </>
  );
}
