// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { getCookie, eraseCookie } from "utils/cookies";
import parseJwt from "utils/parseJwt";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Hidden,
  Button,
  Divider,
  Container,
  Tooltip,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@material-ui/icons";
import { amber, grey } from "@material-ui/core/colors";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useLineNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/line";

import * as uiActions from "modules/ui/actions";
import * as userActions from "modules/user/actions";
import * as supportActions from "modules/support/actions";
import NavDrawer from "./NavDrawer";
import NavDropdownMobile from "./NavDropdownMobile";
import NavDropdownDesktop from "./NavDropdownDesktop";

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
      marginRight: theme.spacing(1),
    },
    title: {
      display: "none",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    logo: {
      display: "block",
      maxWidth: 120,
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        maxWidth: 110,
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    link: {
      textDecoration: "none !important",
      color: theme.palette.common.white,
    },
    search: {
      position: "relative",
      backgroundColor: fade(theme.palette.common.black, 0.9),
      borderRadius: theme.shape.borderRadius,
      width: "100%",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
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
      paddingLeft: `calc(1em)`,
      paddingRight: `calc(3em)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey[800]}`,
      "&:focus": {
        border: `1px solid ${amber[500]}`,
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
    noDecorationLink: {
      textDecoration: "none",
    },
    navMenu: {
      minWidth: "270px",
    },
    navItem: {
      color: theme.palette.common.white,
    },
    navItemActive: {
      color: amber[500],
    },
    badge: {
      zIndex: 10,
    },
    divider: {
      width: 2,
      height: 32,
      margin: theme.spacing(2),
      backgroundColor: theme.palette.grey[800],
    },
    bold: {
      fontWeight: 600,
    },
  })
);

interface NavigationBarProps {
  active: number;
  setActivePage: (id: number) => void;
}

export default function NavBar(props: NavigationBarProps) {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const path = "/learning-platform";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const logo = require("assets/images/root/logo-min.png");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const token = getCookie("token");
  const id = parseJwt(token).unique_name;
  useEffect(() => {
    if (login()) {
      const actionProfile = userActions.loadUser();
      dispatch(actionProfile);
    }
  }, [dispatch, id]);
  const { items: users } = useSelector((state: any) => state.user);
  const login = () => {
    if (token === null) {
      return false;
    }
    if (
      (token !== "" || token !== undefined) &&
      parseJwt(token).role === "user"
    ) {
      return true;
    }
    return false;
  };

  const { items: supports } = useSelector((state) => state.support);

  useEffect(() => {
    const action = supportActions.loadSupports();
    dispatch(action);
  }, [dispatch]);

  const UNREAD_NOTIFICATION_COUNT = supports.filter((support: any) => {
    return support.ReplyMessage !== null && support.IsAcknowledged === false;
  }).length;

  const navigationItem = [
    {
      id: 0,
      title: "หน้าหลัก",
      url: `${path}`,
      notification: 0,
    },
    { id: 1, title: "เข้าเรียน", url: `${path}/learn`, notification: 0 },
    {
      id: 2,
      title: "ช่วยเหลือ",
      url: `${path}/support`,
      notification: UNREAD_NOTIFICATION_COUNT,
    },
  ];

  const linkToHome = () => {
    handleMenuClose();
    history.push(`${path}`);
  };

  const linkToLogin = () => {
    handleMenuClose();
    history.push(`${path}/login`);
  };

  const linkToProfile = () => {
    handleMenuClose();
    history.push(`${path}/me`);
  };

  const linkToPortal = () => {
    handleMenuClose();
    window.open("https://welearn.ocsc.go.th/learning-portal", "_blank");
  };

  const toggleSearchBar = () => {
    alert(`Toggle Search Bar`);
  };

  const logout = () => {
    handleMenuClose();
    eraseCookie("token");
    history.push(`${path}`);
    window.location.reload();
    dispatch(uiActions.setFlashMessage("ออกจากระบบเรียบร้อยแล้ว"));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Container
          maxWidth={!pathname.includes(`${path}/learn/demo`) ? "lg" : false}
        >
          <Toolbar>
            {/* DRAWER TOGGLE */}
            <Hidden smUp implementation="css">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            {/* SITE LOGO */}
            <img
              src={logo}
              alt="OCSC Logo"
              className={classes.logo}
              onClick={linkToHome}
            />
            <Hidden mdDown implementation="css">
              <Typography
                variant="h6"
                noWrap
                className={classes.title}
                onClick={linkToHome}
              >
                Learning Platform
              </Typography>
            </Hidden>
            {/* SEARCH */}
            <div className={classes.sectionDesktop}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="ค้นหา"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onBlur={(event) => {
                    alert(`Search query: ${event.target.value}`);
                  }}
                />
              </div>
            </div>
            <div className={classes.grow} />
            {/* DESKTOP NAVIGATION */}
            <Hidden xsDown implementation="css">
              <ThemeProvider theme={darkTheme}>
                <NavMenu
                  useStyles={useLineNavigationMenuStyles}
                  color="inherit"
                  className={classes.navMenu}
                >
                  {navigationItem.map((item) => (
                    <NavLink
                      to={item.url}
                      className={classes.noDecorationLink}
                      onClick={() => props.setActivePage(item.id)}
                    >
                      <NavItem
                        active={props.active === item.id}
                        className={
                          props.active === item.id
                            ? classes.navItemActive
                            : classes.navItem
                        }
                      >
                        {login() && item.notification !== 0 ? (
                          <Badge
                            className={classes.badge}
                            variant="dot"
                            color="error"
                          >
                            <Typography noWrap>{item.title}</Typography>
                          </Badge>
                        ) : (
                          <Typography noWrap>{item.title}</Typography>
                        )}
                      </NavItem>
                    </NavLink>
                  ))}
                </NavMenu>
              </ThemeProvider>
            </Hidden>
            {/* DESKTOP DROPDOWN */}
            <div className={classes.sectionDesktop}>
              <Divider orientation="vertical" className={classes.divider} />
              <Tooltip title={login() ? "ดูโปรไฟล์" : ""}>
                <Button
                  onClick={login() ? linkToProfile : linkToLogin}
                  color="inherit"
                  size="small"
                  style={{
                    borderRadius: 50,
                    padding: "10px 10px",
                    margin: "6px 0",
                  }}
                  startIcon={
                    <Avatar
                      className={login() ? classes.loggedIn : classes.small}
                    />
                  }
                >
                  <Typography className={classes.bold} noWrap>
                    {login() ? users.firstname : "เข้าสู่ระบบ"}
                  </Typography>
                </Button>
              </Tooltip>
              <IconButton
                edge="end"
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{
                  margin: "6px 0",
                }}
              >
                <ArrowDownIcon />
              </IconButton>
            </div>
            {/* MOBILE DROPDOWN */}
            <Hidden only={["xs", "lg", "md", "xl"]}>
              <div className={classes.grow} />
            </Hidden>
            <div className={classes.sectionMobile}>
              <IconButton color="inherit" onClick={toggleSearchBar}>
                <SearchIcon />
              </IconButton>
              <IconButton
                aria-controls={mobileMenuId}
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <Avatar
                  className={login() ? classes.loggedIn : classes.small}
                />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <NavDropdownMobile
        login={login}
        logout={logout}
        users={users}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        linkToProfile={linkToProfile}
        linkToLogin={linkToLogin}
        linkToPortal={linkToPortal}
      />
      <NavDropdownDesktop
        login={login}
        logout={logout}
        linkToPortal={linkToPortal}
        linkToProfile={linkToProfile}
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <NavDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        active={props.active}
      />
    </div>
  );
}
