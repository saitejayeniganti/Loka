import React from "react";
import { Card, CardMedia, CardActions, Button, Typography, Grid, Stack, Divider } from '@mui/material'

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
                    <Divider sx={{ opacity: '1' }} />
                    <Typography variant="body1" color="text.secondary" align="justify">
                        {props.singleItem.description}
                    </Typography>
                    <Divider sx={{ opacity: '1' }} />
                    <CardActions>
                        <Grid container spacing={1} justifyContent="flex-end">
                            <Grid item>{props.isMerchant && <Button size="small" variant="outlined" onClick={() => props.handleOpenUpdateModal(props.singleItem)} >Edit</Button>}</Grid>
                            <Grid item> {props.isMerchant && <Button size="small" variant="outlined" onClick={() => props.handleOpenDeleteDialog(props.singleItem._id)} color="error">Delete</Button>}</Grid>
                        </Grid>
                    </CardActions>
                </Stack>
            </Card>
        </>
    )
}