import { Grid, Rating, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import productImage from "../../images/products/apple.jpeg";
import * as actions from '../../reducers/actions';
import { connect } from 'react-redux';

const ProductList = (props) => {
  useEffect(() => {
    props.fetchProducts();
  }, []);

  return (
    <Grid sx={{ mb: 5 }} container>
      {props.products.map((product, index) => (
        <Grid item md={3}>
          <Link
            href={`/product?id=${product._id}`}
            key={index} underline="none" color="inherit"
          >
            <Box
              sx={{ width: "100%" }}
              component="img"
              src={productImage}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {product.name}
            </Typography>
            <Typography variant="body2">
              Vintage Typewriter to post awesome stories about UI design and webdev.
              Vintage Typewriter to post awesome stories about UI design and webdev.
              Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
              $90.00
        </Typography>
            <Typography variant="subtitle2" sx={{ color: "gray" }}>
              $5.95 for shipping
        </Typography>
            {/* Rating wraper */}
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
              }}
            >
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <Typography>4.9</Typography>
            </Box>
          </Link>
        </Grid>
      ))}
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box
          sx={{ width: "100%" }}
          component="img"
          src={productImage}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Red Apples
        </Typography>
        <Typography variant="body2">
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff6d00" }}>
          $90.00
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          $5.95 for shipping
        </Typography>
        {/* Rating wraper */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography>4.9</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

// export default ProductList;
const mapStateToProps = state => {
  return {
    products: state.productReducer.products,
  };
};

const actionCreators = {
  fetchProducts: actions.fetchProducts,
};
export default connect(mapStateToProps, actionCreators)(ProductList);