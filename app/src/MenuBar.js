import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import Link from "@material-ui/core/Link";
// import AccountCircle from "@material-ui/icons/AccountCircle";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    fontSize: 40,
  },
}));

export default function MenuBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="left" className={classes.title}>
            WAGO: {props.activeModbusServer.ip}
          </Typography>
          <Typography variant="h6" align="left" className={classes.title}>
            Locker Tester
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <Link component={RouterLink} to="/status">
                <MenuItem onClick={handleClose} className={classes.link}>
                  Network Status
                </MenuItem>
              </Link>
              <Link component={RouterLink} to="/server">
                <MenuItem onClick={handleClose} className={classes.link}>
                  WAGO Setup
                </MenuItem>
              </Link>
              <Link component={RouterLink} to="/lockersystemsetup">
                <MenuItem onClick={handleClose} className={classes.link}>
                  Locker System Setup
                </MenuItem>
              </Link>
              <Link component={RouterLink} to="/">
                <MenuItem onClick={handleClose} className={classes.link}>
                  Operate Lockers
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
