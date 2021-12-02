// @ts-nocheck
import React from 'react';
import {
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UserProps } from 'modules/user/types';
import {
  MeetingRoom as LogoutIcon,
  ExitToApp as PortalIcon,
  Print as PrintIcon,
  ChromeReaderMode as FolderIcon,
  Edit as EditIcon,
  Lock as LockIcon,
} from '@material-ui/icons';

interface NavDropdownDesktopProps {
  login: () => void;
  logout: () => void;
  users: UserProps;
  linkToProfile: () => void;
  linkToPortal: () => void;
  linkToPrintCertificate: () => void;
  linkToCertificate: () => void;
  linkToEditProfile: () => void;
  linkToChangePassword: () => void;
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
    loggedIn: {
      color: theme.palette.common.white,
      backgroundColor: process.env.REACT_APP_TERTIARY_COLOR_HEX,
    },
    bold: {
      fontWeight: 600,
    },
  })
);

export default function NavDropdownDesktop({
  login,
  logout,
  users,
  linkToProfile,
  linkToPortal,
  linkToPrintCertificate,
  linkToCertificate,
  linkToEditProfile,
  linkToChangePassword,
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
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {login() && (
        <>
          <MenuItem onClick={linkToProfile}>
            <ListItemIcon color="inherit">
              <Avatar className={classes.loggedIn} />
            </ListItemIcon>
            <ListItemText
              className={classes.bold}
              primary={
                <Typography style={{ fontWeight: 600 }}>
                  {users.firstname} {users.lastname}
                </Typography>
              }
              secondary={login() && 'ดูโปรไฟล์ >'}
            />
          </MenuItem>
          <Divider />
        </>
      )}
      <MenuItem onClick={linkToPortal}>
        <ListItemIcon className={classes.listItemIcon}>
          <PortalIcon />
        </ListItemIcon>
        <ListItemText primary="ไปยัง Learning Portal" />
      </MenuItem>
      {login() && (
        <MenuItem onClick={linkToPrintCertificate}>
          <ListItemIcon className={classes.listItemIcon}>
            <PrintIcon />
          </ListItemIcon>
          <ListItemText primary="พิมพ์ประกาศนียบัตร ก.พ." />
        </MenuItem>
      )}
      {login() && (
        <MenuItem onClick={linkToCertificate}>
          <ListItemIcon className={classes.listItemIcon}>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="ประวัติการเรียน" />
        </MenuItem>
      )}
      {login() && (
        <MenuItem onClick={linkToEditProfile}>
          <ListItemIcon className={classes.listItemIcon}>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="แก้ไขข้อมูลส่วนบุคคล" />
        </MenuItem>
      )}
      {login() && (
        <MenuItem onClick={linkToChangePassword}>
          <ListItemIcon className={classes.listItemIcon}>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="เปลี่ยนรหัสผ่าน" />
        </MenuItem>
      )}
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
