import productImage from "../../images/products/apple.jpeg";
import { Wrapper } from "../cart/CartItem.styles";
import { connect } from "react-redux";
import * as actions from '../../reducers/actions';
import { Grid, Rating, Typography, Link, Button, Divider, Input, TextField, Snackbar, Card } from "@mui/material";
import { Box } from "@mui/system";

const OrderItems = (props) => {
  return (
    <Grid>
      <Wrapper>
        <Grid container
          direction="row">
          <Grid container item>
            <Typography variant="h6" textAlign="center" paddingLeft="15px">Item</Typography>
          </Grid>
          <Grid container item>
            <Typography variant="h6" textAlign="left">Price</Typography>
          </Grid>
          <Grid container item>
            <Typography variant="h6" textAlign="left">Quantity</Typography>
          </Grid>
          <Grid container item>
            <Typography variant="h6" textAlign="left">Total</Typography>
          </Grid>
          <Grid container item>
            <Typography variant="h6" textAlign="left">Tax</Typography>
          </Grid>
        </Grid>
      </Wrapper>
      {
        props.items.map((i) =>
          <Wrapper>
            <Grid
              key={`${i._id}${i.count}`}
              container
              direction="row">
              <Grid container
                direction="column">
                <img
                  component="img"
                  style={{ marginLeft: "0" }}
                  src={i.image}
                  align="left"
                />
                <Grid container item>
                  <Typography variant="h7" textAlign="center" paddingLeft="15px">{i.name}</Typography>
                </Grid>
              </Grid>
              <Grid item align="left" paddingTop="10px">
                <Typography variant="h7" textAlign="left">${i.price}</Typography>
              </Grid>
              <Grid item align="left" paddingTop="10px">
                <Typography variant="h7" textAlign="left">{i.count} </Typography>
              </Grid>
              <Grid item align="left" paddingTop="10px">
                <Typography variant="h7" textAlign="left">${(i.count * i.price).toFixed(2)} </Typography>
              </Grid>
              <Grid item align="left" paddingTop="10px">
                <Typography variant="h7" textAlign="left">${i.totalTax} </Typography>
              </Grid>
            </Grid>
          </Wrapper>)
      }
    </Grid>
  );
};


export default OrderItems;
