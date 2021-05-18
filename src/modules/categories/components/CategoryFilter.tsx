// @ts-nocheck
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { FiberManualRecord as Circle } from "@material-ui/icons";
import categoryColor from "utils/categoryColor";

import { CategoryProps } from "../types";

interface CategoryFilterProps {
  categories: CategoryProps[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 260,
  },
}));

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const classes = useStyles();
  const { search } = useLocation();
  const history = useHistory();
  const { courseCategoryId } = queryString.parse(search);
  const { path } = useRouteMatch();

  const [open, setOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(
    parseInt(courseCategoryId)
  );

  useEffect(() => {
    if (courseCategoryId === undefined) {
      setActiveCategoryId(0);
    } else {
      setActiveCategoryId(parseInt(courseCategoryId));
    }
  }, [courseCategoryId]);

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
        MenuProps={{
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
          transformOrigin: { vertical: "top", horizontal: "center" },
        }}
        labelId="categories-filter-label"
        id="categories-filter"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={activeCategoryId}
        onChange={handleChange}
      >
        <MenuItem value={0}>
          <em style={{ marginRight: 12 }}>ทั้งหมด</em>{" "}
          {categories.map((category) => (
            <Circle
              style={{
                color: categoryColor(category.id),
                fontSize: 12,
                marginRight: 6,
              }}
            />
          ))}
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            value={category.id}
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              lineHeight: "1.4",
            }}
          >
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
