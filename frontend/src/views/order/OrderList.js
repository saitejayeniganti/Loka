import { Grid, Rating, Typography, Link, Paper, ButtonBase, styled, Box } from "@mui/material";
import React, { useEffect } from "react";
import cartImage from "../../images/products/Cart.jpeg";
import productImage from "../../images/products/apple.jpeg";
import * as actions from '../../reducers/actions';
import { connect } from 'react-redux';

const OrderList = (props) => {
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
      <Grid >
        <Box>
          <Typography variant="h4"> Your Orders </Typography>
        </Box>
        <Grid container spacing={2} mt={1} >
          <Grid xs={3}>
            <Img alt="complex" src={cartImage} />
          </Grid>
          <Grid xs={6}>
            <Paper
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
                      <Img alt="complex" src={product.image} />
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
                      <Grid item>
                        {product.status != "Delivered" &&
                          <Typography sx={{ cursor: 'pointer' }} color="red" variant="body2">
                            Cancel
                      </Typography>}
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
export default connect(mapStateToProps, actionCreators)(OrderList);