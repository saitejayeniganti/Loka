const { Button } = require("@mui/material")
import * as actions from '../../reducers/actions';
import { connect } from "react-redux";

const Bill = (props) => {

  const addNewOrder = (e) => {
    e.preventDefault();
    props.addNewOrder(props.items)
      .then((result) => {
        // showMessage("Login Success");
        // navigate("/order");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h2> Choose Payment Method </h2>
      <Button variant="contained" onClick={addNewOrder}>Pay for your order</Button>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    items: state.cartReducer.items,
  };
};

const actionCreators = {
  addNewOrder: actions.addNewOrder,
};
export default connect(mapStateToProps, actionCreators)(Bill);