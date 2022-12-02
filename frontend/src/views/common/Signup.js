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
import delivery from "../../animations/delivery.json";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import LocationSearchInput from "../../components/LocationAuto";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { showError, showMessage } from "../../reducers/errorActions";
import Grid from "@mui/material/Grid";
import Lottie from "react-lottie";
import merchant from "../../animations/merchantLogin1.json";
import ofr from "../../animations/ofr.json";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PhoneIcon from "@mui/icons-material/Phone";
import KeyIcon from "@mui/icons-material/Key";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import FileUpload from "../../components/FileUpload";
import { v4 as uuidv4 } from "uuid";
import { Avatar, Image } from "antd";

function Signup(userDetails) {
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
    animationData: ofr,
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
    image: "",
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
        console.log(key);
        displayError("Please fill all fields");
        return false;
      }
    });
    return isValid;
  };

  const checkValidation = () => {
    let isValid = true;
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
          email: user.emails ? user.emails[0].value : defaultFilledData.email,
          externalId: user.id,
          provider: user.provider,
          password: "provider",
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
      post("/auth/signup", filledData)
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("id", res._id.userId);
          displayMessage("Registered Successfully");
          navigate("/login");
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
      <Grid container sx={{ height: "100%", position: "absolute" }}>
        <Grid item xs={6} sx={{ backgroundColor: "#FEBB15" }}></Grid>
        <Grid item xs={6} sx={{ backgroundColor: "white" }}></Grid>
      </Grid>
      <Grid container sx={{ height: "100%", position: "absolute" }}>
        <Grid
          item
          xs={4}
          sx={{marginTop:"25vh"}}
        >

          <div
            style={{fontSize: "80px", fontFamily: "math" }}
          >
            Sign Up
          </div>
          

          <div
            style={{
              fontSize: "20px",
              fontFamily: "math",
              marginTop: "20px",
              padding: "20px",
            }}
          >
            sign up as a customer on to LOKA platform and discover the available
            products near you.
          </div>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            // background: "rgb(243, 233, 100)"
            paddingTop: "40px",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            
            <Grid item xs={12}>
              <Paper
                elevation={10}
                sx={{ borderRadius: "10px", paddingTop: "8px" }}
              >
                <div style={{ fontSize: "smaller" }}>
                  Signup as a Vendor ?{" "}
                  <u
                    style={{ cursor: "pointer" }}
                    className="linkHighlight"
                    onClick={() => {
                      navigate("/merchantSignup");
                    }}
                  >
                    Vendor Signup{" "}
                  </u>
                </div>
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
                    <Button
                      variant="outlined"
                      onClick={gSignup}
                      sx={{ width: "100%" }}
                      startIcon={
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="#FFFFFF"
                          xmlns="http://www.w3.org/2000/svg"
                          color="systemGrayscale00"
                          size="32"
                          className="css-bao86z"
                        >
                          <path
                            d="M28.667 16.292c0-.861-.071-1.727-.223-2.574H16.255v4.878h6.98a5.857 5.857 0 01-2.583 3.849v3.165h4.164c2.445-2.206 3.85-5.464 3.85-9.318z"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M16.255 28.668c3.485 0 6.424-1.122 8.566-3.058l-4.164-3.165c-1.159.772-2.654 1.21-4.397 1.21-3.371 0-6.23-2.23-7.255-5.227H4.708v3.263c2.194 4.277 6.662 6.977 11.547 6.977z"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M9 18.428a7.445 7.445 0 010-4.85v-3.263H4.708a12.454 12.454 0 000 11.376L9 18.428z"
                            fill="#FBBC04"
                          ></path>
                          <path
                            d="M16.255 8.347a7.1 7.1 0 014.957 1.899l3.69-3.617a12.558 12.558 0 00-8.647-3.295c-4.885 0-9.353 2.7-11.547 6.982L9 13.578c1.021-3.002 3.884-5.231 7.255-5.231z"
                            fill="#EA4335"
                          ></path>
                        </svg>
                      }
                    >
                      Signup with Google
                    </Button>
                  </div>
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

                  <div style={{ margin: "20px" }}>
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
                  </div>
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
                  <div style={{ margin: "20px" }}>
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
                  </div>
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
                        size={64}
                        src={
                          <Image
                            src={filledData.image}
                            style={{ width: "64px", height: "64px" }}
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
                      SignUp
                    </Button>
                  </div>
                  <div style={{ fontSize: "smaller", marginBottom: "20px" }}>
                    Already registered ?{" "}
                    <u
                      style={{ cursor: "pointer" }}
                      className="linkHighlight"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      SignIn{" "}
                    </u>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{marginTop:"25vh"}}
        >
<Lottie options={defaultOptions1} height={270} width={270} />
        </Grid>
        
      </Grid>
    </>
  );
}

export default Signup;
