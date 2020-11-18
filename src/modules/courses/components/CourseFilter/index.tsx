import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CourseGenreIcon from "@material-ui/icons/FiberManualRecord";

import { CATEGORIES } from "../../../../shared/categories";

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
      minWidth: 260,
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
          <em style={{ marginRight: 6 }}>ทั้งหมด</em>
          {CATEGORIES.map((item) => (
            <CourseGenreIcon
              style={{
                color: item.color,
                fontSize: 12,
                marginLeft: 6,
              }}
            />
          ))}
        </MenuItem>
        {CATEGORIES.map((item, index) => (
          <MenuItem value={item.name} key={index}>
            <CourseGenreIcon
              style={{
                color: item.color,
                fontSize: 12,
                marginRight: 12,
              }}
            />
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
