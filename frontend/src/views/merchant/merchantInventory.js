import { Grid, Paper, TextField, InputAdornment, Autocomplete, Button, Stack, Typography, Divider } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function MerchantInventory() {
    return (
        <>
            <Grid container sx={{ paddingTop: '20px' }}>
                <Grid xs={6}>
                    <Grid>Inventory</Grid>
                </Grid>
                <Grid xs={6}>
                    <Paper elevation={8} sx={{ width: '80%', margin: 'auto', marginTop: '20px', padding: '30px' }}>
                        <Typography variant="h4" gutterBottom>Add New Product</Typography>
                        <Divider variant="middle" />
                        <Stack spacing={3} sx={{ marginTop: '20px' }}>
                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth required label="SKU" variant="outlined" />
                                <TextField fullWidth required label="Name" variant="outlined" />
                            </Stack>
                            <TextField fullWidth required multiline maxRows={3} label="Description" variant="outlined" />
                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth required type="number" label="Quantity" variant="outlined" />
                                <TextField fullWidth required type="number" label="Price"
                                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, }} />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Autocomplete fullWidth required freeSolo options={options} renderInput={(params) => <TextField {...params} label="Brand" />} />
                                <Button fullWidth variant="contained" component="label" endIcon={<AddPhotoAlternateIcon />}><input hidden accept="image/*" type="file" />Upload Image</Button>
                            </Stack>
                            <Divider variant="middle" />
                            <Button fullWidth variant="contained" color="success">Add Product</Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

const options = [
    { label: 'Nestle', id: 1 },
    { label: 'Brooks', id: 2 },
];