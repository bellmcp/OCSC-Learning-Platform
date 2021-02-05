import React from "react";
import { MenuItem, Menu, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ExitToApp as LogoutIcon,
  ViewCarousel as Portal,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: 40,
    },
  })
);

export default function NavDropdownDesktop({
  login,
  logout,
  linkToPortal,
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
}: any) {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={linkToPortal}>
        <ListItemIcon className={classes.listItemIcon}>
          <Portal />
        </ListItemIcon>
        <ListItemText primary="ไปยัง Portal" />
      </MenuItem>
      {login() && (
        <MenuItem onClick={logout}>
          <ListItemIcon className={classes.listItemIcon}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="ออกจากระบบ" />
        </MenuItem>
      )}
    </Menu>
  );
}
