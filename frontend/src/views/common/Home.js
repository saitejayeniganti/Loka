import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import man from "../../animations/man.json";
import delivery from "../../animations/delivery.json";
import Lottie from "react-lottie";
import Paper from "@mui/material/Paper";
import merchantIcon from "../../images/merchant/merchant.png";
import customerIcon from "../../images/customer/customer.png";
import { Navigate } from "react-router-dom";

function Home(userDetails) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: man,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions1 = {
    loop: false,
    autoplay: true,
    animationData: delivery,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    console.log("user", userDetails);
    if (userDetails.user && userDetails.user.temp === 0) {
      setRedirect(true);
    }
  }, [userDetails]);

  if (userDetails.isLoggedIn || redirect) {
    const user = userDetails.user;
    console.log("role", user.role);
    if (user.role == 0) {
      return <Navigate to={"/customerhome"} />;
    } else if (user.role == 1) {
      return <Navigate to={"/merchanthome"} />;
    } else if (user.role == 2) {
      return <Navigate to={"/adminhome"} />;
    }
  } else {
    return <Navigate to={"/customerhome"} />;
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(45deg, #F9EA8F 30%, #AFF1DA 90%)",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={8}>
          <Lottie options={defaultOptions} height={900} width={900} />
        </Grid>
        <Grid item xs={3} style={{ padding: "20px", marginTop: "5%" }}>
          <Paper elevation={5} sx={{ padding: "25px", borderRadius: "15px" }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Lottie options={defaultOptions1} height={300} width={300} />
              </Grid>

              <Grid item xs={3}>
                <img
                  src={merchantIcon}
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </Grid>
              <Grid item xs={7} style={{ cursor: "pointer" }}>
                <div
                  style={{
                    marginTop: "10%",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  SignIn as Merchant
                </div>
              </Grid>

              <Grid item xs={3}>
                <img
                  src={customerIcon}
                  style={{ marginLeft: "10px", width: "100%", height: "100%" }}
                ></img>
              </Grid>
              <Grid item xs={7} style={{ cursor: "pointer" }}>
                <div
                  style={{
                    marginTop: "10%",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  SignIn as Customer
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
