import { Grid } from '@mui/material'

export default function MerchantInventory() {
    return (
        <>
            <Grid container sx={{ paddingTop: '20px' }}>
                <Grid xs={6}>
                    <Grid>Inventory</Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid container direction='column' rowSpacing={10}>
                        <Grid item>Products Form</Grid>
                        <Grid item>Products Form</Grid>
                        <Grid item>Products Form</Grid>
                        <Grid item>Products Form</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}