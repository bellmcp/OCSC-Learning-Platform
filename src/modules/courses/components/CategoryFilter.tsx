// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function CategoryFilter() {
  const classes = useStyles();
  const { search } = useLocation();
  const { initialCategoryId } = queryString.parse(search);
  const [open, setOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleChange = (event) => {
    setActiveCategoryId(event.target.value);
    history.push(
      event.target.value === 0
        ? `${path}`
        : `${path}?CourseCategoryId=${event.target.value}`
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      const { data } = await axios.get("/CourseCategories");
      setCategories(data);
      setIsLoading(false);
    };
    loadCategories();
  }, []);

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
            {category.CourseCategory}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
