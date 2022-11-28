const { Button } = require("@mui/material")
import * as actions from '../../reducers/actions';
import { connect } from "react-redux";
import billImage from "../../images/products/Bill.gif";
import { Grid, Typography, Box } from "@mui/material";
import OrderItems from "./OrderItems";
import { displayError, displayMessage } from "../../utils/messages";
const store = require('../../utils/store');
import { useNavigate } from "react-router-dom";
import PayPalTest from "../paypalTest.js";
import shopInventory from '../../images/merchant/shopInventory.jpg'

const Bill = (props) => { 
  const navigate = useNavigate();
  let allItems = props.items;
  // allItems = store.caculateItemsSalesTax(allItems);
  var allItemMap = new Map();

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
  }

  let items = Array.from(allItemMap.values());
  items = store.caculateItemsSalesTax(items);

  let totalPrice = 0.0;
  for (var x of items) {
    totalPrice += x.priceWithTax;
  }

  const addNewOrder = async () => {
    console.log("add new order called")
    props.addNewOrder(items)
      .then((result) => {
        displayMessage("Order Confirmed");
        navigate("/order");
      })
      .catch((err) => {
        console.log(err);
      });
  }

   const paid = () => {
      // console.log("in paid func")
      addNewOrder()
    }

  return (
    <>
    <div style={{ position: "relative" }}>
                <img src={shopInventory} style={{ width: "100%", height: "250px" }}></img>
                <h1 style={{ position: "absolute", bottom: "8px", left: "16px", color: "white", backgroundColor: "#063970", padding: '5px', borderRadius: "10px" }}>Order Summary</h1>
            </div>
      
      <Grid container spacing={1} sx={{margin:"10px"}}>
        <Grid item xs={3} sx={{borderRadius:"10px"}}></Grid>
          <Grid item xs={6} sx={{borderRadius:"10px"}}>
          {items.length === 0 ? <h5>Please add item in cart.</h5> : null}
          {
            items.length !== 0 && <>
              <OrderItems items={items} />
              <div style={{marginTop:"10px"}}>
              <h3 align="right">Order Total: {totalPrice == 0 ? "$0.00" : "$ "+totalPrice}</h3></div>
              <br />
              <Grid paddingLeft="69%" >
                {/* <Button variant="contained" onClick={addNewOrder} >Pay for your order</Button> */}
                <div style={{maxHeight:"20vh"}}>
                <PayPalTest price={totalPrice} name={"sai teja"} paid={paid}/>
                </div>
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