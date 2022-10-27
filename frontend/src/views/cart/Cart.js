

const Cart = ( props ) => {

  return (
    <>
      <h2>Your Cart</h2>
      {/* {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))} */}
      <h2>Total: ${10.0}</h2>
    </>
  );
};

export default Cart;