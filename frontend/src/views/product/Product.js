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
import { useLocation } from "react-router-dom";
import shopInventory from "../../images/merchant/shopInventory.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "../../reducers/actions";
import ProductReviews from "../../components/reviews/ProductReviews";
import KeyboardBackspaceTwoToneIcon from "@mui/icons-material/KeyboardBackspaceTwoTone";
import Progress from "../../components/Progress";

const Product = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("mechant id in product page", location);
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("id");
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const productId = params.get("id");

  const [addedToCard, setAddedToCart] = useState(false);
  const [redirToHome, setRedirToHOme] = useState(false);

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

  const redirectToMerchant = () => {
    navigate(-1);
  };

  if (props.product?._id != productId) {
    return <Progress></Progress>;
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          src={shopInventory}
          style={{ width: "100%", height: "300px" }}
        ></img>
        <h1
          style={{
            position: "absolute",
            bottom: "8px",
            left: "16px",
            color: "white",
            backgroundColor: "#063970",
            padding: "5px",
            borderRadius: "10px",
          }}
        >
          Product Detail
        </h1>
      </div>

      <div style={{ textAlign: "right", margin: "10px", marginRight: "15px" }}>
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceTwoToneIcon />}
          onClick={redirectToMerchant}
        >
          Go Back
        </Button>
      </div>

      <Grid container spacing={1} sx={{ margin: "10px" }}>
        <Grid item xs={2} />
        <Grid item xs={5} sx={{ borderRadius: "10px", textAlign: "left" }}>
          <img
            src={props.product?.image}
            height="625"
            width="650"
            style={{ borderRadius: "16px" }}
          ></img>
        </Grid>
        <Grid item xs={4} sx={{ borderRadius: "10px", textAlign: "left" }}>
          <Grid
            item
            xs={12}
            style={{
              fontWeight: "500",
              fontSize: "50px",
              textTransform: "capitalize",
            }}
          >
            {props.product?.name}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ color: "grey", marginLeft: "5px", fontSize: "16px" }}
          >
            {props.product?.description}
          </Grid>

          {/* <Grid
            item
            xs={12}
            style={{ fontSize: "16px", marginTop: "5px", marginTop: "5vh" }}
          >
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Grid> */}

          <Grid
            item
            xs={12}
            style={{
              marginLeft: "5px",
              fontSize: "21px",
              marginTop: "5px",
              marginTop: "1vh",
            }}
          >
            $&nbsp;{props.product?.price}
          </Grid>

          <Grid item xs={12} sx={{ marginLeft: "5px", marginTop: "7vh" }}>
            {props.product && props.product.quantity > 0 && (
              <>
                <div className="App" style={{ marginBottom: "40px", padding: "4px 0px", width: "90px", height: "30px", backgroundColor: "#00b853", borderRadius: "50px" }}>
                  <Typography variant="h7" color="#054d26">
                    &nbsp;IN STOCK
                  </Typography>
                </div>
                <Typography gutterBottom variant="h7" component="div" fontWeight="bold" sx={{ marginTop: "20px" }}>
                    {props.product.merchant.storeName}
                  </Typography>
                <Typography gutterBottom variant="h7" color="grey" component="div" >
                    {props.product.merchant.location.address}
                  </Typography>
                <Button
                  onClick={addToCart}
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                  style={{ textTransform: "none", padding: "13px 50px", borderRadius: "50px" }}
                >
                  ADD TO CART
              </Button>
              </>
            )}
            {props.product && props.product.quantity <= 0 && (
              <Typography variant="h5">Out of Stock</Typography>
            )}
          </Grid>
          <Snackbar
            open={addedToCard}
            autoHideDuration={1000}
            onClose={handleAddToCartClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message="Added to the cart"
          />
        </Grid>
      </Grid>
      {/* <Grid item xs={4} sx={{ textAlign: "left" }}>
          <Grid item xs={4} style={{ fontWeight: "bold", margin: "10px" }}>
            <h5>Review this product</h5>
          </Grid>

          <Grid item xs={4} style={{ marginTop: "5vh" }}>
            <TextField defaultValue="" label="Title" sx={{ width: 300 }}>
              Title
            </TextField>
          </Grid>

          <Grid item xs={4} style={{ marginTop: "5vh", height: "15vh" }}>
            <TextField
              defaultValue=""
              multiline
              label="Description"
              rows={4}
              sx={{ width: 300 }}
            >
              Description
            </TextField>
          </Grid>

          <Grid item xs={4} style={{ marginTop: "5vh" }}>
            <Button justifyContent="left" variant="contained">
              Add review
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ margin: "15px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <ProductReviews data="sai" />
        </Grid>
      </Grid> */}

      {/* <Grid sx={{ mb: 5, mt: 5 }} container spacing={2}>
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
                Fresh veggies. Faster delivery. Order charges were minimal with best possible services.
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
      </Grid> */}

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
