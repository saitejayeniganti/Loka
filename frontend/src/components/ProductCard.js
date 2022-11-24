import React from "react";
import { Card, CardMedia, CardActions, Button, Typography, Grid, Stack, Divider, TextField } from '@mui/material'

export default function ProductCard(props) {
    return (
        <>
            <Card sx={{ maxWidth: 300, textAlign: 'left' }} raised>
                <CardMedia component="img" height="200" src={props.singleItem.image} />
                <Stack spacing={1} sx={{ padding: "15px" }}>
                    <Typography variant="h5" >{props.singleItem.name}</Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Typography variant="subtitle1" >{`Price: $${props.singleItem.price}`}</Typography>
                        <Typography variant="subtitle1" >{`Quantity: ${props.singleItem.quantity}`}</Typography>
                    </Stack>
                    <Typography variant="subtitle1" >{`Brand: ${props.singleItem.brand.name}`}</Typography>
                    <Typography variant="subtitle1" >{`Category: ${props.singleItem.category.name}`}</Typography>
                    <Divider sx={{ opacity: '1' }} />
                    <TextField fullWidth disabled multiline minRows={3} maxRows={3} variant="filled" label="Description" value={props.singleItem.description} />
                    <Divider sx={{ opacity: '1' }} />
                    <CardActions>
                        <Grid container spacing={1} justifyContent="flex-end">
                            <Grid item> {props.isMerchant && <Button size="small" variant="outlined" onClick={() => props.handleOpenDeleteDialog(props.singleItem._id)} color="error">Delete</Button>}</Grid>
                            <Grid item>{props.isMerchant && <Button size="small" variant="outlined" onClick={() => props.handleOpenUpdateModal(props.singleItem)} >Edit</Button>}</Grid>
                        </Grid>
                    </CardActions>
                </Stack>
            </Card>
        </>
    )
}