
import React, { useEffect, useState, useRef } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Box } from "@mui/material";
import newsletter from "../animations/newsletter.json";
import newsletterimg from '../images/admin/newsletter-img.png';
import Lottie from "react-lottie";
import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { Navigate, useNavigate } from "react-router-dom";
import { subscribeToNewsletter } from '../reducers/actions';
import { displayMessage, displayError } from '../utils/messages'

function NewsLetter() {
  const navigate = useNavigate();
  const data = {
    firstname: "",
    lastname: "",
    email: "",
  }
  const [filledData, setfilledData] = useState(data);

  const handleDataChange = (event) => {
    setfilledData({ ...filledData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async () => {

    if (filledData.firstname === "" ||
      filledData.lastname === "" ||
      filledData.email === "") {
      displayError("Please Enter All Details")
      return
    }
    try {
      const updatedNewsLetterResult = await subscribeToNewsletter(filledData)
      displayMessage(updatedNewsLetterResult.message)
      navigate("/");
    } catch (e) {
      displayError(e.error)
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: newsletter,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div style={{ backgroundColor: "#ffffff", position: "fixed", height: "100vh", width: "70vw" }}></div>
      <div style={{ height: "100vh", backgroundColor: "#ffffff", width: "50vw", marginLeft: "50vw", position: "fixed", borderTopLeftRadius: "70%" }}></div>
      <div style={{ position: "relative" }}>

        <Grid container spacing={2} sx={{ backgroundColor: "#aedbde", padding: "10px", top: 0 }}>
          <Grid item xs={3}>
            <Lottie options={defaultOptions} height={200} width={280} />
          </Grid>
          <Grid item xs={6}>
            <h1>Subscribe to our newsLetter</h1>
            <p>Whatever you want from local stores, brought right to your door.</p>
          </Grid>
          <Grid item xs={3}>
            <img src={newsletterimg} height='190'></img>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: "10px", paddingTop: "20px" }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ borderRadius: "10px" }, { paddingTop: "20px" }}>
              <div
                style={{
                  background: "#84bbf4",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                {/* <Lottie options={defaultOptions1} height={350} width={350} /> */}
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
                  value={filledData.firstname}
                  label="First Name"
                  size="small"
                  name="firstname"
                  variant="outlined"
                  onChange={handleDataChange}
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
                  value={filledData.lastname}
                  label="Last Name"
                  size="small"
                  name="lastname"
                  variant="outlined"
                  onChange={handleDataChange}
                />
              </div>
              <div style={{ margin: "20px" }}>
                <TextField fullWidth size="small"
                  value={filledData.email} name="email" id="email" variant="outlined" label="Email" InputProps={{
                    startAdornment: <InputAdornment position="start"><LocalPostOfficeIcon /></InputAdornment>,
                  }} onChange={handleDataChange}></TextField>
              </div>
              <div style={{ margin: "20px" }, { padding: "10px" }}>
                <Button variant="contained" onClick={handleSubmit}>Subscribe</Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={3}>
          </Grid >
        </Grid>
      </div>
    </>);
}
export default NewsLetter;