// @ts-nocheck
import React from "react";
import {
  MenuItem,
  Menu,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ExitToApp as LogoutIcon,
  ViewCarousel as PortalIcon,
} from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import { UserProps } from "modules/user/types";

interface NavDropdownMobileProps {
  users: UserProps;
  login: () => void;
  logout: () => void;
  mobileMenuId: number;
  mobileMoreAnchorEl: any;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  linkToProfile: () => void;
  linkToLogin: () => void;
  linkToPortal: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: grey[700],
    },
    loggedIn: {
      color: theme.palette.common.white,
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: process.env.REACT_APP_TERTIARY_COLOR_HEX,
    },
    bold: {
      fontWeight: 600,
    },
  })
);

export default function NavDropdownMobile({
  users,
  login,
  logout,
  mobileMenuId,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  linkToProfile,
  linkToLogin,
  linkToPortal,
}: NavDropdownMobileProps) {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={login() ? linkToProfile : linkToLogin}>
        <ListItemIcon color="inherit">
          <Avatar className={login() ? classes.loggedIn : classes.small} />
        </ListItemIcon>
        <ListItemText
          className={classes.bold}
          primary={
            login() ? (
              <Typography style={{ fontWeight: 600 }}>
                {users.firstname}
              </Typography>
            ) : (
              <Typography style={{ fontWeight: 600 }}>เข้าสู่ระบบ</Typography>
            )
          }
          secondary={login() && "ดูโปรไฟล์ >"}
        />
      </MenuItem>
      <MenuItem onClick={linkToPortal}>
        <ListItemIcon color="inherit">
          <PortalIcon style={{ margin: 8, marginLeft: 4 }} />
        </ListItemIcon>
        <ListItemText primary="ไปยัง Portal"></ListItemText>
      </MenuItem>
      {login() && (
        <>
          <Divider />
          <MenuItem onClick={logout}>
            <ListItemIcon color="inherit">
              <LogoutIcon style={{ margin: 8, marginLeft: 4 }} />
            </ListItemIcon>
            <ListItemText primary="ออกจากระบบ"></ListItemText>
          </MenuItem>
        </>
      )}
    </Menu>
  );
}
