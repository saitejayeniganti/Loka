import { useEffect, useState } from "react";
import { Card, CardMedia, CardActions, Button, Typography, Grid, Divider, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { useOrders } from "../../views/merchant/customhooks/useOrders";
import { connect } from "react-redux";
import { displayMessage, displayError } from '../../utils/messages'
import { put } from '../../utils/serverCall'

const statusOptionsMap = {
    'Not processed': 0,
    'Processing': 1,
    'Shipped': 2,
    'Delivered': 3,
    'Cancelled': 4
}

const statusOptionsArray = ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

function OrderItem(props) {
    console.log(props)
    const [status, setStatus] = useState(props.product.status);
    const [statusOptions, setStatusOptions] = useState(statusOptionsArray.slice(statusOptionsMap[props.product.status]))

    useEffect(() => {
        setStatus(props.product.status)
        setStatusOptions(statusOptionsArray.slice(statusOptionsMap[props.product.status]))
    }, [props.product.status])

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const revertStatusChange = () => {
        setStatus(props.product.status);
    }

    const updateStatusChange = async () => {
        const orderId = props.orderId
        const productId = props.product._id
        const quantity = props.product.quantity

        const newOrderStatus = {
            orderId,
            productId,
            status,
            quantity
        }
        try {
            const updatedOrderStatus = await put(`/order/merchant/myOrder/update/`, newOrderStatus)
            displayMessage('Order Status Updated')
            props.fetchAllOrdersByMerchantId()
        } catch (e) {
            displayError(e.error)
        }
    }

    return (
        <>
            <Card sx={{ textAlign: 'left' }} raised>
                <CardMedia component="img" height="150" src={props.product.image} />
                <Grid container sx={{ padding: '10px' }}>
                    <Grid item xs={12}><Typography variant="h5" >{props.product.name}</Typography></Grid>
                    <Grid item xs={12}><Typography variant="subtitle1" >{`Purchase Price: $${props.product.purchasePrice}`}</Typography></Grid>
                    <Grid item xs={12}><Typography variant="subtitle1" >{`Quantity Bought: ${props.product.quantity}`}</Typography></Grid>
                    <Grid item xs={12}><Typography variant="subtitle1" >{`Price With Tax: $${props.product.priceWithTax}`}</Typography></Grid>
                    <Grid item xs={12}><Divider sx={{ opacity: '1' }} /></Grid>
                    <Grid item xs={12}><TextField fullWidth disabled multiline minRows={2} maxRows={2} variant="filled" label="Description" value={props.product.description} /></Grid>
                    <Grid item xs={12}><Divider sx={{ opacity: '1' }} /></Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={handleStatusChange}
                                disabled={props.product.status === 'Delivered' || props.product.status === 'Cancelled'}
                            >
                                {statusOptions.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingTop: '10px', paddingRight: '5px' }}><Button size="small" variant="outlined" onClick={revertStatusChange} color="error" disabled={props.product.status === 'Delivered' || props.product.status === 'Cancelled'}>Revert Status</Button></Grid>
                    <Grid item xs={6} sx={{ paddingTop: '10px', paddingLeft: '5px' }}><Button size="small" variant="outlined" onClick={updateStatusChange} disabled={props.product.status === 'Delivered' || props.product.status === 'Cancelled'}>Update Status</Button></Grid>
                </Grid>
            </Card>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.sessionReducer.user.id,
    };
};

export default connect(mapStateToProps)(OrderItem);