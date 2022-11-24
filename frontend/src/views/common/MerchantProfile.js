import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
import FileUpload from "../../components/FileUpload";
import { v4 as uuidv4 } from "uuid";
import { Avatar, Image } from "antd";

import { actionCreators } from "../../reducers/actionCreators.js";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

function MerchantProfile(userDetails) {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const [redirectHome, setRedirectHome] = useState(false);

  const dispatch = useDispatch();
  const { doSignIn } = bindActionCreators(actionCreators, dispatch);

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
  const defaultFilledData = {
    firstName: "",
    lastName: "",
    email: "",
    // externalId: "",
    provider: "email",
    phone: "",
    // password: "",
    role: 0,
    address: "",
    latitude: "",
    longitude: "",
    image: "",
    id: "",
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
        console.log("fill data", key);
        displayError("Please fill all fields");
        return false;
      }
    });
    return isValid;
  };

  const checkValidation = () => {
    trimInputs();
    return checkEmpty();
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      // setAddress(address);
      setFilledData((prev) => {
        return { ...prev, address };
      });
      getLatLng(results[0])
        .then((latLng) => {
          console.log("Success", latLng);
          setFilledData((prev) => {
            return { ...prev, latitude: latLng.lat, longitude: latLng.lng };
          });
          // setLatitude(latLng.lat);
          // setLongitude(latLng.lng);
        })
        .catch((error) => console.error("Error", error));
    });
  };

  useEffect(() => {
    if (user) {
      console.log("profile user", user);
      setFilledData((prev) => {
        let data = {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          address: user.location.address,
          latitude: user.location.coordinates[1],
          longitude: user.location.coordinates[0],
          image: user.image,
          id: user.id,
          role: user.role,
        };
        if (user.role == 1) {
          data = { ...data, storeName: user.storeName };
        }
        return {
          ...prev,
          ...data,
        };
      });
    }
  }, [userDetails.user]);

  // useEffect(() => {
  //   setRedirectHome(true);
  // }, [userDetails.isLoggedIn]);

  const eventHandler = (e) => {
    setFilledData({ ...filledData, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    if (checkValidation()) {
      post("/auth/profile", filledData)
        .then((res) => {
          console.log(res);
          // sessionStorage.setItem("id", res._id.userId);
          displayMessage("Updated Successfully");
          doSignIn(Date.now());
          // window.location.reload();
          // navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!userDetails.isLoggedIn) {
    // console.log("redirect");
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Grid container sx={{ height: "100%", position: "absolute" }}>
        <Grid item xs={4} sx={{ backgroundColor: "#FEBB15" }}></Grid>
        <Grid item xs={8} sx={{ backgroundColor: "white" }}></Grid>
      </Grid>
      <Grid container sx={{ height: "100%", position: "absolute" }}>
        <Grid
          item
          xs={4}
          sx={
            {
              // background: "linear-gradient(35deg, #F9EA8F 40%, #AFF1DA 70%)",
            }
          }
        >
          <div
            style={{ fontSize: "80px", fontFamily: "math", marginTop: "20px" }}
          >
            <br /> Profile
          </div>
          <Lottie options={defaultOptions} height={420} width={420} />
        </Grid>

        <Grid
          item
          xs={8}
          sx={{
            // background: "rgb(243, 233, 100)"
            paddingTop: "40px",
          }}
        >
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
                  {/* <Lottie options={defaultOptions1} height={350} width={350} /> */}
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
                      id="firstName"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      value={filledData.firstName}
                      label="First Name"
                      size="small"
                      name="firstName"
                      variant="outlined"
                      onChange={eventHandler}
                    />
                  </div>
                  <div style={{ margin: "20px" }}>
                    <TextField
                      fullWidth
                      id="lastName"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      value={filledData.lastName}
                      label="Last Name"
                      size="small"
                      name="lastName"
                      onChange={eventHandler}
                    />
                  </div>

                  {/* <div style={{ margin: "20px" }}>
                    <TextField
                      fullWidth
                      id="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPostOfficeIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={filledData.email}
                      label="Email"
                      size="small"
                      name="email"
                      onChange={eventHandler}
                    />
                  </div> */}
                  <div style={{ margin: "20px" }}>
                    <TextField
                      fullWidth
                      id="phone"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={filledData.phone}
                      label="Phone"
                      size="small"
                      name="phone"
                      onChange={eventHandler}
                    />
                  </div>
                  {/* <div style={{ margin: "20px" }}>
                    {filledData.provider === "email" && (
                      <TextField
                        fullWidth
                        id="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={filledData.password}
                        disabled={externalSignup}
                        label="Password"
                        size="small"
                        name="password"
                        onChange={eventHandler}
                        type="password"
                      />
                    )}
                  </div> */}
                  {/* <div style={{ margin: "20px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="role-label">Account Role</InputLabel>
                      <Select
                        fullWidth
                        labelId="role-label"
                        id="role"
                        value={filledData.role}
                        label="Account Role"
                        onChange={eventHandler}
                        name="role"
                      >
                        <MenuItem value={0}>Customer</MenuItem>
                        <MenuItem value={1}>Vendor</MenuItem>
                      </Select>
                    </FormControl>
                  </div> */}
                  <div style={{ margin: "20px" }}>
                    {filledData.role == 1 && (
                      <TextField
                        fullWidth
                        id="storeName"
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
                  <div>
                    {filledData.image && (
                      <Avatar
                        size={128}
                        src={
                          <Image
                            src={filledData.image}
                            style={{ width: 256 }}
                          />
                        }
                      />
                    )}
                  </div>
                  <FileUpload
                    callback={(e) => {
                      console.log("uploaded url", e);
                      setFilledData({ ...filledData, image: e });
                    }}
                    fileName={uuidv4()}
                    folderPath="profile/"
                  />
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
        </Grid>
      </Grid>
    </>
  );
}

export default MerchantProfile;
