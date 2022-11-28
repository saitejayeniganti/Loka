import CartItem from "./CartItem";
import { connect } from "react-redux";
import { Wrapper } from "./Cart.styles";
import { Button, Link } from "@mui/material";


const Cart = (props) => {

  const allItems = props.items;
  var allItemMap = new Map();
  let totalPrice = 0.0;
  for (var x of allItems) {
    if (allItemMap.has(x._id)) {
      let item = allItemMap.get(x._id);
      item.count = item.count + 1;
      allItemMap.set(x._id, item);
    } else {
      x.count = 1;
      allItemMap.set(x._id, x);
    }
    totalPrice += x.price;
  }
  const items = Array.from(allItemMap.values());

  const addNewOrder = (e) => {
    e.preventDefault();
    props.addNewOrder(props.items)
      .then((result) => {
        showMessage("Order Confirmed");
        navigate("/Bill");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {items.length === 0 ? <p>No items in cart.</p> : null}
      {}
      {items.map((item, key) => (
        <CartItem
          key={`${item._id}${item.count}`}
          item={item}
        />
      ))}
      <h2>Total: {totalPrice == 0 ? "$0.00" : "$ "+totalPrice}</h2>
      <Link
        href={"/bill"}
        underline="none" color="inherit"
      >
        <Button variant="contained">Proceed to checkout</Button>
      </Link>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cartReducer.items,
  };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Cart);