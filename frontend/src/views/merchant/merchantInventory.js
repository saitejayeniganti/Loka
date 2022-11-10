import React from "react";
import shopInventory from '../../images/merchant/shopInventory.jpg'
import sampleProduct from '../../images/merchant/sampleProduct.jpg'
import ProductCard from '../../components/ProductCard';
import { Grid } from '@mui/material'

export default function MerchantInventory() {
    return (
        <>
            <div style={{ position: "relative" }}>
                <img src={shopInventory} style={{ width: "100%", height: "300px" }}></img>
                <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Your Inventory</h1>
            </div>
            <div>
                <Grid container spacing={1} sx={{ padding: '10px' }}>
                    <Grid item xs={3} lg={2}><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} isMerchant /></Grid>
                    <Grid item xs={3} lg={2}><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
                    <Grid item xs={3} lg={2}><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
                    <Grid item xs={3} lg={2}><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
                    <Grid item xs={3} lg={2}><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
                    <Grid item xs={3} lg={2}><ProductCard title={'Tomato'} description={'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America.'} image={sampleProduct} price={10} quantity={20} brand={'SpanishGreens'} /></Grid>
                </Grid>
            </div>
            <a href="https://www.freepik.com/free-vector/warehouse-interior-with-cardboard-boxes-racks_7741532.htm#query=inventory&position=0&from_view=search&track=sph">Image by upklyak</a> on Freepik
        </>
    )
}