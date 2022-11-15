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
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS, REDUCER } from "../utils/consts";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import SearchGMaps from "./SearchGMaps";
import SearchMain from "./SearchMain";
import Drawer from "@mui/material/Drawer";
import Cart from "../views/cart/Cart";
import * as actions from "../reducers/actions";
import LocationSearchInput from "./LocationAuto";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getCoordinates } from "../utils/mapsHelper";
import { bindActionCreators } from "redux";
import { actionCreators as aCreators } from "../reducers/actionCreators";
import lokamarketlogo from "../images/admin/online-marketplace.png";
import { Link } from "@mui/material";


function MenuAppBar(props) {
  // console.log("props - ", props);
  const defaultLocation = CONSTANTS.DEFAULT_ADDRESS;
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [location, setLocation] = useState(defaultLocation);
  const [searchInput, setSearchInput] = useState("");

  const errorState = useSelector((state) => state.errorReducer);
  const messageState = useSelector((state) => state.messageReducer);

  const dispatch = useDispatch();
  const { updateLocation, updateSearchInput } = bindActionCreators(
    aCreators,
    dispatch
  );

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
      navigate("/home");
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

  useEffect(() => {
    if (props.isLoggedIn) {
      console.log("update location");
      setLocation(props.user.location);
    }
  }, [props]);

  useEffect(() => {
    updateLocation(location);
  }, [location]);
  useEffect(() => {
    updateSearchInput(searchInput);
  }, [searchInput]);

  const searchBoxes = () => {
    return (
      <>
        <div style={{ marginLeft: "16px" }}>
          <SearchGMaps
            input={location.address}
            callback={(data) => {
              getCoordinates(data.description).then((data) => {
                setLocation({
                  address: data.description,
                  coordinates: [data.lat, data.lng],
                });
              });
            }}
          ></SearchGMaps>
        </div>
        <div style={{ margin: "auto" }}>
          <SearchMain
            input=""
            callback={(data) => {
              setSearchInput(data);
            }}
          ></SearchMain>
        </div>
      </>
    );
  };

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
            <img src={lokamarketlogo} width="30" height="30" />
          </IconButton>
          <Typography variant="h5" component="div">
            LOKA
          </Typography>
          {props.isLoggedIn && props.user.role == 0 && searchBoxes()}
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
                      <MenuItem
                        onClick={() => {
                          navigate("/signup");
                          setAnchorEl(null);
                        }}
                      >
                        Signup
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
            {!props.isLoggedIn && (
              <>
                <Link href={"/myorder"}
                  underline="none" color="inherit">
                  <Typography body="h5" marginRight="20px">Your Orders</Typography>
                </Link>
                <Badge badgeContent={props.items?.length} color="primary">
                  <ShoppingCartOutlinedIcon
                    selfalign="right"
                    onClick={() => props.openCart()}
                  >
                    Cart
                  </ShoppingCartOutlinedIcon>
                </Badge>
                <Drawer
                  anchor="right"
                  open={props.cartOpen}
                  onClose={() => props.closeCart()}
                >
                  <Box
                    sx={{ width: 500 }}
                    role="presentation"
                  // onClick={() => props.cartOpen ? props.closeCart() : props.openCart()}
                  // onKeyDown={() => props.cartOpen ? props.closeCart() : props.openCart()}
                  >
                    <Cart />
                  </Box>
                </Drawer>
              </>
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
    cartOpen: state.cartReducer.cartOpen,
  };
};

const actionCreators = {
  openCart: actions.openCart,
  closeCart: actions.closeCart,
};

export default connect(mapStateToProps, actionCreators)(MenuAppBar);
