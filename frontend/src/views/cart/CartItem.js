import { Button } from "@mui/material";
import productImage from "../../images/products/apple.jpeg";
import { Wrapper } from "./CartItem.styles";
import { connect } from "react-redux";
import * as actions from "../../reducers/actions";

const CartItem = (props) => {
  return (
    <Wrapper>
      <div>
        <h3>{props.item.name}</h3>
        <div className="information">
          <p>Price: ${props.item.price}</p>
          {<p>Total: ${(props.item.count * props.item.price).toFixed(2)}</p>}
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => props.removeFromCart(props.item)}
          >
            -
          </Button>
          <p>{props.item.count}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => props.addToCart(props.item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={props.item.image} alt={props.item.title} />
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const actionCreators = {
  addToCart: actions.addToCart,
  removeFromCart: actions.removeFromCart,
};

export default connect(mapStateToProps, actionCreators)(CartItem);
