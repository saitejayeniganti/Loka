import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Lottie from "react-lottie";
import MenuItem from "@mui/material/MenuItem";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import Menu from "@mui/material/Menu";
import logoicon from "../images/theme/grocery-bag.png";
import { get } from "../utils/serverCall.js";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS, REDUCER } from "../utils/consts";
import { Alert, AlertTitle } from "@mui/material";
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
import newsletter from "../images/admin/news.png";
import { Link } from "@mui/material";
import markpng from "../images/admin/mark.png";
import marketpng from "../images/admin/market.png";
import { displayError, displayMessage } from "../utils/messages";

function MenuAppBar(props) {
  console.log("props - ", props);
  const defaultLocation = CONSTANTS.DEFAULT_ADDRESS;
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const loc = props.isLoggedIn ? props.user.location : defaultLocation;
  const [location, setLocation] = useState(loc);
  const [searchInput, setSearchInput] = useState("");

  const errorState = useSelector((state) => state.errorReducer);
  const messageState = useSelector((state) => state.messageReducer);

  const dispatch = useDispatch();
  const { updateLocation, updateSearchInput } = bindActionCreators(
    aCreators,
    dispatch
  );
  const { doSignIn } = bindActionCreators(aCreators, dispatch);

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
      doSignIn(Date.now());
      navigate("/login");

      // console.log("loggedOut");
      // window.location.reload();
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
      displayError("");
      // setErrorMsg("");
    }, 3000);
  };

  const hideMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
      displayMessage("");
      // setMessage("");
    }, 3000);
  };

  useEffect(() => {
    if (errorState[REDUCER.ERR_MSG] !== "") {
      setErrorMsg(errorState[REDUCER.ERR_MSG]);
      // setShowError(true);
      // hideError();
    }
  }, [errorState]);

  useEffect(() => {
    if (errorMsg != "") {
      setShowError(true);
      hideError();
    }
  }, [errorMsg]);

  useEffect(() => {
    console.log("msg triggered");
    if (messageState[REDUCER.MESSAGE] !== "") {
      setMessage(messageState[REDUCER.MESSAGE]);
      // setShowMessage(true);
      // hideMessage();
    }
  }, [messageState]);

  useEffect(() => {
    if (message != "") {
      setShowMessage(true);
      hideMessage();
    }
  }, [message]);

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
    // margin: 0px;
    // background: linen;
    // color: black;

    return (
      <>
        <div style={{ marginLeft: "16px" }}>
          <SearchGMaps
            input={location.address}
            callback={(data) => {
              getCoordinates(data.description).then((result) => {
                console.log("updated location", result);
                setLocation({
                  address: data.description,
                  coordinates: [result.lng, result.lat],
                });
              });
            }}
          ></SearchGMaps>
        </div>
        <div style={{ margin: "auto", display: "flex" }}>
          <SearchMain
            input=""
            callback={(data) => {
              setSearchInput(data);
            }}
          ></SearchMain>
          {/* <div style={{ margin: "0px", background: "linen", color: "black" }}>
            <FormControlLabel control={<Switch />} label="Products" />
          </div> */}
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
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={marketpng} width="30" height="30" />
          </IconButton>
          <Typography variant="h5" component="div">
            LOKA
          </Typography>
          {(!props.isLoggedIn || props.user.role == 0) && (
            <div>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => {
                  navigate("/mapview");
                }}
              >
                <img src={markpng} height="28px" width="28px"></img>
              </IconButton>
            </div>
          )}
          {(!props.isLoggedIn || props.user.role == 0) && (
            <div>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => {
                  navigate("/newsletter");
                }}
              >
                <img src={newsletter} width="30" height="30" />
              </IconButton>
            </div>
          )}
          {((props.isLoggedIn && props.user.role == 0) || !props.isLoggedIn) &&
            searchBoxes()}
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
                      {props.user.role == 1 ? (
                        <>
                          <MenuItem
                            onClick={() => {
                              navigate("/merchantpostad");
                              setAnchorEl(null);
                            }}
                          >
                            Ads
                          </MenuItem>
                        </>
                      ) : (
                        ""
                      )}
                      {props.user.role == 1 ? (
                        <>
                          <MenuItem
                            onClick={() => {
                              navigate("/merchantanalytics");
                              setAnchorEl(null);
                            }}
                          >
                            Analytics
                          </MenuItem>
                        </>
                      ) : (
                        ""
                      )}
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

            {props.isLoggedIn && props.user.role == 0 && (
              <>
                <Link href={"/myorder"} underline="none" color="inherit">
                  <Typography body="h5" marginRight="20px">
                    My Orders
                  </Typography>
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
          <Alert severity="error" variant="filled" dismissible="true">
            <AlertTitle>Error</AlertTitle>
            {errorMsg}
          </Alert>
        </div>
      )}
      {showMessage && (
        <div style={{ position: "fixed", bottom: "10px", zIndex: "2" }}>
          <Alert severity="info" variant="filled" dismissible="true">
            <AlertTitle>Info</AlertTitle>
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
