import React from "react";
import {
  MenuItem,
  Menu,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ExitToApp as LogoutIcon,
  ViewCarousel as PortalIcon,
} from "@material-ui/icons";
import { amber, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: grey[700],
    },
    loggedIn: {
      color: "black",
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: amber[500],
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
}: any) {
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
          primary={login() ? users.firstName : "เข้าสู่ระบบ"}
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
