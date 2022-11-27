import React from "react";
import shopInventory from '../../images/merchant/shopInventory.jpg'
import ProductCard from '../../components/ProductCard';
import EditProductModal from '../../components/merchant/EditProductModal'
import DeleteProductDialog from '../../components/merchant/DeleteProductDialog'
import { Grid } from '@mui/material'
import { useInventory } from './customhooks/index'
import { useState } from 'react'
import { connect } from "react-redux";

function MerchantInventory(props) {
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [liftedProductData, setLiftedProductData] = useState({})
    const [liftedDeleteProductId, setLiftedDeleteProductId] = useState("")
    const handleOpenUpdateModal = (singleProductData) => {
        setLiftedProductData(singleProductData)
        setOpenUpdateModal(true)
    }
    const handleCloseUpdateModal = () => setOpenUpdateModal(false)

    const handleOpenDeleteDialog = (productId) => {
        setLiftedDeleteProductId(productId)
        setOpenDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

    const { inventory, fetchAllProductsByMerchantId } = useInventory(props.id)

    return (
        <>
            <div style={{ position: "relative" }}>
                <img src={shopInventory} style={{ width: "100%", height: "300px" }}></img>
                <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Your Inventory</h1>
            </div>
            <div>
                {inventory.length == 0 && <h1>Your Inventory Is Empty</h1>}
                <Grid container spacing={1} sx={{ padding: '10px' }}>
                    {inventory.map((singleItem) => {
                        return (<Grid item xs={3} lg={2} key={singleItem._id}><ProductCard singleItem={singleItem} isMerchant handleOpenUpdateModal={handleOpenUpdateModal} handleOpenDeleteDialog={handleOpenDeleteDialog} /></Grid>)
                    })
                    }
                </Grid>
                <EditProductModal open={openUpdateModal} handleClose={handleCloseUpdateModal} liftedProductData={liftedProductData} fetchAllProductsByMerchantId={fetchAllProductsByMerchantId} />
                <DeleteProductDialog open={openDeleteDialog} handleClose={handleCloseDeleteDialog} liftedDeleteProductId={liftedDeleteProductId} fetchAllProductsByMerchantId={fetchAllProductsByMerchantId} />
            </div>
            <a href="https://www.freepik.com/free-vector/warehouse-interior-with-cardboard-boxes-racks_7741532.htm#query=inventory&position=0&from_view=search&track=sph">Image by upklyak</a> on Freepik
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.sessionReducer.user.id,
    };
};

export default connect(mapStateToProps)(MerchantInventory);