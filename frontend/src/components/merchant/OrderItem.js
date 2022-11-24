import { useState } from "react";
import { Card, CardMedia, CardActions, Button, Typography, Grid, Divider, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'

function OrderItem(props) {
    console.log(props)
    const [status, setStatus] = useState(props.product.status);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const revertStatusChange = () => {
        setStatus(props.product.status);
    }

    const updateStatusChange = () => {
        console.log(status)
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
                    <Grid item xs={12}><TextField fullWidth disabled multiline minRows={3} maxRows={3} variant="filled" label="Description" value={props.product.description} /></Grid>
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
                            >
                                <MenuItem value={'Not processed'}>Not processed</MenuItem>
                                <MenuItem value={'Processing'}>Processing</MenuItem>
                                <MenuItem value={'Shipped'}>Shipped</MenuItem>
                                <MenuItem value={'Delivered'}>Delivered</MenuItem>
                                <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingTop: '10px', paddingRight: '5px' }}>{<Button size="small" variant="outlined" onClick={revertStatusChange} color="error">Revert Status</Button>}</Grid>
                    <Grid item xs={6} sx={{ paddingTop: '10px', paddingLeft: '5px' }}>{<Button size="small" variant="outlined" onClick={updateStatusChange}>Update Status</Button>}</Grid>
                </Grid>
            </Card>
        </>
    )
}

export default OrderItem