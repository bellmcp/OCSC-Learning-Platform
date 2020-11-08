import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CourseGenreIcon from "@material-ui/icons/FiberManualRecord";
import blue from "@material-ui/core/colors/blue";

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
    },
  })
);

export default function CourseFilter() {
  const classes = useStyles();
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
  );
}
