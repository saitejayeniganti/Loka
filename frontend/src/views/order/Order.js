import { Grid, Rating, Typography, Link, Paper, ButtonBase, styled, Box } from "@mui/material";
import React, { useEffect } from "react";
import cartImage from "../../images/products/Cart.jpeg";
import productImage from "../../images/products/apple.jpeg";
import * as actions from '../../reducers/actions';
import { connect } from 'react-redux';
import shopInventory from "../../images/merchant/shopInventory.jpg";

const Order = (props) => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const id = params.get("id");
  const orderId = id == null ? props.order_id?._id : id;

  useEffect(() => {
    props.fetchOrderById(orderId);
  }, []);

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  return (
    <>
     <div style={{ position: "relative" }}>
        <img
          src={shopInventory}
          style={{ width: "100%", height: "250px" }}
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
          Your Order Detail
        </h1>
      </div>

      <Grid >
        <Grid container spacing={2} mt={1} >
          <Grid xs={3}>
            {/* <Img alt="complex" src={cartImage} /> */}
          </Grid>
          <Grid xs={6}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 700,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              {props.order?.products.map((product, index) => (
                <Grid container spacing={2} key={index} >

                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" width="120px" src={product.image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container textAlign="left">
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {product.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.quantity}
                        </Typography>
                      </Grid>
                      <Grid item mb="5px">
                        {product.status != "Delivered" &&
                          <Typography sx={{ cursor: 'pointer' }} color="red" variant="body2">
                            Cancel
                          </Typography>
                        }
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        <Grid item>
                          <Typography variant="subtitle1" component="div">
                            Status: {product.status}
                          </Typography>
                          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }} marginLeft="100px">
                            ${product.priceWithTax}
                          </Typography>
                        </Grid>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
const mapStateToProps = state => {
  return {
    order_id: state.orderReducer.order_id,
    order: state.orderReducer.order,
  };
};

const actionCreators = {
  fetchOrderById: actions.fetchOrderById,
};
export default connect(mapStateToProps, actionCreators)(Order);