import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import Menu from "@mui/material/Menu";
import logoicon from "../images/theme/grocery-bag.png";
import { get } from "../utils/serverCall.js";
import { useSelector } from "react-redux";
import { REDUCER } from "../utils/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Alert } from "@mui/material";

export default function MenuAppBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const errorState = useSelector((state) => state.errorReducer);
  const messageState = useSelector((state) => state.messageReducer);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    get("/auth/logout").then((res) => {
      setAnchorEl(null);
      console.log("loggedOut");
      window.location.reload();
    });
  };
  console.log(props);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = useState(false);
  const hideError = () => {
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const hideMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  useEffect(() => {
    if (errorState[REDUCER.ERR_MSG] !== "") {
      setErrorMsg(errorState[REDUCER.ERR_MSG]);
      setShowError(true);
      hideError();
    }
  }, [errorState]);

  useEffect(() => {
    if (messageState[REDUCER.MESSAGE] !== "") {
      setMessage(messageState[REDUCER.MESSAGE]);
      setShowMessage(true);
      hideMessage();
    }
  }, [messageState]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#063970" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logoicon} width="28" height="28" />
          </IconButton>
          <Typography variant="h5" component="div">
            LOKA
          </Typography>
          {props.user && (
            <Typography variant="h5" component="div">
              {props.user.name.givenName}
            </Typography>
          )}
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                {props.isLoggedIn && (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {showError && (
        <div style={{ position: "fixed", bottom: "10px", zIndex: "2" }}>
          <Alert severity="warning" dismissible="true">
            {errorMsg}
          </Alert>
        </div>
      )}
      {showMessage && (
        <div style={{ position: "fixed", bottom: "10px", zIndex: "2" }}>
          <Alert severity="success" dismissible="true">
            {message}
          </Alert>
        </div>
      )}
    </Box>
  );
}

// MenuAppBar.propTypes = {
//   isLoggedIn: PropTypes.bool,
//   user: PropTypes.object,
// };
