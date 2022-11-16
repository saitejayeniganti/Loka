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
import { Navigate, useNavigate } from "react-router-dom";

export default function MapDistance({ leg, vendor }) {
  const navigate = useNavigate();
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
          height="100"
          image={vendor.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {vendor.storeName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            add description or rating
          </Typography>
          <Typography variant="body2">
            {leg.distance.text} away from your location
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              return navigate("/customermerchant?id=" + vendor._id);
            }}
          >
            Go to store page
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <div>
      {/* <div>
        <p>
          This Merchant is{" "}
          <span className="highlight">{leg.distance.text}</span> away from your
          location.
        </p>
      </div> */}
      {vendorCard()}
    </div>
  );
}
