import { useEffect, useState } from "react";
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Divider, FormControl, InputLabel, Button, Select, MenuItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderItem from './OrderItem'
import { put } from '../../utils/serverCall'
import { displayMessage } from '../../utils/messages'

const statusOptionsMap = {
    'Not processed': 0,
    'Processing': 1,
    'Shipped': 2,
    'Delivered': 3,
    'Cancelled': 4
}

const statusOptionsArray = ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

function OrderCard(props) {
    let key = 0
    const products = props.order.products
    let minIndex = 4
    let maxIndex = 0
    products.forEach((product) => {
        minIndex = Math.min(minIndex, statusOptionsMap[product.status])
        maxIndex = Math.max(maxIndex, statusOptionsMap[product.status])
        maxIndex = Math.min(maxIndex, 3)
    })
    const possibleStatusOptions = statusOptionsArray.slice(maxIndex)

    const [expand, setExpand] = useState(false)
    const toggleExpand = () => {
        setExpand((prev) => !prev)
    }

    const [status, setStatus] = useState(possibleStatusOptions[0]);
    useEffect(() => {
        setStatus(possibleStatusOptions[0])
    }, [maxIndex])
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const updateAllStatusChange = () => {
        const orderId = props.order._id
        const filteredProducts = products.filter(product => product.status != 'Delivered' && product.status != 'Cancelled')
        const filteredProductsIdAndQuantity = filteredProducts.map(product => [product._id, product.quantity])
        const promiseArray = filteredProductsIdAndQuantity.map((item) => {
            const productId = item[0]
            const quantity = item[1]

            const newOrderStatus = {
                orderId,
                productId,
                status,
                quantity
            }

            return put(`/order/merchant/myOrder/update/`, newOrderStatus)
        })
        Promise.all(promiseArray).then(() => {
            displayMessage('All Product Status Updated')
            props.fetchAllOrdersByMerchantId()
        })
    }

    return (
        <>
            <Accordion expanded={expand}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon onClick={() => toggleExpand()} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid container spacing={1} sx={{ textAlign: 'left' }}>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Order ID: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{props.order._id}</span></div></Grid>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Customer Name: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{`${props.order.user.firstName} ${props.order.user.lastName}`}</span></div></Grid>
                        <Grid item xs={12}><Divider sx={{ opacity: '1' }} /></Grid>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Customer Email: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{props.order.user.email}</span></div></Grid>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Customer Phone: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{props.order.user.phone}</span></div></Grid>
                        <Grid item xs={12}><Divider sx={{ opacity: '1' }} /></Grid>
                        <Grid item xs={6}><div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Order On: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>{new Date(props.order.created).toString()}</span></div></Grid>
                        <Grid item xs={3}>{minIndex < 3 && <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Order Status"
                                onChange={handleStatusChange}
                            >
                                {possibleStatusOptions.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                            </Select>
                        </FormControl>}
                            {minIndex >= 3 && <div><span style={{ fontWeight: 'bold', fontVariant: 'small-caps', fontSize: '18px' }}>Order Status: </span><span style={{ fontStyle: 'italic', fontSize: '15px' }}>Completed</span></div>}
                        </Grid>
                        <Grid item xs={3}><Button sx={{ height: '56px' }} variant="outlined" onClick={updateAllStatusChange} disabled={minIndex >= 3}>Update All Status</Button></Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        {props.order.products.map((product) => {
                            const itemKey = key;
                            key++;
                            return <Grid item xs={3} key={itemKey}><OrderItem orderId={props.order._id} product={product} fetchAllOrdersByMerchantId={props.fetchAllOrdersByMerchantId} /></Grid>
                        }
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default OrderCard