import React from "react";
import { Card, CardMedia, CardActions, Button, Typography, Grid, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

function OrderItem(props) {
    console.log(props)
    const [age, setAge] = React.useState(props.product.status);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
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
                    <Grid item xs={12}><Typography variant="body1" color="text.secondary" align="justify">{props.product.description}</Typography></Grid>
                    <Grid item xs={12}><Divider sx={{ opacity: '1' }} /></Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.product.status}
                                label="Status"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Not processed'}>Not processed</MenuItem>
                                <MenuItem value={'Processing'}>Processing</MenuItem>
                                <MenuItem value={'Shipped'}>Shipped</MenuItem>
                                <MenuItem value={'Delivered'}>Delivered</MenuItem>
                                <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px' }}>{<Button size="small" variant="outlined" onClick={() => props.handleOpenUpdateModal(props.singleItem)} sx={{ float: "right" }}>Update Status</Button>}</Grid>
                </Grid>
            </Card>
        </>
    )
}

export default OrderItem