import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import SearchGMaps from "./SearchGMaps";
import SearchMain from "./SearchMain";

function MenuAppBar(props) {
  // console.log("props - ", props);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

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
      // console.log("loggedOut");
      window.location.reload();
    });
  };

  const handleLogin = () => {
    navigate("/login");
    setAnchorEl(null);
  };

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [message, setMessage] = useState("");
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
          <SearchGMaps></SearchGMaps>
          <SearchMain></SearchMain>
          {/* {props.user && (
            <Typography variant="h5" component="div">
              {props.user.firstName}
            </Typography>
          )} */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "right",
              marginLeft: "auto",
            }}
          >
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
                  {!props.isLoggedIn && (
                    <div>
                      <MenuItem
                        onClick={() => {
                          navigate("/login");
                          setAnchorEl(null);
                        }}
                      >
                        Login
                      </MenuItem>
                    </div>
                  )}
                  {props.isLoggedIn && (
                    <div>
                      <MenuItem
                        onClick={() => {
                          navigate("/profile");
                          setAnchorEl(null);
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </div>
                  )}
                </Menu>
              </div>
            )}
            {props.isLoggedIn && (
              <Badge badgeContent={props.items?.length} color="primary">
                <ShoppingCartOutlinedIcon selfalign="right">
                  Cart
                </ShoppingCartOutlinedIcon>
              </Badge>
            )}
          </Box>
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

const mapStateToProps = (state) => {
  return {
    items: state.cartReducer.items,
  };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(MenuAppBar);
