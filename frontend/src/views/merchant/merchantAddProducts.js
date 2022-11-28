import { useState } from 'react'
import { Grid, Paper, TextField, InputAdornment, Autocomplete, Button, Stack, Typography, Divider } from '@mui/material'
import Lottie from "react-lottie";
import addProducts from '../../animations/addProductsVendor.json'
import FileUpload from "../../components/FileUpload";
import { useBrand, useCategory } from "./customhooks/index"
import { addProduct } from '../../reducers/actions'
import { displayMessage, displayError } from '../../utils/messages'
import { connect } from "react-redux";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: addProducts,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

function MerchantAddProducts(props) {
    const defaultProductData = {
        sku: "",
        name: "",
        description: "",
        quantity: "",
        price: "",
        brand: "",
        category: "",
        image: "",
        merchant: props.id
    }

    const [productData, setProductData] = useState(defaultProductData)
    const { brandData, createBrand, fetchAllBrand } = useBrand()
    const { categoryData } = useCategory()
    console.log(categoryData)

    const handleProductDataChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleBrandAutoComplete = (event, newValue) => {
        setProductData({ ...productData, brand: newValue })
    }

    const handleCategoryAutoComplete = (event, newValue) => {
        setProductData({ ...productData, category: newValue })
    }

    const onAddProduct = async () => {
        if (productData.sku === "" ||
            productData.name === "" ||
            productData.description === "" ||
            productData.quantity === "" ||
            productData.price === "" ||
            productData.brand === "" ||
            productData.category === "" ||
            productData.image === "") {
            displayError("Please Enter All The Details")
            return
        }

        if (parseInt(productData.quantity) < 0) {
            displayError("Please Enter Valid Data For Quantity")
            return
        }

        if (parseInt(productData.price) < 0) {
            displayError("Please Enter Valid Data For Price")
            return
        }

        const brandName = productData.brand
        const foundBrand = brandData.filter(data => data.label === brandName)
        if (foundBrand.length === 0) {
            const createdBrandResult = await createBrand(brandName)
            productData.brand = createdBrandResult.brand._id
        } else {
            productData.brand = foundBrand[0].id
        }

        const categoryName = productData.category
        const foundCategory = categoryData.filter(data => data.label === categoryName)
        productData.category = foundCategory[0].id

        try {
            const addProductResult = await addProduct(productData)
            displayMessage(addProductResult.message)
            fetchAllBrand()
            setProductData(defaultProductData)
        } catch (e) {
            displayError(e.error)
            setProductData(defaultProductData)
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
                                <TextField fullWidth required label="SKU" name="sku" variant="outlined" value={productData.sku} onChange={handleProductDataChange} />
                                <TextField fullWidth required label="Name" name="name" variant="outlined" value={productData.name} onChange={handleProductDataChange} />
                            </Stack>
                            <TextField fullWidth required multiline maxRows={3} label="Description" name="description" variant="outlined" value={productData.description} onChange={handleProductDataChange} />
                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth required type="number" label="Quantity" name="quantity" variant="outlined" value={productData.quantity} onChange={handleProductDataChange} />
                                <TextField fullWidth required type="number" label="Price" name="price"
                                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, }} value={productData.price} onChange={handleProductDataChange} />
                            </Stack>
                            <Autocomplete freeSolo fullWidth required options={brandData} renderInput={(params) => <TextField {...params} label="Brand" />} value={productData.brand} onInputChange={handleBrandAutoComplete} />
                            <Autocomplete required options={categoryData} renderInput={(params) => <TextField {...params} label="Category" />} value={productData.category} onInputChange={handleCategoryAutoComplete} />
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

const mapStateToProps = (state) => {
    return {
        id: state.sessionReducer.user.id,
    };
};

export default connect(mapStateToProps)(MerchantAddProducts);