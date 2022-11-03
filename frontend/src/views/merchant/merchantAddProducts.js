import { useState, useEffect } from 'react'
import { Grid, Paper, TextField, InputAdornment, Autocomplete, Button, Stack, Typography, Divider, Alert } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Lottie from "react-lottie";
import addProducts from '../../animations/addProductsVendor.json'
import FileUpload from "../../components/FileUpload";
import { useBrand } from "./customhooks/index"

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: addProducts,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const defaultProductData = {
    sku: "",
    name: "",
    description: "",
    quantity: "",
    price: "",
    brand: "",
    image: ""
}

export default function MerchantAddProducts() {
    const [productData, setProductData] = useState(defaultProductData)
    const [incompleteFieldFlag, setIncompleteFieldFlag] = useState(false)
    const [imageUploadFlag, setImageUploadFlag] = useState(false)
    const { brandData } = useBrand()

    const handleProductDataChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleBrandAutoComplete = (event, newValue) => {
        setProductData({ ...productData, brand: newValue })
    }

    const onAddProduct = () => {
        if (productData.sku === "" ||
            productData.name === "" ||
            productData.description === "" ||
            productData.quantity === "" ||
            productData.price === "" ||
            productData.brand === "" ||
            productData.image === "") {
            setIncompleteFieldFlag(true)
            return
        }
    }

    return (
        <>
            <div style={{ width: "50%", margin: "auto", paddingTop: "10px" }}>
                {incompleteFieldFlag && <Alert onClose={() => setIncompleteFieldFlag(false)} severity="error">Please Enter All The Details</Alert>}
                {imageUploadFlag && <Alert onClose={() => setImageUploadFlag(false)} severity="success">Image Uploaded Successfully</Alert>}
            </div>
            <Grid container sx={{ paddingTop: '20px' }}>
                <Grid xs={6}>
                    <Grid><Lottie options={defaultOptions} height={500} width={500} /></Grid>
                </Grid>
                <Grid xs={6}>
                    <Paper elevation={8} sx={{ width: '80%', margin: 'auto', marginTop: '20px', padding: '30px' }}>
                        <Typography variant="h4" gutterBottom>Add New Product</Typography>
                        <Divider variant="middle" />
                        <Stack spacing={3} sx={{ marginTop: '20px' }}>
                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth required label="SKU" name="sku" variant="outlined" onChange={handleProductDataChange} />
                                <TextField fullWidth required label="Name" name="name" variant="outlined" onChange={handleProductDataChange} />
                            </Stack>
                            <TextField fullWidth required multiline maxRows={3} label="Description" name="description" variant="outlined" onChange={handleProductDataChange} />
                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth required type="number" label="Quantity" name="quantity" variant="outlined" onChange={handleProductDataChange} />
                                <TextField fullWidth required type="number" label="Price" name="price"
                                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, }} onChange={handleProductDataChange} />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Autocomplete fullWidth required freeSolo options={brandData} renderInput={(params) => <TextField {...params} label="Brand" />} onInputChange={handleBrandAutoComplete} />
                                <FileUpload
                                    callback={(imageURL) => {
                                        setImageUploadFlag(true)
                                        setProductData({ ...productData, image: imageURL })
                                    }}
                                    fileName={productData.brand + productData.name + productData.sku}
                                    folderPath="merchantProductsImages/"
                                />
                            </Stack>
                            <Divider variant="middle" />
                            <Button fullWidth variant="contained" color="success" onClick={onAddProduct}>Add Product</Button>
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