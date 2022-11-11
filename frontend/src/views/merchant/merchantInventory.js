import React from "react";
import shopInventory from '../../images/merchant/shopInventory.jpg'
import ProductCard from '../../components/ProductCard';
import EditProductModal from '../../components/merchant/EditProductModal'
import { Grid } from '@mui/material'
import { useInventory } from './customhooks/index'
import { useState, useEffect } from 'react'

export default function MerchantInventory() {
    const [open, setOpen] = useState(false)
    const [liftedProductData, setLiftedProductData] = useState({})
    const handleOpen = (singleProductData) => {
        setLiftedProductData(singleProductData)
        setOpen(true)
    }
    const handleClose = () => setOpen(false)

    const { inventory, fetchAllProductsByMerchantId } = useInventory()

    useEffect(() => {
        fetchAllProductsByMerchantId("636458aacdca6561d00fe6e4")
    }, [])

    return (
        <>
            <div style={{ position: "relative" }}>
                <img src={shopInventory} style={{ width: "100%", height: "300px" }}></img>
                <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Your Inventory</h1>
            </div>
            <div>
                <Grid container spacing={1} sx={{ padding: '10px' }}>
                    {inventory.map((singleItem) => {
                        return (<Grid item xs={3} lg={2} key={singleItem._id}><ProductCard singleItem={singleItem} isMerchant handleOpen={handleOpen} /></Grid>)
                    })
                    }
                </Grid>
                <EditProductModal open={open} handleClose={handleClose} liftedProductData={liftedProductData} />
            </div>
            <a href="https://www.freepik.com/free-vector/warehouse-interior-with-cardboard-boxes-racks_7741532.htm#query=inventory&position=0&from_view=search&track=sph">Image by upklyak</a> on Freepik
        </>
    )
}