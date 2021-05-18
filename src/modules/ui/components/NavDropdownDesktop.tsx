// @ts-nocheck
import React from "react";
import {
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ExitToApp as LogoutIcon,
  ViewCarousel as PortalIcon,
  Person as ProfileIcon,
} from "@material-ui/icons";

interface NavDropdownDesktopProps {
  login: () => void;
  logout: () => void;
  linkToProfile: () => void;
  linkToPortal: () => void;
  anchorEl: any;
  menuId: number;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}

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
  linkToProfile,
  linkToPortal,
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
}: NavDropdownDesktopProps) {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
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
      {login() && (
        <MenuItem onClick={linkToProfile}>
          <ListItemIcon className={classes.listItemIcon}>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="โปรไฟล์" />
        </MenuItem>
      )}
      <MenuItem onClick={linkToPortal}>
        <ListItemIcon className={classes.listItemIcon}>
          <PortalIcon />
        </ListItemIcon>
        <ListItemText primary="ไปยัง Portal" />
      </MenuItem>
      {login() && (
        <>
          <Divider />
          <MenuItem onClick={logout}>
            <ListItemIcon className={classes.listItemIcon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="ออกจากระบบ" />
          </MenuItem>
        </>
      )}
    </Menu>
  );
}
