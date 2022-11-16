const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;
import { Grid, Paper } from "@mui/material";
import React from "react";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import delivery from "../images/merchant/delivery.png";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MapDistance({ leg, vendor }) {
  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  const vendorCard = () => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={vendor.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {vendor.storeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            add description or rating
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Go to store page</Button>
        </CardActions>
      </Card>
    );
  };

  const vendorComp = () => {
    return (
      <div>
        <Paper
          key={vendor._id}
          elevation={3}
          sx={{
            maxWidth: "20%",
            borderRadius: "10px",
            padding: "0px !important",
            marginLeft: "30px",
            marginTop: "25px",
            cursor: "pointer",
          }}
        >
          <Grid container spacing={0}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "140px",
                padding: "10px",
              }}
              title="Redirect to merchant"
              onClick={() => redirectToMerchant()}
            >
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: "0.1rem",
                  borderColor: "#d3d3d3",
                  borderRadius: "50%",
                  marginLeft: "10px",
                }}
              >
                <img
                  src={vendor.image ? vendor.image : cost}
                  style={{
                    borderColor: "black",
                    padding: "0px !important",
                    height: "100%",
                    width: "100%",
                  }}
                ></img>
              </div>
            </Grid>
            <Grid
              container
              xs={8}
              sx={{
                background: "#e5e8e8",
                padding: "0px !important",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                padding: "10px",
              }}
            >
              <Grid item xs={6}>
                <div style={{ textAlign: "left" }}>{vendor.storeName}</div>
              </Grid>
              <Grid item xs={4}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    borderRadius: "45px",
                    paddingTop: "2px",
                    paddingBottom: "3px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "left",
                      marginTop: "2px",
                      fontSize: "14px",
                    }}
                  >
                    {vendor.rating} &nbsp;
                  </div>
                  <div style={{ color: "#FFD700" }}>
                    <StarPurple500SharpIcon fontSize="medium" />
                  </div>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={1}
                sx={{ marginTop: "2px", opacity: "60%" }}
                title="Save Merchant"
              >
                <BookmarkRoundedIcon
                  color=""
                  onClick={() => saveMerchantIcon()}
                />
              </Grid>
              {/* vendor.categories && <Grid item xs={12}>
                  <div style={{ textAlign: "left", fontSize: "13px" }}>
                    {vendor.categories[0]}
                    {vendor.categories.slice(1, 2).map((v) => (
                      <>
                        {" - "}
                        {v}{" "}
                      </>
                    ))}{" "}
                    ..
                  </div>
                </Grid> */}

              <Grid item xs={12}>
                <div style={{ textAlign: "left", fontSize: "13px" }}>
                  opening and close timings
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <div style={{ textAlign: "left", display: "flex" }}>
                  <img
                    src={delivery}
                    style={{
                      width: "20px",
                      height: "20px",
                      display: "inline-block",
                    }}
                  ></img>
                  &nbsp;
                  <div
                    style={{
                      color: "rgb(10 173 10)",
                      fontSize: "12px",
                      display: "inline-block",
                      marginTop: "5px",
                    }}
                  >
                    {vendor.driveTime}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };

  return (
    <div>
      <div>
        <p>
          This Merchant is{" "}
          <span className="highlight">{leg.distance.text}</span> away from your
          location.
        </p>
      </div>
      {vendorCard()}
    </div>
  );
}
