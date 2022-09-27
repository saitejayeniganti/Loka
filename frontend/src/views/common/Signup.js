import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { get, post } from "../../utils/serverCall";

function Signup(userDetails) {
  const user = userDetails.user;
  const [externalSignup, setExternalSignUp] = useState(false);
  const defaultFilledData = {
    firstName: "",
    lastName: "",
    email: "",
    externalId: "",
    provider: "",
  };
  const [filledData, setFilledData] = useState(defaultFilledData);

  const gSignup = (e) => {
    e.preventDefault();
    window.open(
      process.env.REACT_APP_NODE_SERVER + "/auth/gSignup/callback",
      "_self"
    );
  };

  useEffect(() => {
    user && setExternalSignUp(true);
    setFilledData((prev) => {
      return {
        ...prev,
        firstName: user ? user.firstName : "",
        lastName: user ? user.lastName : "",
        email: user ? user.emails[0].value : "",
        externalId: user ? user.id : "",
        provider: user ? user.provider : "",
      };
    });
  }, [userDetails.user]);

  const eventHandler = (e) => {
    setFilledData({ ...filledData, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    post("/auth/signup", filledData).then((res) => {
      console.log(res);
    });
  };

  if (userDetails.isLoggedIn) {
    <Navigate to={"/"} />;
  }

  return (
    <div>
      <h1>This is Signup page.</h1>
      <Button variant="outlined" onClick={gSignup} disabled={externalSignup}>
        Continue with Google
      </Button>

      <TextField
        id="signup-name"
        label="First Name"
        name="firstName"
        value={filledData.firstName}
        onChange={eventHandler}
      />

      <TextField
        id="signup-name"
        label="Last Name"
        name="lastName"
        value={filledData.lastName}
        onChange={eventHandler}
      />

      <TextField
        id="signup-name"
        label="Email"
        name="email"
        disabled={externalSignup}
        value={filledData.email}
        onChange={eventHandler}
      />

      <Button variant="outlined" onClick={signup}>
        Submit
      </Button>
    </div>
  );
}

export default Signup;
