import CartItem from "./CartItem";
import { connect } from "react-redux";
import { Wrapper } from "./Cart.styles";
import { useEffect } from "react";


const Cart = (props) => {

  const allItems = props.items;
  var allItemMap = new Map();
  for (var x of allItems) {
    if (allItemMap.has(x._id)) {
      let item = allItemMap.get(x._id);
      item.count = item.count + 1;
      allItemMap.set(x._id, item);
    } else {
      x.count = 1;
      allItemMap.set(x._id, x);
    }
  }
  const items = Array.from(allItemMap.values());
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
      <h2>Total: ${10.0}</h2>
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