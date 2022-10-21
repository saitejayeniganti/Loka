import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { displayError, displayMessage } from "../../utils/messages";
import { get, post } from "../../utils/serverCall";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import LocationSearchInput from "../../components/LocationAuto";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { showError, showMessage } from "../../reducers/errorActions";
import Grid from "@mui/material/Grid";
import Lottie from "react-lottie";
import merchant from "../../animations/merchantLogin1.json";
import yourStore from "../../animations/yourStore.json";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PhoneIcon from "@mui/icons-material/Phone";
import KeyIcon from "@mui/icons-material/Key";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

function Profile(userDetails) {
  const sessionState = useSelector((state) => state.sessionReducer);

  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const [redirectHome, setRedirectHome] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: merchant,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: yourStore,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate();
  const user = userDetails.user;
  const [externalSignup, setExternalSignUp] = useState(false);
  const defaultFilledData = {
    firstName: "",
    lastName: "",
    email: "",
    // externalId: "",
    provider: "email",
    phone: "",
    password: "",
    role: 0,
    address: "",
    latitude: "",
    longitude: "",
    // storeName: "",
  };

  const [filledData, setFilledData] = useState(defaultFilledData);

  const handleChange = (address) => {
    // setAddress(address);
    setFilledData((prev) => {
      return { ...prev, address };
    });
  };

  const trimInputs = () => {
    Object.keys(filledData).forEach(function (key) {
      if (typeof filledData[key] == "string") {
        filledData[key] = filledData[key].trim();
      }
    });
  };

  const checkEmpty = () => {
    let isValid = true;
    Object.keys(filledData).some((key) => {
      if (
        filledData[key] === "" ||
        filledData[key] === null ||
        filledData[key] === undefined
      ) {
        isValid = false;
        return true;
      }
    });
    return isValid;
  };

  const checkValidation = () => {
    let isValid = true;
    trimInputs();
    // if (!checkEmpty()) {
    //   displayError("Fill valid input");
    //   // showError("Fill valid input");
    //   // showMessage("hello");
    //   isValid = false;
    // }
    return isValid;
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      // setAddress(address);
      setFilledData((prev) => {
        return { ...prev, address };
      });
      getLatLng(results[0])
        .then((latLng) => {
          setFilledData((prev) => {
            return { ...prev, latitude: latLng.lat, longitude: latLng.lng };
          });
          // setLatitude(latLng.lat);
          // setLongitude(latLng.lng);
        })
        .catch((error) => console.error("Error", error));
    });
  };

  const gSignup = (e) => {
    e.preventDefault();
    window.open(
      process.env.REACT_APP_NODE_SERVER + "/auth/gSignup/callback",
      "_self"
    );
  };

  useEffect(() => {
    user && setExternalSignUp(true);
    if (user) {
      setFilledData((prev) => {
        return {
          ...prev,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          provider: user.provider,
        };
      });
    }
  }, [userDetails.user]);

  useEffect(() => {
    if (sessionState.isLoggedIn) {
      const userInfo = sessionState.user;
      setFilledData({
        ...filledData,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        provider: userInfo.provider,
        role: userInfo.role,
        address: userInfo.location.address,
        latitude: userInfo.location.coordinates[0],
        longitude: userInfo.location.coordinates[1],
      });
    }
  }, [sessionState]);

  // useEffect(() => {
  //   setRedirectHome(true);
  // }, [userDetails.isLoggedIn]);

  const eventHandler = (e) => {
    setFilledData({ ...filledData, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    if (checkValidation()) {
      post("/auth/signup", filledData)
        .then((res) => {
          displayMessage("Registered Successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (userDetails.isLoggedIn) {
    // console.log("redirect");
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={2.5}></Grid>
        <Grid item xs={7}>
          <Paper elevation={10} sx={{ borderRadius: "10px" }}>
            <div
              style={{
                background: "#84bbf4",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <Lottie options={defaultOptions1} height={350} width={350} />
            </div>
            <div
              style={{
                padding: "10px",
                overflowY: "scroll",
                position: "relative",
                // height: "450px",
              }}
            >
              <div style={{ margin: "20px" }}>
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  value={filledData.firstName}
                  placeholder="First Name"
                  size="small"
                  name="firstName"
                  onChange={eventHandler}
                />
              </div>
              <div style={{ margin: "20px" }}>
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  value={filledData.lastName}
                  placeholder="Last Name"
                  size="small"
                  name="lastName"
                  onChange={eventHandler}
                />
              </div>

              <div style={{ margin: "20px" }}>
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPostOfficeIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={filledData.email}
                  placeholder="Email"
                  size="small"
                  name="email"
                  onChange={eventHandler}
                />
              </div>
              <div style={{ margin: "20px" }}>
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={filledData.phone}
                  placeholder="Phone"
                  size="small"
                  name="phone"
                  onChange={eventHandler}
                />
              </div>
              {/* <div style={{ margin: "20px" }}>
                {filledData.provider === "email" && (
                  <TextField
                    fullWidth
                    id="outlined-size-small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={filledData.password}
                    disabled={externalSignup}
                    placeholder="Password"
                    size="small"
                    name="password"
                    onChange={eventHandler}
                  />
                )}
              </div> */}
              {/* <div style={{ margin: "20px" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filledData.role}
                  label="Account Role"
                  onChange={eventHandler}
                  name="role"
                >
                  <MenuItem value={0}>Customer</MenuItem>
                  <MenuItem value={1}>Vendor</MenuItem>
                </Select>
              </div> */}
              <div style={{ margin: "20px" }}>
                {filledData.role == 1 && (
                  <TextField
                    id="signup-name"
                    label="Store Name"
                    name="storeName"
                    value={filledData.storeName}
                    onChange={eventHandler}
                  />
                )}
              </div>
              <div style={{ margin: "20px" }}>
                <LocationSearchInput
                  handleChange={handleChange}
                  handleSelect={handleSelect}
                  address={filledData.address}
                />
              </div>
              <div style={{ margin: "20px" }}>
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  onClick={signup}
                >
                  Update
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
