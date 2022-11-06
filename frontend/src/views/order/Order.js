import { Grid, Rating, Typography, Link, Paper, ButtonBase, styled, Box } from "@mui/material";
import React, { useEffect } from "react";
import cartImage from "../../images/products/Cart.jpeg";
import productImage from "../../images/products/apple.jpeg";
import * as actions from '../../reducers/actions';
import { connect } from 'react-redux';


const Order = (props) => {
  // useEffect(() => {
  //   props.fetchOrders();
  // }, []);
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
              <Grid container spacing={2} >

                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={productImage} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container textAlign="left">
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        Standard license
            </Typography>
                      <Typography variant="body2" gutterBottom>
                        Full resolution 1920x1080 • JPEG
            </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: 1030114
            </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                        Remove
            </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      $19.00
          </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
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
export default connect(mapStateToProps, actionCreators)(Order);