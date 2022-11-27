import React from "react";
import shopLanding from '../../images/merchant/shopLandingPage.jpg'
import MerchantFooter from "../../components/footer/merchantFooter";
import { Grid, Box, Paper } from '@mui/material'
import addProductsMerchantHome from '../../images/merchant/addProductsMerchantHome.jpg'
import inventoryMerchantHome from '../../images/merchant/inventoryMerchantHome.jpg'
import ordersMerchantHome from '../../images/merchant/ordersMerchantHome.jpg'
import analyticsMerchantHome from '../../images/merchant/analyticsMerchantHome.jpg'
import { useNavigate } from "react-router-dom";

function MerchantHome() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ position: "relative" }}>
        <img src={shopLanding} style={{ width: "100%", height: "300px" }}></img>
        <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Welcome To Your Store!</h1>
      </div>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        <Grid item xs={3} onClick={() => navigate("/merchantaddproducts")}>
          <Paper elevation={3} sx={{
            cursor: "pointer", '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
            <Grid item xs={12} sx={{ height: '30px', paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>ADD PRODUCT</h4></Grid>
            <Grid item xs={12} sx={{ height: '170px' }}><img style={{ height: '170px' }} src={addProductsMerchantHome}></img></Grid>
          </Paper>
        </Grid>
        <Grid item xs={3} onClick={() => navigate("/merchantinventory")}><Paper elevation={3} sx={{
          cursor: "pointer", '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
        }}>
          <Grid item xs={12} sx={{ height: '30px', paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>INVENTORY</h4></Grid>
          <Grid item xs={12} sx={{ height: '170px', paddingTop: '5px' }}><img style={{ height: '150px' }} src={inventoryMerchantHome}></img></Grid>
        </Paper>
        </Grid>
        <Grid item xs={3} onClick={() => navigate("/merchantorders")}><Paper elevation={3} sx={{
          cursor: "pointer", '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
        }}>
          <Grid item xs={12} sx={{ height: '30px', paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>ORDERS</h4></Grid>
          <Grid item xs={12} sx={{ height: '170px', paddingTop: '5px' }}><img style={{ height: '150px' }} src={ordersMerchantHome}></img></Grid>
        </Paper>
        </Grid>
        <Grid item xs={3} onClick={() => navigate("/merchantanalytics")}><Paper elevation={3} sx={{
          cursor: "pointer", '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
        }}>
          <Grid item xs={12} sx={{ height: '30px', paddingTop: '5px' }}><h4 style={{ fontWeight: 'bold' }}>ANALYTICS</h4></Grid>
          <Grid item xs={12} sx={{ height: '170px', paddingTop: '5px' }}><img style={{ height: '150px' }} src={analyticsMerchantHome}></img></Grid>
        </Paper>
        </Grid>
      </Grid>
      <MerchantFooter />
    </>
  );
}

export default MerchantHome;