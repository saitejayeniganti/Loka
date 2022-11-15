import React from "react";
import shopLanding from '../../images/merchant/shopLandingPage.jpg'
import sampleProduct from '../../images/merchant/sampleProduct.jpg'
import MerchantFooter from "../../components/footer/merchantFooter";
import ProductCard from '../../components/ProductCard';
import { Grid } from '@mui/material'

function MerchantHome() {
  return (
    <>
      <div style={{ position: "relative" }}>
        <img src={shopLanding} style={{ width: "100%", height: "300px" }}></img>
        <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Welcome To Your Store!</h1>
      </div>
      <div>
        <h2>Top Products</h2>
        <Grid container spacing={1} sx={{ padding: '10px' }}>
          <Grid item><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
          <Grid item><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
          <Grid item><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
          <Grid item><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
          <Grid item><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
          <Grid item><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
        </Grid>
      </div>
      <MerchantFooter />
    </>
  );
}

export default MerchantHome;