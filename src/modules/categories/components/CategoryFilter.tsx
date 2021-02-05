// @ts-nocheck
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { FiberManualRecord as Circle } from "@material-ui/icons";
import categoryColor from "utils/categoryColor";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 260,
  },
}));

export default function CategoryFilter({ categories }) {
  const classes = useStyles();
  const { search } = useLocation();
  const { CourseCategoryId } = queryString.parse(search);
  const [open, setOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    setActiveCategoryId(CourseCategoryId);
    console.log(CourseCategoryId);
  }, [CourseCategoryId]);

  const handleChange = (event) => {
    setActiveCategoryId(event.target.value);
    history.push(
      event.target.value === 0
        ? `${path}`
        : `${path}?courseCategoryId=${event.target.value}`
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="categories-filter-label">หมวดหมู่</InputLabel>
      <Select
        labelId="categories-filter-label"
        id="categories-filter"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={activeCategoryId}
        onChange={handleChange}
      >
        <MenuItem value={0}>
          <em style={{ marginRight: 6 }}>ทั้งหมด</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            <Circle
              style={{
                color: categoryColor(category.id),
                fontSize: 12,
                marginRight: 12,
              }}
            />
            {category.courseCategory}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
