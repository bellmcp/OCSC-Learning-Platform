export interface NavigationDrawerProps {
    window?: () => Window;
    handleDrawerToggle: () => void;
    mobileOpen: boolean;
    active: number;
  }