import React from "react";
import {
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Divider,
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
  user,
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
        <IconButton color="inherit">
          <Avatar className={login() ? classes.loggedIn : classes.small} />
        </IconButton>
        <Typography className={classes.bold}>
          {login() ? user.firstName : "เข้าสู่ระบบ"}
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={linkToPortal}>
        <IconButton color="inherit">
          <PortalIcon />
        </IconButton>
        <Typography>ไปยัง Portal</Typography>
      </MenuItem>
      {login() && (
        <MenuItem onClick={logout}>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
          <Typography>ออกจากระบบ</Typography>
        </MenuItem>
      )}
    </Menu>
  );
}
