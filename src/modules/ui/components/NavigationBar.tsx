import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as userActions from "modules/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
  MenuItem,
  Menu,
  Avatar,
  Hidden,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Container,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ExitToApp as LogoutIcon,
  KeyboardArrowDown as ArrowDown,
  ViewCarousel as Portal,
  Person,
} from "@material-ui/icons";
import { amber, grey } from "@material-ui/core/colors";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { useLineNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/line";
import NavigationDrawer from "./NavigationDrawer";

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
    },
    logo: {
      display: "block",
      maxWidth: 120,
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        maxWidth: 110,
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
    listItemIcon: {
      minWidth: 40,
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
    profileName: {
      fontWeight: 600,
    },
  })
);

const navigationItem = [
  {
    id: 0,
    title: "หน้าหลัก",
    url: "/",
    notification: 0,
  },
  { id: 1, title: "เข้าเรียน", url: "/learn", notification: 0 },
  { id: 2, title: "ช่วยเหลือ", url: "/support", notification: 1 },
];

interface NavigationBarProps {
  active: number;
  setActivePage: (id: number) => void;
}

export default function NavigationBar(props: NavigationBarProps) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const logo = require("assets/images/root/logo-min.png");
  // const user = require("assets/images/root/user-min.jpg");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const token = getCookie("token");
  const id = parseJwt(token).unique_name;
  useEffect(() => {
    if (login()) {
      const actionProfile = userActions.loadGetProfile();
      dispatch(actionProfile);
    }
    // eslint-disable-next-line
  }, [id]);
  const { data: user } = useSelector((state: any) => state.user);
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

  const LinkToLogin = () => {
    history.push("/login");
  };

  const LinkToProfile = () => {
    history.push("/me");
  };

  const LinkToPortal = () => {
    handleMenuClose();
    alert("Redirect to https://welearn.ocsc.go.th/learning-portal");
  };

  const { pathname } = useLocation();

  const logout = () => {
    handleMenuClose();
    eraseCookie("token");
    history.push(`${pathname}`);
    window.location.reload();
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
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      // anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      // transformOrigin={{ vertical: "top", horizontal: "right" }}
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
      {/* <MenuItem onClick={handleMenuClose}>
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
      </MenuItem> */}
      <MenuItem onClick={LinkToPortal}>
        <ListItemIcon className={classes.listItemIcon}>
          <Portal />
        </ListItemIcon>
        <ListItemText primary="ไปยัง Portal" />
      </MenuItem>
      {login() ? (
        <MenuItem onClick={logout}>
          <ListItemIcon className={classes.listItemIcon}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="ออกจากระบบ" />
        </MenuItem>
      ) : null}
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
      <MenuItem onClick={LinkToLogin}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt="User" className={classes.small}>
            <Person />
          </Avatar>
        </IconButton>
        <Typography style={{ fontWeight: 600 }}>เข้าสู่ระบบ</Typography>
      </MenuItem>
      <Divider />
      {/* <MenuItem>
        <IconButton color="inherit">
          <SettingIcon />
        </IconButton>
        <Typography>การตั้งค่า</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <LogoutIcon />
        </IconButton>
        <Typography>ออกจากระบบ</Typography>
      </MenuItem> */}
      <MenuItem onClick={LinkToPortal}>
        <IconButton color="inherit">
          <LogoutIcon />
        </IconButton>
        <Typography>ไปยัง Portal</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Container maxWidth="lg">
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

            <NavLink to="/" className={classes.link}>
              <img src={logo} alt="OCSC Logo" className={classes.logo} />
            </NavLink>

            {/* <Divider orientation="vertical" className={classes.divider} /> */}
            <Hidden mdDown implementation="css">
              <NavLink to="/" className={classes.link}>
                <Typography className={classes.title} variant="h6" noWrap>
                  Learning Platform
                </Typography>
              </NavLink>
            </Hidden>

            {/* Search Bar */}
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
                />
              </div>
            </div>

            <div className={classes.grow} />

            {/* Desktop Navigation Menu */}
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

            {/* Desktop Button Menu */}
            <div className={classes.sectionDesktop}>
              <Divider orientation="vertical" className={classes.divider} />
              {login() ? (
                <Button
                  onClick={LinkToProfile}
                  color="inherit"
                  size="small"
                  style={{
                    borderRadius: 50,
                    padding: "10px 10px",
                    margin: "6px 0",
                  }}
                  startIcon={
                    <Avatar className={classes.loggedIn}>
                      <Person />
                    </Avatar>
                  }
                >
                  <Typography className={classes.profileName} noWrap>
                    {user.firstName}
                  </Typography>
                </Button>
              ) : (
                <Button
                  onClick={LinkToLogin}
                  color="inherit"
                  size="small"
                  style={{
                    borderRadius: 50,
                    padding: "10px 10px",
                    margin: "6px 0",
                  }}
                  startIcon={
                    <Avatar className={classes.small}>
                      <Person />
                    </Avatar>
                  }
                >
                  <Typography className={classes.profileName} noWrap>
                    เข้าสู่ระบบ
                  </Typography>
                </Button>
              )}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{
                  margin: "6px 0",
                }}
              >
                <ArrowDown />
              </IconButton>
            </div>

            {/* Mobile Button Menu */}
            <Hidden only={["xs", "lg", "md", "xl"]}>
              <div className={classes.grow} />
            </Hidden>
            <div className={classes.sectionMobile}>
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <Avatar alt="User" className={classes.small} />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}

      <NavigationDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        active={props.active}
      />
    </div>
  );
}
