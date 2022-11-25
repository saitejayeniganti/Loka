import {
  Grid,
  Rating,
  Typography,
  Button,
  Divider,
  TextField,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import * as actions from "../../reducers/actions";
import { connect, useSelector } from "react-redux";
import { clearCart } from "../../reducers/actions";

const Product = (props) => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const productId = params.get("id");

  const [addedToCard, setAddedToCart] = useState(false);

  const cartState = useSelector((state) => state.cartReducer);

  const [cartMerchant, setCartMerchant] = useState("");
  useEffect(() => {
    console.log("cart state: ", cartState);
    if (cartState.items.length != 0) {
      setCartMerchant(cartState.items[0].merchant);
    }
  }, [cartState]);
  useEffect(() => {
    props.fetchProductById(productId);
  }, []);

  useEffect(() => {
    props.fetchReviewById(productId);
  }, []);

  const addToCart = () => {
    if (cartMerchant != "" && props.product.merchant != cartMerchant) {
      // alert("wrong merchant");
      handleOpen();
    } else {
      props.addToCart(props.product);
      setAddedToCart(true);
    }
  };

  const handleAddToCartClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAddedToCart(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearCart = () => {
    props.clearCart();
    props.addToCart(props.product);
    setAddedToCart(true);
    handleClose();
  };

  return (
    <>
      <Grid sx={{ mb: 5, mt: 5 }} container spacing={2}>
        <Grid item md={2}></Grid>
        <Grid item md={4}>
          <Box
            sx={{ width: "100%" }}
            component="img"
            src={props.product?.image}
          />
        </Grid>
        <Grid item md={4} mt={5} textAlign="left">
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {props.product?.name}
          </Typography>
          <Typography variant="body2">{props.product?.description}</Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#ff6d00" }}
          >
            {props.product?.price}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "gray" }}>
            $5.95 for shipping
          </Typography>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
            }}
          >
            <Rating name="half-rating" defaultValue={4.9} precision={0.5} />
            <Typography>4.9</Typography>
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
            }}
          >
            {props.product && props.product.quantity > 0 && (
              <Button
                onClick={addToCart}
                justifyContent="left"
                variant="contained"
              >
                Add to Cart
              </Button>
            )}
            {props.product && props.product.quantity <= 0 && (
              <Typography variant="h5">Out of Stock</Typography>
            )}
          </Box>
          <Snackbar
            open={addedToCard}
            autoHideDuration={1000}
            onClose={handleAddToCartClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message="Added to the cart"
          />
        </Grid>
      </Grid>
      <Grid sx={{ mb: 5, mt: 5 }} container spacing={2}>
        <Grid md={3}></Grid>
        <Grid item md={4} mt={5} textAlign="left">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Customer Ratings
          </Typography>
          <br />
          {props.reviews.map((review, index) => (
            <>
              <Typography variant="body" sx={{ fontWeight: "bold" }}>
                Adam
              </Typography>
              <br />
              <Rating name="half-rating" defaultValue={4.8} precision={0.5} />
              <br />
              <Typography variant="body" sx={{ fontWeight: "bold" }}>
                {review.title}
              </Typography>
              <Typography variant="body2">
                Vintage Typewriter to post awesome stories about UI design and
                webdev. Vintage Typewriter to post awesome stories about UI
                design and webdev. Vintage Typewriter to post awesome stories
                about UI design and webdev.
              </Typography>
              <br />
            </>
          ))}
          <Typography variant="body" sx={{ fontWeight: "bold" }}>
            Gilchrist
          </Typography>
          <br />
          <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
          <br />
          <Typography variant="body" sx={{ fontWeight: "bold" }}>
            Faster delivery
          </Typography>
          <Typography variant="body2">
            Vintage Typewriter to post awesome stories about UI design and
            webdev. Vintage Typewriter to post awesome stories about UI design
            and webdev. Vintage Typewriter to post awesome stories about UI
            design and webdev.
          </Typography>
          <br />
          <Divider />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Review this product
          </Typography>
          <TextField defaultValue="" label="Title" sx={{ width: 300 }}>
            Title
          </TextField>
          <br />
          <br />
          <TextField
            defaultValue=""
            multiline
            label="Description"
            rows={4}
            sx={{ width: 300 }}
          >
            Description
          </TextField>
          <br />
          <br />
          <Button justifyContent="left" variant="contained">
            Add review
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Clear Cart ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clear Items from other Merchants before adding new merchant products
            to the cart ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClearCart} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.product,
    reviews: state.productReducer.reviews,
  };
};

const actionCreators = {
  fetchProductById: actions.fetchProductById,
  fetchReviewById: actions.fetchReviewById,
  addToCart: actions.addToCart,
  clearCart: actions.clearCart,
};
export default connect(mapStateToProps, actionCreators)(Product);
