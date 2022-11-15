import { useState } from 'react'
import { Grid, Paper, TextField, InputAdornment, Autocomplete, Button, Stack, Typography, Divider } from '@mui/material'
import Lottie from "react-lottie";
import addProducts from '../../animations/addProductsVendor.json'
import FileUpload from "../../components/FileUpload";
import { useBrand } from "./customhooks/index"
import { addProduct } from '../../reducers/actions'
import { displayMessage, displayError } from '../../utils/messages'

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
    image: "",
    merchant: sessionStorage.getItem("id")
}

export default function MerchantAddProducts() {
    const [productData, setProductData] = useState(defaultProductData)
    const { brandData } = useBrand()

    const handleProductDataChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleBrandAutoComplete = (event, newValue) => {
        setProductData({ ...productData, brand: newValue.id })
    }

    const onAddProduct = async () => {
        if (productData.sku === "" ||
            productData.name === "" ||
            productData.description === "" ||
            productData.quantity === "" ||
            productData.price === "" ||
            productData.brand === "" ||
            productData.image === "") {
            displayError("Please Enter All The Details")
            return
        }
        try {
            const addProductResult = await addProduct(productData)
            displayMessage(addProductResult.message)
        } catch (e) {
            displayError(e.error)
        }
    }

    return (
        <>
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
                            <Autocomplete fullWidth required freeSolo options={brandData} renderInput={(params) => <TextField {...params} label="Brand" />} onChange={handleBrandAutoComplete} />
                            <div><p>Image Upload</p>
                                <FileUpload
                                    callback={(imageURL) => {
                                        displayMessage("Image Uploaded Successfully")
                                        setProductData({ ...productData, image: imageURL })
                                    }}
                                    fileName={productData.brand + productData.name + productData.sku}
                                    folderPath="merchantProductsImages/"
                                /></div>
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