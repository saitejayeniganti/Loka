import merchantOrders from "../../images/merchant/merchantOrders.jpg";
import React from "react";
import { Grid } from "@mui/material";
import OrderCard from "../../components/merchant/OrderCard";
import { useOrders } from "./customhooks/index";
import { connect } from "react-redux";
import Progress from "../../components/Progress";

function MerchantOrders(props) {
  const { orders, fetchAllOrdersByMerchantId, loading } = useOrders(props.id);
  console.log(orders);

  if (loading) {
    return <Progress></Progress>;
  }
  return (
    <>
      <Grid container spacing={1} sx={{ padding: "10px" }}>
        <Grid item xs={3}>
          <div
            style={{ position: "fixed", top: "80px", left: "20px", zIndex: 1 }}
          >
            <img style={{ height: "170px" }} src={merchantOrders} />
            <h2>Your Orders</h2>
          </div>
        </Grid>
        <Grid item xs={9}>
          {orders.length == 0 && <h1>No Orders</h1>}
          <Grid container spacing={1} sx={{ padding: "10px" }}>
            {orders.map((order) => (
              <Grid item xs={12} key={order._id}>
                <OrderCard
                  order={order}
                  fetchAllOrdersByMerchantId={fetchAllOrdersByMerchantId}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.sessionReducer.user.id,
  };
};

export default connect(mapStateToProps)(MerchantOrders);
