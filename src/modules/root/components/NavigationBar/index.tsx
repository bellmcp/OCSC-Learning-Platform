import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SettingIcon from "@material-ui/icons/Settings";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import NavigationDrawer from "../NavigationDrawer";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";

import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useLineNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/line";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: amber[500],
    },
  },
  typography: {
    fontFamily: ["Prompt", "sans-serif"].join(","),
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(6px)",
      [theme.breakpoints.up("sm")]: {
        zIndex: theme.zIndex.drawer + 1,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    logo: {
      maxWidth: 120,
    },
    search: {
      position: "relative",
      backgroundColor: fade(theme.palette.common.black, 0.9),
      borderRadius: theme.shape.borderRadius,
      //   "&:hover": {
      //     border: `1px solid ${grey[700]}`,
      //   },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(6),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      right: "0",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${grey[800]}`,
      [theme.breakpoints.up("sm")]: {
        width: "32ch",
        "&:focus": {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${amber[500]}`,
        },
        // "&:focus": {
        //   width: "30ch",
        // },
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    listItemIcon: {
      minWidth: 40,
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    navItemActive: {
      color: amber[500],
    },
    navItem: {
      color: grey[50],
    },
    badge: {
      zIndex: 10,
    },
    divider: {
      width: 2,
      height: 32,
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      backgroundColor: grey[800],
    },
    profileButton: {
      fontWeight: 600,
    },
  })
);

export default function NavigationBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const logo = require("../../../../assets/images/ocsc_logo.png");
  const user = require("../../../../assets/images/user.jpg");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    console.log(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon className={classes.listItemIcon}>
          <SettingIcon />
        </ListItemIcon>
        <ListItemText primary="การตั้งค่า" />
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon className={classes.listItemIcon}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="ออกจากระบบ" />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={2} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>การแจ้งเตือน</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt="User" src={user} className={classes.small} />
        </IconButton>
        <p>โปรไฟล์</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* Hide Sidebar Toggle Button on Desktop */}
          <Hidden smUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <img src={logo} alt="OCSC Logo" className={classes.logo} />

          <Divider orientation="vertical" className={classes.divider} />

          <Typography className={classes.title} variant="h6" noWrap>
            Learning Platform
          </Typography>

          {/* Search Bar */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="ค้นหาคอร์สเรียน"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <div className={classes.grow} />

          {/* Desktop Navigation Menu */}
          <ThemeProvider theme={darkTheme}>
            <NavMenu useStyles={useLineNavigationMenuStyles} color="inherit">
              <NavItem active className={classes.navItemActive} color="inherit">
                <Typography className={classes.navItemActive}>
                  หน้าหลัก
                </Typography>
              </NavItem>
              <NavItem>
                <Typography className={classes.navItem}>คอร์สเรียน</Typography>
              </NavItem>
              <NavItem>
                <Typography className={classes.navItem}>หลักสูตร</Typography>
              </NavItem>
              <NavItem>
                <Badge className={classes.badge} variant="dot" color="error">
                  <Typography className={classes.navItem}>ช่วยเหลือ</Typography>
                </Badge>
              </NavItem>
            </NavMenu>
          </ThemeProvider>

          <Divider orientation="vertical" className={classes.divider} />

          {/* Desktop Button Menu */}
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show notifications" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <Button
              color="inherit"
              size="small"
              style={{ borderRadius: 50, padding: "0 10px" }}
              startIcon={
                <Avatar alt="User" src={user} className={classes.small} />
              }
            >
              <Typography className={classes.profileButton}>
                วุฒิภัทร
              </Typography>
            </Button>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ArrowDown />
            </IconButton>
          </div>

          {/* Mobile Button Menu */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}

      <NavigationDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </div>
  );
}
