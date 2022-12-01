import { Grid, Rating, Typography, Link, Paper, ButtonBase, styled, Box, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React, { useEffect } from "react";
import cartImage from "../../images/products/Cart.jpeg";
import productImage from "../../images/products/apple.jpeg";
import * as actions from '../../reducers/actions';
import { connect } from 'react-redux';
import shopInventory from "../../images/merchant/shopInventory.jpg";
import updateOrderItemStatus from "../../reducers/orderActions"
import noOrderImage from "../../images/customer/no_order1.png"

const MyOrder = (props) => {
  useEffect(() => {
    console.log("here");
    props.fetchOrders();
  }, []);

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  console.log("orders h", props.orders);

  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [orderId, setOrderId] = React.useState(false);

  const openModalWithItem = (product, orderId) => {
    setProduct(product);
    setOrderId(orderId);
    setOpen(true);
  };

  const handleCancel = () => {
    props.updateOrderItemStatus(product, "Cancelled", orderId);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      <div style={{ position: "relative", top: "0px" }}>
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
          All Orders
        </h1>
      </div>

      <Grid style={{ overflowY: "scroll" }}>

        <Grid container spacing={2} mt={1} >
          <Grid xs={3}>
            {/* <Img alt="complex" src={cartImage} /> */}
          </Grid>
          <Grid xs={6}>
            {/* <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 700,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            > */}
            {props.orders?.length === 0 && <img src={noOrderImage} width="600px" height="450px"></img>}
            {props.orders?.length > 0 && props.orders?.map((order, i) => (
              <>
                <Typography variant="h5" sx={{
                  p: 2
                }}>{`Order Id: ${order._id}`}</Typography>
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
                  {order.products.map((product, index) => (

                    <Grid container spacing={2} key={index+product.status} >
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
                            <Typography gutterBottom variant="h7" component="div" fontWeight="bold">
                              {product.merchant.storeName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {product.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {product.quantity}
                            </Typography>
                          </Grid>
                          <Grid item>
                            {((product.status !== "Delivered" && product.status !== "Cancelled") &&
                              <ButtonBase onClick={() => openModalWithItem(product, order._id)}>
                                <Typography sx={{ cursor: 'pointer' }} color="red" variant="body2" >
                                  Cancel
                            </Typography>
                              </ButtonBase>)}
                          </Grid>
                          <Grid item>
                            <Divider />
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
                  ))
                  }</Paper></>
            ))}

          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to remove ${product.name} ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCancel} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
  };
};

const actionCreators = {
  fetchOrders: actions.fetchOrders,
  updateOrderItemStatus: actions.updateOrderItemStatus,
};
export default connect(mapStateToProps, actionCreators)(MyOrder);