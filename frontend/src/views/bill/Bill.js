const { Button } = require("@mui/material")
import * as actions from '../../reducers/actions';
import { connect } from "react-redux";
import billImage from "../../images/products/Bill.gif";
import { Grid, Typography, Box } from "@mui/material";
import OrderItems from "./OrderItems";
import { displayError, displayMessage } from "../../utils/messages";
const store = require('../../utils/store');
import { useNavigate } from "react-router-dom";

const Bill = (props) => {
  const navigate = useNavigate();
  let allItems = props.items;
  allItems = store.caculateItemsSalesTax(allItems);
  var allItemMap = new Map();
  let totalPrice = 0.0;

  for (var x of allItems) {
    if (allItemMap.has(x._id)) {
      let item = allItemMap.get(x._id);
      item.count = item.count + 1;
      item.quantity = item.quantity + 1;
      allItemMap.set(x._id, item);
    } else {
      x.count = 1;
      x.quantity = 1;
      allItemMap.set(x._id, x);
    }
    totalPrice += x.price;
  }

  const items = Array.from(allItemMap.values());
  const addNewOrder = async (e) => {
    e.preventDefault();
    props.addNewOrder(props.items)
      .then((result) => {
        displayMessage("Order Confirmed");
        // console.log("order id", props.order_id._i);
        navigate("/order");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Box>
        <Typography variant="h4"> Order Summary </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid sm={3}>
          <Box
            sx={{ width: "100%" }}
            component="img"
            src={billImage}
          />
        </Grid>
        <Grid sm={6} mt={2}>
          {items.length === 0 ? <h5>Please add item in cart.</h5> : null}
          {
            items.length !== 0 && <>
              <OrderItems items={items} />
              <h3 align="right">Order Total: {totalPrice == 0 ? "$0.00" : totalPrice}</h3>
              <br />
              <Grid paddingLeft="69%">
                <Button variant="contained" onClick={addNewOrder} >Pay for your order</Button>
              </Grid>
            </>
          }
        </Grid>
      </Grid>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    items: state.cartReducer.items,
    order_id: state.orderReducer.order_id,
  };
};

const actionCreators = {
  addNewOrder: actions.addNewOrder,
};
export default connect(mapStateToProps, actionCreators)(Bill);