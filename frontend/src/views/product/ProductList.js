import { Grid, Rating, Typography, Link } from "@mui/material";
import React, { useEffect } from "react";
import * as actions from '../../reducers/actions';
import { connect } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import customerHome from '../../images/customer/cushome.jpeg'

const ProductList = (props) => {
  useEffect(() => {
    props.fetchProducts();
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <img src={customerHome} style={{ width: "100%", height: "300px" }}></img>
        <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Shop our products</h1>
      </div>
      <div>
        <Grid container spacing={1} sx={{ padding: '10px' }}>
          {props.products.map((singleItem, index) => {
            return (<Grid item xs={3} lg={2} key={singleItem._id}><Link
              href={`/product?id=${singleItem._id}`}
              key={index} underline="none" color="inherit"
            ><ProductCard singleItem={singleItem} /></Link></Grid>)
          })
          }
        </Grid>
      </div>
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
export default connect(mapStateToProps, actionCreators)(ProductList);